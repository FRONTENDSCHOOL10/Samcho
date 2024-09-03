import { EmotionRanking, MoodDistributionChart, TopHeader } from '@/components';

const Chart = () => {
  return (
    <div className="flex flex-col gap-5">
      <TopHeader title="분석보고서" />
      <MoodDistributionChart />
      <EmotionRanking />
    </div>
  );
};

export default Chart;
