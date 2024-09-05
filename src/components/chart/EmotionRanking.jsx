import { Link } from 'react-router-dom';
import { EmotionRankCard } from '@/components';

const rankingsData = [
  { mood: 'happy', count: 40, rank: 1 },
  { mood: 'smile', count: 20, rank: 2 },
  { mood: 'soso', count: 10, rank: 3 },
];

const EmotionRanking = () => {
  const topMood = rankingsData.reduce(
    (prev, current) => (prev.count > current.count ? prev : current),
    rankingsData[0]
  );

  const description = (
    <>
      이번 달에는{' '}
      <span className="font-bold text-blue-500">{topMood.mood}</span>을(를) 많이
      기록했어요.
    </>
  );

  return (
    <div className="flex flex-col w-full gap-6 p-4 bg-white rounded-lg shadow-light">
      <header className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-600">감정랭킹</h2>
        <Link
          to="/chart/more"
          aria-label="감정 랭킹 더보기"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          더보기
        </Link>
      </header>

      <div className="flex justify-around">
        {rankingsData.map((rankItem) => (
          <article
            key={rankItem.rank}
            className="w-24 flex flex-col items-center gap-2.5"
            aria-labelledby={`rank-title-${rankItem.rank}`}
            aria-describedby={`rank-description-${rankItem.rank}`} // aria-describedby로 추가 설명 연결
          >
            <h2 id={`rank-title-${rankItem.rank}`} className="sr-only">
              {rankItem.mood}
            </h2>
            <EmotionRankCard
              text={rankItem.mood}
              count={rankItem.count}
              rank={rankItem.rank}
            />
          </article>
        ))}
      </div>
      <p className="text-base font-medium text-center text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default EmotionRanking;
