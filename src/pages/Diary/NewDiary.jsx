import { Accordion, SelectPicture, TextArea, TopHeader } from '@/components';
import WeatherWithIcon from '@/components/atomic/WeatherWithIcon';

export const Component = () => {
  return (
    <div className="flex flex-col gap-5">
      <TopHeader title={'일기작성'} isShowIcon={true} />
      <Accordion title="감정" className="grid grid-cols-5 gap-x-8 gap-y-4">
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
        <WeatherWithIcon text="감정" />
      </Accordion>
      <Accordion title="날씨" className="grid grid-cols-5 gap-8">
        <WeatherWithIcon text="맑음" />
        <WeatherWithIcon text="맑음" />
        <WeatherWithIcon text="맑음" />
        <WeatherWithIcon text="맑음" />
        <WeatherWithIcon text="맑음" />
      </Accordion>
      <TextArea />
      <SelectPicture />
    </div>
  );
};
