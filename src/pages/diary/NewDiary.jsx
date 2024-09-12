import pb from '@/api/pb';
import emotions from '@/assets/icons/emotions/emotions';
import weathers from '@/assets/icons/weather/weathers';
import {
  Accordion,
  Button,
  Modal,
  SelectMood,
  SelectPicture,
  TextArea,
  TopHeader,
  WeatherWithIcon,
} from '@/components';
import { useFetchDiaryDetail, useModal } from '@/hooks';
import { format } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  useNavigate,
  useLocation,
  unstable_usePrompt as usePrompt,
} from 'react-router-dom';

const baseImageUrl = `${import.meta.env.VITE_PB_API}/files/diary`;
const MODAL_MESSAGE = `작성 중인 내용이 저장되지 않아요. \n페이지를 벗어나시겠습니까?`;

export const Component = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { date, diaryId } = location.state || {};
  const { openModal, closeModal, isOpen } = useModal();

  const userId = JSON.parse(localStorage.getItem('auth')).user.id;
  const defaultTitle = date || format(new Date(), 'yyyy-MM-dd');

  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedWeathers, setSelectedWeathers] = useState([]);
  const [text, setText] = useState('');
  const [picture, setPicture] = useState(null);
  const [isBlocking, setIsBlocking] = useState(false);

  const { diaryDetail } = useFetchDiaryDetail(diaryId);

  useEffect(() => {
    if (diaryDetail) {
      setSelectedMood(diaryDetail.mood);
      setSelectedEmotions(diaryDetail.emotion || []);
      setSelectedWeathers(diaryDetail.weather || []);
      setText(diaryDetail.content);
      if (diaryDetail.picture) {
        setPicture(`${baseImageUrl}/${diaryDetail.id}/${diaryDetail.picture}`);
      }
    }
  }, [diaryDetail]);

  // 사용자가 인풋 입력이나 감정 등 선택을 했는지 확인
  const isAnyInputMade = useCallback(() => {
    return (
      selectedMood !== null ||
      selectedEmotions.length > 0 ||
      selectedWeathers.length > 0 ||
      text.trim() !== '' ||
      picture !== null
    );
  }, [
    picture,
    selectedMood,
    selectedEmotions.length,
    selectedWeathers.length,
    text,
  ]);

  useEffect(() => {
    setIsBlocking(isAnyInputMade());
  }, [
    selectedMood,
    selectedEmotions,
    selectedWeathers,
    text,
    picture,
    isAnyInputMade,
  ]);

  // 페이지 벗어남을 감지하여 경고 메시지 띄우기
  usePrompt(MODAL_MESSAGE, isBlocking);

  const handleEmotionClick = (text) => {
    if (selectedEmotions.includes(text)) {
      setSelectedEmotions(
        selectedEmotions.filter((emotion) => emotion !== text)
      );
    } else if (selectedEmotions.length < 5) {
      setSelectedEmotions([...selectedEmotions, text]);
    } else {
      toast.dismiss();
      toast.error('감정은 5개까지 선택 가능합니다.');
    }
  };

  const handleWeatherClick = (text) => {
    if (selectedWeathers.includes(text)) {
      setSelectedWeathers(
        selectedWeathers.filter((weather) => weather !== text)
      );
    } else if (selectedWeathers.length < 2) {
      setSelectedWeathers([...selectedWeathers, text]);
    } else {
      toast.dismiss();
      toast.error('날씨는 2개까지 선택 가능합니다.');
    }
    return;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('user', userId);
    formData.append('date', defaultTitle);
    formData.append('mood', selectedMood);
    selectedEmotions.forEach((emotion) => {
      formData.append('emotion', emotion);
    });
    selectedWeathers.forEach((weather) => {
      formData.append('weather', weather);
    });
    formData.append('content', text);
    if (picture) {
      formData.append('picture', picture);
    }

    const submitPromise = diaryId
      ? pb.collection('diary').update(diaryId, formData)
      : pb.collection('diary').create(formData);

    toast
      .promise(submitPromise, {
        loading: diaryId ? '일기 수정 중...' : '일기 저장 중...',
        success: diaryId
          ? '일기 수정을 완료했습니다!'
          : '일기 작성을 완료했습니다!',
        error: diaryId
          ? '일기 수정에 실패했습니다...'
          : '일기 작성에 실패했습니다...',
      })
      .then(() => {
        setIsBlocking(false); // 탐색 차단 해제
        navigate('/');
      })
      .catch((error) => {
        console.error('[Error] 일기작성: ', error);
      });
  };

  const handleBackClick = () => {
    if (isAnyInputMade()) {
      openModal('confirmLeave');
    } else {
      navigate(-1);
    }
  };

  const handleCancel = () => {
    closeModal('confirmLeave');
  };

  const handleConfirmLeave = () => {
    closeModal('confirmLeave');
    setIsBlocking(false); // 탐색 차단 해제
    navigate(-1);
  };

  return (
    <section className="flex flex-col gap-5 pb-[100px]">
      <TopHeader
        title={defaultTitle}
        isShowIcon={true}
        onBackClick={handleBackClick}
      />
      <form
        className="flex flex-col gap-5 overflow-y-hidden"
        onSubmit={handleSubmit}
      >
        <SelectMood isSelected={selectedMood} setSelected={setSelectedMood} />
        <Accordion open={true} title="감정" className="grid grid-cols-5 gap-4">
          {Object.entries(emotions).map(([key, src]) => (
            <WeatherWithIcon
              key={key}
              src={src}
              text={key}
              isSelected={selectedEmotions.includes(key)}
              onClick={() => handleEmotionClick(key)}
            />
          ))}
        </Accordion>
        <Accordion open={true} title="날씨" className="grid grid-cols-5 gap-4">
          {Object.entries(weathers).map(([key, src]) => (
            <WeatherWithIcon
              key={key}
              src={src}
              text={key}
              isSelected={selectedWeathers.includes(key)}
              onClick={() => handleWeatherClick(key)}
            />
          ))}
        </Accordion>
        <TextArea text={text} setText={setText} />
        <SelectPicture picture={picture} setPicture={setPicture} />
        <footer className="fixed bottom-0 w-full max-w-[27.5rem] bg-white py-4 z-50 shadow-top -mx-5 px-5">
          <Button
            buttonType="submit"
            text={diaryId ? '수정완료' : '작성완료'}
            size="large"
          />
        </footer>
      </form>

      <Modal isOpen={isOpen('confirmLeave')} closeModal={handleCancel}>
        <div className="flex flex-col gap-5">
          <p className="text-center whitespace-pre-wrap">{MODAL_MESSAGE}</p>
          <div className="flex items-center justify-center w-full gap-3">
            <Button
              type="secondary"
              className="flex-1"
              onClick={handleCancel}
              text="취소"
              aria-label="취소"
            />
            <Button
              type="primary"
              className="flex-1"
              onClick={handleConfirmLeave}
              text="뒤로가기"
              aria-label="뒤로 가기"
            />
          </div>
        </div>
      </Modal>
    </section>
  );
};
