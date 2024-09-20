import PropTypes from 'prop-types';
import { SyncLoader } from 'react-spinners';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from 'recharts';

const moodOrder = ['행복', '기쁨', '보통', '나쁨', '슬픔'];

const MoodChart = ({ diaryData, loading }) => {
  const calculateMoodFrequency = () => {
    const frequency = moodOrder.reduce(
      (acc, mood) => ({ ...acc, [mood]: 0 }),
      {}
    );
    diaryData.forEach((entry) => {
      if (frequency[entry.mood] !== undefined) {
        frequency[entry.mood]++;
      }
    });
    return moodOrder.map((mood) => ({
      subject: mood,
      frequency: Math.max(frequency[mood], 0.15),
      fullMark: Math.max(diaryData.length, 1),
    }));
  };

  const chartData = calculateMoodFrequency();

  return (
    <article className="flex flex-col min-h-[304px] bg-white p-[0.9375rem] rounded-[0.625rem] shadow-light">
      <h2 className="text-base font-semibold text-gray-450">기분 차트</h2>
      {loading ? (
        <div className="flex flex-col items-center justify-center flex-1 w-full gap-4 font-medium">
          <SyncLoader color="#4D82BE" size={10} margin={4} />
          <p className="text-center text-gray-400">
            하루몽이 기분 차트를 가져오고 있어요
          </p>
        </div>
      ) : (
        <div className="flex justify-center">
          <ResponsiveContainer width="80%" height={250}>
            <RadarChart cx="50%" cy="55%" outerRadius="80%" data={chartData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" className="text-sm" />
              <Radar
                dataKey="frequency"
                stroke={`${diaryData.length > 0 ? '#6B97C9' : 'none'}`}
                fill={`${diaryData.length > 0 ? '#6B97C9' : 'none'}`}
                fillOpacity={`${diaryData.length > 0 ? 0.6 : 0}`}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
};

MoodChart.propTypes = {
  diaryData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      mood: PropTypes.string.isRequired,
    })
  ).isRequired,
  loading: PropTypes.bool.isRequired,
};

export default MoodChart;
