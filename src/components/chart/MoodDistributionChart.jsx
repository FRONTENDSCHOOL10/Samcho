import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { MoodDistribution } from '@/components';

const MoodDistributionChart = ({ diaryData, loading }) => {
  // 커스텀 훅 사용
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    if (!loading && diaryData) {
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
        ratio: ((count / totalEntries) * 100).toFixed(0), // 문자열로 변환됨
        color: getMoodColor(mood),
      }));

      setMoodData(moodData);
    }
  }, [diaryData, loading]);

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
            <MoodDistribution mood={data.mood} ratio={Number(data.ratio)} />{' '}
            {/* 숫자로 변환 */}
          </li>
        ))}
      </ul>
      {/* 막대 그래프 */}
      <div className="w-full h-[33px] rounded-2xl flex overflow-hidden">
        {moodData.map((data) => (
          <div
            key={data.mood}
            style={{ width: `${data.ratio}%` }} // 문자열로 설정됨
            className={`${data.color} h-full`}
          ></div>
        ))}
      </div>
    </article>
  );
};

MoodDistributionChart.propTypes = {
  diaryData: PropTypes.arrayOf(
    PropTypes.shape({
      mood: PropTypes.string, // 각 항목의 mood가 문자열
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MoodDistributionChart;
