import { useState } from 'react';
import {
  Accordion,
  SelectMood,
  SelectPicture,
  TextArea,
  TopHeader,
} from '@/components';
import WeatherWithIcon from '@/components/atomic/WeatherWithIcon';

const emotions = [
  { src: '/icons/emotions/popper.png', text: '신나는' },
  { src: '/icons/emotions/comfortable.png', text: '편안한' },
  { src: '/icons/emotions/proud.png', text: '뿌듯한' },
  { src: '/icons/emotions/gift.png', text: '기대되는' },
  { src: '/icons/emotions/flower.png', text: '행복한' },
  { src: '/icons/emotions/motivation.png', text: '의욕적인' },
  { src: '/icons/emotions/ballon.png', text: '설레는' },
  { src: '/icons/emotions/juice.png', text: '상쾌한' },
  { src: '/icons/emotions/calm.png', text: '차분한' },
  { src: '/icons/emotions/thankful.png', text: '감사한' },
  { src: '/icons/emotions/gloomy.png', text: '우울한' },
  { src: '/icons/emotions/leaves.png', text: '외로운' },
  { src: '/icons/emotions/anxious.png', text: '불안한' },
  { src: '/icons/emotions/tears.png', text: '슬픈' },
  { src: '/icons/emotions/volcano.png', text: '화난' },
  { src: '/icons/emotions/pressure.png', text: '부담되는' },
  { src: '/icons/emotions/annoyed.png', text: '짜증나는' },
  { src: '/icons/emotions/tired.png', text: '피곤한' },
  { src: '/icons/emotions/stressful.png', text: '스트레스' },
  { src: '/icons/emotions/hoguma.png', text: '답답한' },
];

const weatherOptions = [
  { src: '/icons/weather/sunny.png', text: '맑음' },
  { src: '/icons/weather/cloudy.png', text: '흐림' },
  { src: '/icons/weather/windy.png', text: '바람' },
  { src: '/icons/weather/rainy.png', text: '비' },
  { src: '/icons/weather/snowy.png', text: '눈' },
];

export const Component = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedEmotions, setSelectedEmotions] = useState([]);
  const [selectedWeathers, setSelectedWeathers] = useState([]);

  // 감정 선택 처리
  const handleEmotionClick = (text) => {
    if (selectedEmotions.includes(text)) {
      setSelectedEmotions(
        selectedEmotions.filter((emotion) => emotion !== text)
      );
    } else if (selectedEmotions.length < 5) {
      setSelectedEmotions([...selectedEmotions, text]);
    }
  };

  // 날씨 선택 처리
  const handleWeatherClick = (text) => {
    if (selectedWeathers.includes(text)) {
      setSelectedWeathers(
        selectedWeathers.filter((weather) => weather !== text)
      );
    } else if (selectedWeathers.length < 2) {
      setSelectedWeathers([...selectedWeathers, text]);
    }
  };

  return (
    <section className="flex flex-col gap-5">
      <TopHeader title={'일기작성'} isShowIcon={true} />
      <SelectMood isSelected={selectedMood} setSelected={setSelectedMood} />
      <Accordion title="감정" className="grid grid-cols-5 gap-x-8 gap-y-4">
        {emotions.map(({ src, text }) => (
          <WeatherWithIcon
            key={text}
            src={src}
            text={text}
            isSelected={selectedEmotions.includes(text)}
            onClick={() => handleEmotionClick(text)}
          />
        ))}
      </Accordion>
      <Accordion title="날씨" className="grid grid-cols-5 gap-8">
        {weatherOptions.map(({ src, text }) => (
          <WeatherWithIcon
            key={text}
            src={src}
            text={text}
            isSelected={selectedWeathers.includes(text)}
            onClick={() => handleWeatherClick(text)}
          />
        ))}
      </Accordion>
      <TextArea />
      <SelectPicture />
    </section>
  );
};
