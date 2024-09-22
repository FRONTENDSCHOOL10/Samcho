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
import { useDiaryActions, useFetchDiaryDetail } from '@/hooks';
import { format } from 'date-fns';
import debounce from 'lodash/debounce';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const NewDiary = () => {
  const location = useLocation();
  const { date, diaryId } = location.state || {};

  const currentDate = date || format(new Date(), 'yyyy-MM-dd');

  const { diaryDetail } = useFetchDiaryDetail(diaryId);

  const {
    selectedMood,
    selectedEmotions,
    selectedWeathers,
    text,
    setSelectedMood,
    setSelectedEmotions,
    setSelectedWeathers,
    setText,
    picture,
    setPicture,
    handleEmotionClick,
    handleWeatherClick,
    isSubmitting,
    handleSubmit,
  } = useDiaryActions(diaryDetail, currentDate, diaryId);

  useEffect(() => {
    if (!diaryId) {
      const autosaveData = sessionStorage.getItem('autosave');

      if (autosaveData) {
        const { selectedMood, selectedEmotions, selectedWeathers, text } =
          JSON.parse(autosaveData);

        if (selectedMood) {
          setSelectedMood(selectedMood);
        }

        if (selectedEmotions && Array.isArray(selectedEmotions)) {
          setSelectedEmotions(selectedEmotions);
        }

        if (selectedWeathers && Array.isArray(selectedWeathers)) {
          setSelectedWeathers(selectedWeathers);
        }

        if (text) {
          setText(text);
        }
      }
    }
  }, [
    setSelectedEmotions,
    setSelectedMood,
    setSelectedWeathers,
    setText,
    diaryId,
  ]);

  useEffect(() => {
    if (!diaryId) {
      const saveData = debounce(() => {
        const autosaveData = {
          selectedMood,
          selectedEmotions,
          selectedWeathers,
          text,
        };

        sessionStorage.setItem('autosave', JSON.stringify(autosaveData));
      }, 500);

      saveData();
      return () => saveData.cancel();
    }
  }, [selectedMood, selectedEmotions, selectedWeathers, text, diaryId]);

  return (
    <>
      <Helmet>
        <title>하루몽 - 일기작성</title>
        <meta name="description" content="하루몽 일기작성 페이지 입니다." />
        <meta property="author" content="하루몽" />

        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://harumong.netlify.app/diary/new"
        />
        <meta property="og:site_name" content="하루몽 - 감정일기" />
        <meta property="og:title" content="하루몽 - 감정일기" />
        <meta
          property="og:description"
          content="감정 기반으로 작성하는 일기 어플리케이션 하루몽"
        />
        <meta
          property="og:image"
          content="https://harumong.netlify.app/logo.png"
        />
      </Helmet>

      <section className="flex flex-col gap-5 pb-[100px]">
        <TopHeader title={currentDate} isShowIcon={true} />
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <SelectMood isSelected={selectedMood} setSelected={setSelectedMood} />
          <Accordion
            open={true}
            title="감정"
            className="grid grid-cols-5 gap-4"
          >
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
          <Accordion
            open={true}
            title="날씨"
            className="grid grid-cols-5 gap-4"
          >
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
              className={`${isSubmitting && 'bg-gray-300 cursor-not-allowed'}`}
              buttonType="submit"
              text={diaryId ? '수정완료' : '작성완료'}
              size="large"
              disabled={isSubmitting}
            />
          </footer>
        </form>
      </section>
    </>
  );
};

export default NewDiary;
