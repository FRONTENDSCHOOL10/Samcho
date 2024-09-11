import { useState, useEffect } from 'react';
import { IconRankMoreList, ToggleButton, TopHeader } from '@/components';
import emotions from '@/assets/icons/emotions/emotions';
import { useLocation } from 'react-router-dom';

const ChartMoreList = () => {
  const location = useLocation();
  const { diaryData } = location.state || {}; // state에서 diaryData를 받음

  const [activeButton, setActiveButton] = useState('기록 수 많은 순');
  const [rankingsData, setRankingsData] = useState([]);
  const [loading, setLoading] = useState(false); // 로딩 상태를 false로 초기화

  const handleToggle = (buttonText) => {
    setActiveButton(buttonText);
  };

  const getButtonClass = (buttonText) =>
    activeButton === buttonText
      ? 'bg-blue-500 text-white font-bold border-blue-500'
      : 'bg-white text-blue-500 border-gray-200 font-medium';

  useEffect(() => {
    const fetchRankingsData = () => {
      if (!diaryData) {
        console.error('No diary data available');
        return;
      }

      const rank = diaryData.reduce((acc, item) => {
        const emotionsArray = item.emotion || [];

        emotionsArray.forEach((emotion) => {
          acc[emotion] = (acc[emotion] || 0) + 1;
        });

        return acc;
      }, {});

      const rankingsArray = Object.entries(rank)
        .map(([emotion, count]) => ({
          emotion,
          count,
          image: emotions[emotion],
        }))
        .sort((a, b) =>
          activeButton === '기록 수 많은 순'
            ? b.count - a.count
            : a.count - b.count
        )
        .slice(0, 10); // 상위 10개만 선택

      setRankingsData(rankingsArray);
      setLoading(false); // 로딩 완료
    };

    setLoading(true); // 로딩 시작
    fetchRankingsData();
  }, [diaryData, activeButton]);

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <section className="min-h-dvh pb-[80px]">
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
        {rankingsData.map((rankItem, index) => (
          <IconRankMoreList
            key={rankItem.emotion}
            rank={index + 1}
            emotion={rankItem.emotion}
            count={rankItem.count}
          />
        ))}
      </div>
    </section>
  );
};

export default ChartMoreList;
