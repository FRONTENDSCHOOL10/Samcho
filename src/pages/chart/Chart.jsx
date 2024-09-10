import { useState } from 'react';
import { format } from 'date-fns';
import {
  EmotionRanking,
  MoodDistributionChart,
  TopHeader,
  MoodChart,
  YearMonth,
} from '@/components';

const Chart = () => {
  // 현재 날짜를 기준으로 초기 selectedMonth 설정
  const [selectedMonth, setSelectedMonth] = useState(() =>
    format(new Date(), 'yyyy-MM')
  );

  return (
    <section className="flex flex-col gap-5 pb-[80px]">
      <TopHeader title="분석보고서" />

      <YearMonth
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      <MoodChart />

      <MoodDistributionChart />

      <EmotionRanking selectedMonth={selectedMonth} />
    </section>
  );
};

export default Chart;
