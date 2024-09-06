import {
  EmotionRanking,
  MoodDistributionChart,
  TopHeader,
  MoodChart,
  YearMonth,
} from '@/components';
import { format } from 'date-fns';
import { useState } from 'react';

const Chart = () => {
  const [selectedMonth, setSelectedMonth] = useState(() =>
    format(new Date(), 'yyyy-MM')
  );

  return (
    <div className="flex flex-col gap-5">
      <TopHeader title="분석보고서" />
      <YearMonth
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <MoodChart />
      <MoodDistributionChart />
      <EmotionRanking />
    </div>
  );
};

export default Chart;
