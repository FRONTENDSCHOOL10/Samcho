import PropTypes from 'prop-types';

const EmotionRanking = ({ title,linkHref  }) => {
  
  const rankingsData = [
    { mood: 'happy', count: 40, rank: 1, color: 'bg-[#f1f5fa]', iconBgColor: 'bg-[#d3e0ef]' },
    { mood: 'smile', count: 20, rank: 2, color: 'bg-[#f1f5fa]', iconBgColor: 'bg-[#d3e0ef]' },
    { mood: 'soso', count: 10, rank: 3, color: 'bg-[#f1f5fa]', iconBgColor: 'bg-[#d3e0ef]' },
  ];

  const topMood = rankingsData.reduce((prev, current) => (prev.count > current.count ? prev : current), rankingsData[0]);

  const description = (
    <span>
      이번 달에는 <span className="font-bold text-blue-500">{topMood.mood}</span>을(를) 많이 기록했어요.
    </span>
  );

  return (
    <div className="w-[351.52px] h-[252.15px] p-[15px] bg-white rounded-[15px] shadow flex flex-col gap-6">
      <div className="flex items-center justify-between w-full">
        <div className="text-[#555555] text-base font-semibold font-['Pretendard']">{title}</div>
        <div className="flex items-center">
          <div className="w-[37px] h-[17.13px] text-[#979797] text-sm font-medium font-['Pretendard'] mr-1">
          <a href={linkHref}>더보기</a>
          </div>
          <div className="w-[22.32px] h-[20.15px] rounded-[22px] flex items-center justify-center">
            <span className="text-[#979797] text-sm font-medium">&gt;</span>
          </div>
        </div>
      </div>

      <div className="flex gap-[9px]">
        {rankingsData.map((rankItem) => (
          <div key={rankItem.rank} className="relative w-[99px] flex flex-col items-center gap-2.5">
            <div className={`w-[99px] h-[135px] ${rankItem.color} rounded-[10px] flex flex-col items-center justify-between pt-[28px]`}>
              <div className={`w-[50px] h-[50px] ${rankItem.iconBgColor} rounded-full`} />
              <div className="text-[#4d82be] text-xs font-medium font-['Pretendard'] mt-2">
                {rankItem.mood}
              </div>
              <div className="text-[#4d82be] text-xs font-medium font-['Pretendard'] mb-4">
                {rankItem.count}회
              </div>
              <div className="absolute top-2 left-2 text-[#4d82be] text-sm font-semibold font-['Pretendard']">
                {rankItem.rank}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center text-[#555555] text-base font-medium font-['Pretendard']">
        {description}
      </div>
    </div>
  );
};

EmotionRanking.propTypes = {
  title: PropTypes.string.isRequired,
  linkHref: PropTypes.string.isRequired, 
};

export default EmotionRanking;
