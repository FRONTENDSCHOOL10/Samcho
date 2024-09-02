import { MoodDistribution } from '../index';

const MoodDistributionChart = () => {
  const moodData = [
    { mood: 'happy', ratio: 40, color: 'bg-blue-50' },
    { mood: 'smile', ratio: 20, color: 'bg-blue-200' },
    { mood: 'soso', ratio: 20, color: 'bg-blue-400' },
    { mood: 'bad', ratio: 10, color: 'bg-blue-700' },
    { mood: 'sad', ratio: 10, color: 'bg-gray-300' },
  ];

  return (
    <>
      <div className="w-[326px] h-[168px] box-content p-[15px] rounded-[15px] bg-white flex flex-col gap-6 shadow-light">
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
        <div className="w-[326px] h-[33px] rounded-2xl flex overflow-hidden">
          {moodData.map((data) => (
            <div
              key={data.mood}
              style={{ width: `${data.ratio}%` }}
              className={`${data.color} h-full`}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MoodDistributionChart;