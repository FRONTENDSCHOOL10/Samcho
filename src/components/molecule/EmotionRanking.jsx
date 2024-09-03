import { Link } from 'react-router-dom';
import { EmotionRankCard } from '@/components';

const EmotionRanking = () => {
  const rankingsData = [
    {
      mood: 'happy',
      count: 40,
      rank: 1,
    },
    {
      mood: 'smile',
      count: 20,
      rank: 2,
    },
    {
      mood: 'soso',
      count: 10,
      rank: 3,
    },
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
    <div className="w-full p-[15px] bg-white rounded-[15px] shadow flex flex-col gap-6">
      <div className="flex items-center justify-between w-full">
        <div className="text-[#555555] text-base font-semibold font-['Pretendard']">
          감정랭킹
        </div>
        <div className="flex items-center">
          <div className="w-[37px] h-[17.13px] text-[#979797] text-sm font-medium font-['Pretendard'] mr-1">
            <Link to="/chart/more">더보기</Link>
          </div>
        </div>
      </div>

      <div className="flex justify-around">
        {rankingsData.map((rankItem) => (
          <div
            key={rankItem.rank}
            className="relative w-[99px] flex flex-col items-center gap-2.5"
          >
            <EmotionRankCard
              text={rankItem.mood}
              count={rankItem.count}
              rank={rankItem.rank}
            />
          </div>
        ))}
      </div>

      <div className="text-center text-[#555555] text-base font-medium font-['Pretendard']">
        {description}
      </div>
    </div>
  );
};

export default EmotionRanking;
