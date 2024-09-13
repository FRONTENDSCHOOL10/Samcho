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
import { useFetchDiaryDetail, useDiaryActions, useBlocker } from '@/hooks';
import { format } from 'date-fns';
import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const BLOCK_MESSAGE =
  '`작성 중인 내용이 저장되지 않아요. \n페이지를 벗어나시겠습니까?`';

export const Component = () => {
  const location = useLocation();
  const { date, diaryId } = location.state || {};

  const defaultTitle = date || format(new Date(), 'yyyy-MM-dd');

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
  } = useDiaryActions(diaryDetail, defaultTitle, diaryId);

  const isAnyInputMade = useCallback(() => {
    return (
      selectedMood !== null ||
      selectedEmotions.length > 0 ||
      selectedWeathers.length > 0 ||
      text.trim() !== '' ||
      picture !== null
    );
  }, [selectedMood, selectedEmotions, selectedWeathers, text, picture]);

  const { renderPrompt } = useBlocker(isAnyInputMade, {
    message: `${BLOCK_MESSAGE}`,
  });

  return (
    <section className="flex flex-col gap-5 pb-[100px]">
      <TopHeader title={defaultTitle} isShowIcon={true} />
      {renderPrompt()} {/* 차단된 상태일 때 경고 메시지 표시 */}
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
