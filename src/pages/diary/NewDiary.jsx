import { useState } from 'react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Accordion,
  SelectMood,
  TextArea,
  TopHeader,
  WeatherWithIcon,
  SelectPicture,
  Button,
} from '@/components';
import emotions from '@/assets/icons/emotions/emotions';
import weathers from '@/assets/icons/weather/weathers';
import pb from '@/api/pb';

export const Component = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { date } = location.state || {};

  const defaultTitle = date || format(new Date(), 'yyyy-MM-dd');
  const userId = JSON.parse(localStorage.getItem('auth')).user.id;

  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedWeathers, setSelectedWeathers] = useState([]);
  const [text, setText] = useState('');
  const [picture, setPicture] = useState(null);

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

    toast
      .promise(pb.collection('diary').create(formData), {
        loading: '일기 저장 중...',
        success: '일기 작성을 완료했습니다!',
        error: '일기 작성에 실패했습니다...',
      })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('[Error] 일기작성: ', error);
      });
  };

  return (
    <section className="flex flex-col gap-5 pb-[100px]">
      <TopHeader title={defaultTitle} isShowIcon={true} />
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
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
          <Button buttonType="submit" text="작성완료" size="large" />
        </footer>
      </form>
    </section>
  );
};
