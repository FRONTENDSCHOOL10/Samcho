import { EmotionRanking, MoodDistributionChart, TopHeader } from '@/components';

const Chart = () => {
  return (
    <>
      <TopHeader title="분석보고서" />
      <MoodDistributionChart />
      <EmotionRanking />
    </>
  );
};

export default Chart;
