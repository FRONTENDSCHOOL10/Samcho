import { useState } from 'react';
import { format } from 'date-fns';
import {
  EmotionRanking,
  MoodDistributionChart,
  TopHeader,
  MoodChart,
  YearMonth,
} from '@/components';
import { useFetchMonthlyDiaryData } from '@/hooks';

const Chart = () => {
  const [selectedMonth, setSelectedMonth] = useState(() =>
    format(new Date(), 'yyyy-MM')
  );
  const { diaryData, loading } = useFetchMonthlyDiaryData(selectedMonth);

  return (
    <section className="flex flex-col gap-5 pb-[80px]">
      <TopHeader title="분석보고서" />
      <YearMonth
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
      <MoodChart diaryData={diaryData} loading={loading} />
      <MoodDistributionChart diaryData={diaryData} loading={loading} />
      <EmotionRanking diaryData={diaryData} loading={loading} />
    </section>
  );
};

export default Chart;
