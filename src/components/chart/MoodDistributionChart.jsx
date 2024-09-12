import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { MoodDistribution } from '@/components';

const MoodDistributionChart = ({ diaryData, loading }) => {
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

      const moods = ['행복', '기쁨', '보통', '나쁨', '슬픔'];

      // 데이터 0일때도 화면에 렌더링 시킨다
      const moodData = moods.map((mood) => {
        const count = moodCount[mood] || 0;
        const ratio =
          totalEntries > 0 ? ((count / totalEntries) * 100).toFixed(0) : '0';
        return {
          mood,
          ratio: parseInt(ratio, 10),
          color: getMoodColor(mood),
        };
      });

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
      {!diaryData.length || !moodData.some((data) => data.ratio > 0) ? (
        <span className="text-center text-gray-500 text-sm">
          기분분포 데이터가 없어요!
        </span>
      ) : (
        <>
          <ul className="flex flex-row items-center self-stretch justify-between">
            {moodData.map((data) => (
              <li key={data.mood} className="list-none">
                <MoodDistribution mood={data.mood} ratio={Number(data.ratio)} />{' '}
              </li>
            ))}
          </ul>
          {/* 막대 그래프 */}
          <div className="w-full h-[33px] rounded-2xl flex overflow-hidden">
            {moodData.map((data) => (
              <div
                key={data.mood}
                style={{ width: `${data.ratio}%` }}
                className={`flex-grow h-full ${data.color}`}
              ></div>
            ))}
          </div>
        </>
      )}
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
