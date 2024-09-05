import {
  EmotionRanking,
  MoodDistributionChart,
  TopHeader,
  MoodChart,
  YearMonth,
} from '@/components';

const Chart = () => {
  return (
    <div className="flex flex-col gap-5">
      <TopHeader title="분석보고서" />
      <YearMonth />
      <MoodChart />
      <MoodDistributionChart />
      <EmotionRanking />
    </div>
  );
};

export default Chart;
