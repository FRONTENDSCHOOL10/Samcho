import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EmotionRankCard } from '@/components';
import emotions from '@/assets/icons/emotions/emotions';
import { SyncLoader } from 'react-spinners';

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

  const description = rankingsData.length ? (
    <>
      이번 달에는{' '}
      <span className="text-base font-semibold text-blue-500">
        {rankingsData[0].emotion}
      </span>
      을(를) 가장 많이 기록했어요
    </>
  ) : (
    <span className="text-sm font-medium text-center text-gray-300">
      이번 달에는 아직 기록한 감정이 없어요
    </span>
  );

  return (
    <article className="flex flex-col w-full min-h-[270px] gap-6 p-4 bg-white rounded-[0.625rem] shadow-light">
      <header className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-600">감정 랭킹</h2>
        <Link
          to="/chart/more"
          state={{ diaryData }}
          aria-label="감정 랭킹 더보기"
          className="text-sm font-semibold text-gray-300"
        >
          더보기
        </Link>
      </header>
      {loading ? (
        <div className="flex flex-col items-center justify-center flex-1 w-full gap-4 font-medium">
          <SyncLoader color="#4D82BE" size={10} margin={4} />
          <p className="text-center text-gray-400">
            하루몽이 감정 랭킹을 가져오고 있어요
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-5">
            {(rankingsData.length > 0 ? rankingsData : defaultRankingsData).map(
              (rankItem) => (
                <EmotionRankCard
                  grayscale={rankingsData.length === 0}
                  key={rankItem.rank}
                  text={rankItem.emotion}
                  count={rankItem.count}
                  rank={rankItem.rank}
                  image={rankItem.image}
                  className="w-full"
                />
              )
            )}
          </div>
          <footer className="text-sm font-medium text-center text-gray-600">
            {description}
          </footer>
        </>
      )}
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
