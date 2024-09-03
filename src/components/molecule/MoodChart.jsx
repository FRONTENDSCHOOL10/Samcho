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
const moods = ['행복', '기쁨', '평범', '울적', '엉엉'];

// 기분을 y축에 매핑할 숫자
const moodMapping = {
  행복: 5,
  기쁨: 4,
  평범: 3,
  울적: 2,
  엉엉: 1,
};

const MoodChart = () => {
  // 임의의 9월 기분 데이터를 생성합니다.
  const generateData = () => {
    const data = [];
    for (let i = 1; i <= 20; i++) {
      const mood = moods[Math.floor(Math.random() * moods.length)];
      data.push({
        x: `2023-09-${String(i).padStart(2, '0')}`,
        y: moodMapping[mood],
      });
    }
    return data;
  };

  const moodData = generateData();

  const data = {
    datasets: [
      {
        label: 'Mood',
        data: moodData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: false, // x축 라벨링 비활성화
      },
      y: {
        display: true, // y축 라벨링 활성화
        grid: {
          display: true, // y축 그리드 표시
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
    <div>
      <Line data={data} options={options} />
    </div>
  );
};

export default MoodChart;
