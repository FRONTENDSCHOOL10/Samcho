import { useEffect, useState } from 'react';
import { MoodDistribution } from '../index';
import pb from '@/api/pb'; // PocketBase import

const MoodDistributionChart = ({ selectedMonth }) => {
  const [moodData, setMoodData] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(selectedMonth);
  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        // 선택된 월의 diary 데이터 가져오기
        const diaryData = await pb.collection('diary').getFullList({
          filter: `date >= '${selectedMonth}-01' && date <= '${selectedMonth}-31'`,
          requestKey: null,
        });

        console.log(diaryData);
        // 기분 데이터 추출 및 비율 계산
        const moodCount = diaryData.reduce((acc, item) => {
          const mood = item.mood; // 기분 데이터
          if (mood) {
            acc[mood] = (acc[mood] || 0) + 1;
          }
          return acc;
        }, {});

        const totalEntries = Object.values(moodCount).reduce(
          (sum, count) => sum + count,
          0
        );

        const moodData = Object.entries(moodCount).map(([mood, count]) => ({
          mood,
          ratio: ((count / totalEntries) * 100).toFixed(0),
          color: getMoodColor(mood),
        }));

        setMoodData(moodData);
      } catch (error) {
        console.error(`Error fetching mood data: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMoodData();
  }, [selectedMonth]);

  const getMoodColor = (mood) => {
    switch (mood) {
      case '행복':
        return 'bg-blue-50';
      case '기쁨':
        return 'bg-blue-200';
      case '보통':
        return 'bg-blue-400';
      case '나쁨':
        return 'bg-blue-700';
      case '슬픔':
        return 'bg-gray-300';
      default:
        return 'bg-blue-50';
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <article className="w-full p-[15px] rounded-[0.625rem] bg-white flex flex-col gap-6 shadow-light">
      <h2 className="text-base font-semibold text-gray-450 h-[19px]">
        기분 분포
      </h2>
      <ul className="flex flex-row items-center self-stretch justify-between">
        {moodData.map((data) => (
          <li key={data.mood} className="list-none">
            <MoodDistribution mood={data.mood} ratio={data.ratio} />
          </li>
        ))}
      </ul>
      {/* 막대 그래프 */}
      <div className="w-full h-[33px] rounded-2xl flex overflow-hidden">
        {moodData.map((data) => (
          <div
            key={data.mood}
            style={{ width: `${data.ratio}%` }}
            className={`${data.color} h-full`}
          ></div>
        ))}
      </div>
    </article>
  );
};

export default MoodDistributionChart;
