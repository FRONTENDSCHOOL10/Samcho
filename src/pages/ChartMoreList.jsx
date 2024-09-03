import { useState } from 'react';
import { IconRankMoreList, ToggleButton, TopHeader } from '@/components';

const ChartMoreList = () => {
  const [activeButton, setActiveButton] = useState('기록 수 많은 순');

  const handleToggle = (buttonText) => {
    setActiveButton(buttonText);
  };

  const getButtonClass = (buttonText) =>
    activeButton === buttonText
      ? 'bg-blue-500 text-white font-bold border-blue-500'
      : 'bg-white text-blue-500 border-gray-200 font-medium';

  return (
    <>
      <TopHeader title="감정 랭킹" isShowIcon={true} />
      <div className="flex pt-5 gap-x-2">
        <ToggleButton
          text="기록 수 많은 순"
          onClick={() => handleToggle('기록 수 많은 순')}
          className={getButtonClass('기록 수 많은 순')}
        />
        <ToggleButton
          text="기록 수 적은 순"
          onClick={() => handleToggle('기록 수 적은 순')}
          className={getButtonClass('기록 수 적은 순')}
        />
      </div>
      <div className="flex flex-col bg-white p-[0.9375rem] mt-5 rounded-[0.625rem] shadow-light">
        <IconRankMoreList rank={1} emotion="신나는" count={30} />
        <IconRankMoreList rank={2} emotion="기대되는" count={20} />
        <IconRankMoreList rank={20} emotion="설레는" count={10} />
      </div>
    </>
  );
};

export default ChartMoreList;
