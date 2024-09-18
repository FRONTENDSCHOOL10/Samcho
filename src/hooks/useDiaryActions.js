import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { pb } from '@/api';

const baseImageUrl = `${import.meta.env.VITE_PB_API}/files/diary`;
const userId = JSON.parse(localStorage.getItem('auth'))?.user?.id;

const useDiaryActions = (diaryDetail, defaultTitle, diaryId) => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState('');
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedWeathers, setSelectedWeathers] = useState([]);
  const [text, setText] = useState('');
  const [picture, setPicture] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleEmotionClick = useCallback(
    (text) => {
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
    },
    [selectedEmotions]
  );

  const handleWeatherClick = useCallback(
    (text) => {
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
    },
    [selectedWeathers]
  );

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      if (
        selectedMood === '' ||
        selectedEmotions === '' ||
        selectedWeathers === '' ||
        text === ''
      ) {
        toast.dismiss();
        toast.error('입력하지 않은 필수 값이 있습니다.');
        return;
      }

      if (!diaryId) {
        try {
          const data = await pb.collection('diary').getFullList({
            filter: `user = "${userId}" && date = "${defaultTitle} 00:00:00.000Z"`,
          });

          if (data.length > 0) {
            toast.dismiss();
            toast.error('오늘 일기는 이미 작성하셨습니다.');
            return;
          }
        } catch (error) {
          console.error('서버 통신중 에러 발생', error);
        }
      }

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
          setIsSubmitting(false);
          navigate('/');
        })
        .catch((error) => {
          console.error('[Error] 일기작성: ', error);
        });
    },
    [
      diaryId,
      defaultTitle,
      selectedMood,
      selectedEmotions,
      selectedWeathers,
      text,
      picture,
      navigate,
    ]
  );

  const deleteDiary = useCallback(
    async (id, closeModal, onDelete) => {
      closeModal('deleteModal');
      try {
        await pb.collection('diary').delete(id);
        toast.success('일기 삭제가 완료되었습니다.');
        if (onDelete) onDelete(id); // 상태 업데이트
      } catch (error) {
        toast.error('일기 삭제 중 오류가 발생했습니다.');
        console.error('[error] 다이어리 삭제 실패: ', error);
      }
      if (!onDelete) navigate('/');
    },
    [navigate]
  );

  const exchangeDiary = useCallback(
    async (buddy, closeModal) => {
      try {
        const existingRequest = await pb
          .collection('notification')
          .getFullList({
            filter: `recipient = "${buddy}" && requester = "${userId}" && type = "교환일기"`,
          });

        if (existingRequest.length > 0) {
          toast.error('이미 해당 사용자와 교환중인 일기가 있습니다.');
          return;
        }

        const post = await pb.collection('post').create({
          recipient: buddy,
          requester: userId,
          requester_diary: diaryDetail.id,
          status: 'pending',
        });

        await pb.collection('notification').create({
          recipient: buddy,
          requester: userId,
          type: '교환일기',
          type_id: post.id,
        });

        toast.success('일기 교환 신청을 보냈습니다!');
        if (closeModal) closeModal('buddyListModal');
      } catch (error) {
        toast.error('일기 교환 신청에 실패했습니다.');
        console.error(error);
      }
    },
    [diaryDetail]
  );

  return {
    selectedMood,
    selectedEmotions,
    selectedWeathers,
    text,
    setText,
    picture,
    setPicture,
    setSelectedMood,
    handleEmotionClick,
    handleWeatherClick,
    isSubmitting,
    handleSubmit,
    deleteDiary,
    exchangeDiary,
  };
};

export default useDiaryActions;
