import { useState, useEffect } from 'react';
import { IconRankMoreList, ToggleButton, TopHeader } from '@/components';
import pb from '@/api/pb';
import emotions from '@/assets/icons/emotions/emotions';
import { useLocation } from 'react-router-dom';
import { format } from 'date-fns';

const ChartMoreList = () => {
  const location = useLocation();

  // Link에서 넘겨받은 selectedMonth를 받음, 없을 경우 현재 월을 기본값으로 설정
  const selectedMonth =
    location.state?.selectedMonth || format(new Date(), 'yyyy-MM');

  const [activeButton, setActiveButton] = useState('기록 수 많은 순');
  const [rankingsData, setRankingsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleToggle = (buttonText) => {
    setActiveButton(buttonText);
  };

  const getButtonClass = (buttonText) =>
    activeButton === buttonText
      ? 'bg-blue-500 text-white font-bold border-blue-500'
      : 'bg-white text-blue-500 border-gray-200 font-medium';

  useEffect(() => {
    const fetchRankingsData = async () => {
      try {
        const diaryData = await pb.collection('diary').getFullList({
          filter: `date >= '${selectedMonth}-01' && date <= '${selectedMonth}-31'`,
        });

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
      } catch (error) {
        console.error('Error fetching rankings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankingsData();
  }, [selectedMonth, activeButton]);

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
