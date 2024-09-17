import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EmotionRankCard } from '@/components';
import emotions from '@/assets/icons/emotions/emotions';

const defaultRankingsData = Array.from({ length: 3 }, (_, index) => ({
  emotion: '기록 없음',
  count: 0,
  rank: index + 1,
  image: '/icons/emotions/default.png',
}));

const EmotionRanking = ({ diaryData, loading }) => {
  const [rankingsData, setRankingsData] = useState([]);

  useEffect(() => {
    if (!loading && diaryData) {
      // 감정별 기록 횟수를 저장할 객체
      const rank = diaryData.reduce((acc, item) => {
        (item.emotion || []).forEach((emotion) => {
          acc[emotion] = (acc[emotion] || 0) + 1;
        });
        return acc;
      }, {});

      // 감정 데이터를 배열로 변환하고 횟수별로 내림차순 정렬, 상위 3개 감정 선택
      const renderData = Object.entries(rank)
        .map(([emotion, count]) => ({
          emotion,
          count,
          image: emotions[emotion] || '/default-image-path.png',
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
        .map((item, index) => ({
          ...item,
          rank: index + 1,
        }));

      setRankingsData(renderData);
    }
  }, [diaryData, loading]);

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 중 표시
  }

  const description = rankingsData.length ? (
    <>
      이번 달에는{' '}
      <span className="text-base font-bold text-blue-500">
        {rankingsData[0].emotion}
      </span>
      을(를) 가장 많이 기록했어요.
    </>
  ) : (
    <span className="text-base font-semibold text-center text-gray-300">
      이번 달에는 아직 기록한 감정이 없어요.
    </span>
  );

  return (
    <article className="flex flex-col w-full gap-6 p-4 bg-white rounded-[0.625rem] shadow-light">
      <header className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-600">감정랭킹</h2>
        <Link
          to="/chart/more"
          state={{ diaryData }}
          aria-label="감정 랭킹 더보기"
          className="text-sm font-semibold text-gray-300"
        >
          더보기
        </Link>
      </header>

      <div className="flex justify-around gap-5">
        {(rankingsData.length > 0 ? rankingsData : defaultRankingsData).map(
          (rankItem) => (
            <EmotionRankCard
              grayscale={rankingsData.length === 0 ? true : false}
              key={rankItem.rank}
              text={rankItem.emotion}
              count={rankItem.count}
              rank={rankItem.rank}
              image={rankItem.image}
            />
          )
        )}
      </div>
      <footer className="text-sm font-medium text-center text-gray-600">
        {description}
      </footer>
    </article>
  );
};

EmotionRanking.propTypes = {
  diaryData: PropTypes.arrayOf(
    PropTypes.shape({
      emotion: PropTypes.arrayOf(PropTypes.string),
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default EmotionRanking;
