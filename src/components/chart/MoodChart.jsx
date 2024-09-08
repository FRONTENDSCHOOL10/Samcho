import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';
import { eachDayOfInterval, format, isSaturday } from 'date-fns';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale
);

// 기분 리스트
const moods = ['행복', '기쁨', '보통', '나쁨', '슬픔'];

// 기분을 y축에 매핑할 숫자
const moodMapping = {
  행복: 5,
  기쁨: 4,
  보통: 3,
  나쁨: 2,
  슬픔: 1,
};

const MoodChart = () => {
  const generateData = () => {
    const data = [];
    for (let i = 1; i <= 31; i++) {
      const mood = moods[Math.floor(Math.random() * moods.length)];
      data.push({
        x: `2023-09-${String(i).padStart(2, '0')}`,
        y: moodMapping[mood],
      });
    }
    return data;
  };

  const moodData = generateData();

  const getSaturdays = () => {
    const days = eachDayOfInterval({
      start: new Date(2023, 8, 1),
      end: new Date(2023, 8, 30),
    });
    return days
      .filter((day) => isSaturday(day))
      .map((day) => format(day, 'yyyy-MM-dd'));
  };

  const saturdays = getSaturdays();

  const data = {
    datasets: [
      {
        label: '기분',
        data: moodData,
        borderColor: '#D3E0EF',
        backgroundColor: '#A7C1DF',
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          callback: (value) => {
            return saturdays.includes(value) ? value : '';
          },
        },
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          callback: (value) => {
            const mood = Object.keys(moodMapping).find(
              (key) => moodMapping[key] === value
            );
            return mood || value;
          },
          stepSize: 1,
        },
      },
    },
    plugins: {
      legend: {
        display: false, // 범례 숨김
      },
    },
  };

  return (
    <article className="bg-white p-[0.9375rem] rounded-[0.625rem] shadow-light">
      <h2 className="mb-6 text-base font-semibold text-gray-450">
        기분 그래프
      </h2>
      <Line data={data} options={options} />
    </article>
  );
};

export default MoodChart;
