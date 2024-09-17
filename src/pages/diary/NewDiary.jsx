import emotions from '@/assets/icons/emotions/emotions';
import weathers from '@/assets/icons/weather/weathers';
import {
  Accordion,
  Button,
  SelectMood,
  SelectPicture,
  TextArea,
  TopHeader,
  WeatherWithIcon,
} from '@/components';
import { useFetchDiaryDetail, useDiaryActions } from '@/hooks';
import { format } from 'date-fns';
import { useLocation } from 'react-router-dom';

export const Component = () => {
  const location = useLocation();
  const { date, diaryId } = location.state || {};

  const currentDate = date || format(new Date(), 'yyyy-MM-dd');

  const { diaryDetail } = useFetchDiaryDetail(diaryId);

  const {
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
    handleSubmit,
  } = useDiaryActions(diaryDetail, currentDate, diaryId);

  return (
    <section className="flex flex-col gap-5 pb-[100px]">
      <TopHeader title={currentDate} isShowIcon={true} />
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <SelectMood isSelected={selectedMood} setSelected={setSelectedMood} />
        <Accordion open={true} title="감정" className="grid grid-cols-5 gap-4">
          {Object.entries(emotions)
            .filter(([key]) => key !== '기록없음')
            .map(([key, src]) => (
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
    </section>
  );
};
