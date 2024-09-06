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
    <article className="flex flex-col w-full gap-6 p-4 bg-white rounded-lg shadow-light">
      <header className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-600">감정랭킹</h2>
        <Link
          to="/chart/more"
          aria-label="감정 랭킹 더보기"
          className="text-sm text-gray-500"
        >
          더보기
        </Link>
      </header>

      <div className="flex justify-around gap-5">
        {rankingsData.map((rankItem) => (
          <EmotionRankCard
            key={rankItem.mood}
            text={rankItem.mood}
            count={rankItem.count}
            rank={rankItem.rank}
          />
        ))}
      </div>
      <footer className="text-base font-medium text-center text-gray-600">
        {description}
      </footer>
    </article>
  );
};

export default EmotionRanking;
