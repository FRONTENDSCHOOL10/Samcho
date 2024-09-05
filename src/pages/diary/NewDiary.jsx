import { useState } from 'react';
import {
  Accordion,
  SelectMood,
  SelectPicture,
  TextArea,
  TopHeader,
  WeatherWithIcon,
} from '@/components';
import emotions from '@/assets/icons/emotions/emotions';
import weathers from '@/assets/icons/weather/weathers';

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
      <Accordion title="날씨" className="grid grid-cols-5 gap-8">
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
      <TextArea />
      <SelectPicture />
    </section>
  );
};
