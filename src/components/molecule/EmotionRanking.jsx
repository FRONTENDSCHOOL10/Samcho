import { Link } from 'react-router-dom';
import { EmotionRankCard } from '@/components';

const EmotionRanking = () => {
  const rankingsData = [
    { mood: 'happy', count: 40, rank: 1 },
    { mood: 'smile', count: 20, rank: 2 },
    { mood: 'soso', count: 10, rank: 3 },
  ];

  const topMood = rankingsData.reduce(
    (prev, current) => (prev.count > current.count ? prev : current),
    rankingsData[0]
  );

  const description = (
    <span>
      이번 달에는{' '}
      <span className="font-bold text-blue-500">{topMood.mood}</span>을(를) 많이
      기록했어요.
    </span>
  );

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow-light flex flex-col gap-6">
      <header className="flex items-center justify-between">
        <h2 className="text-gray-600 text-base font-semibold">감정랭킹</h2>
        <Link 
          to="/chart/more"
          aria-label="감정 랭킹 더보기"
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          더보기
        </Link>
      </header>

      <div className="flex justify-between">
        {rankingsData.map((rankItem) => (
          <article
            key={rankItem.rank}
            className="w-24 flex flex-col items-center gap-2.5"
            aria-labelledby={`rank-item-${rankItem.rank}`}
          >
            <EmotionRankCard
              text={rankItem.mood}
              count={rankItem.count}
              rank={rankItem.rank}
            />
            <div id={`rank-item-${rankItem.rank}`} className="sr-only">
              순위 {rankItem.rank}위: {rankItem.mood} - 기록 수: {rankItem.count}
            </div>
          </article>
        ))}
      </div>

      <p className="text-center text-gray-600 text-base font-medium">
        {description}
      </p>
    </div>
  );
};

export default EmotionRanking;
