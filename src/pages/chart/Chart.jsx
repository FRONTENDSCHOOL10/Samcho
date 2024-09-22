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
import { Helmet } from 'react-helmet-async';

const Chart = () => {
  const [selectedMonth, setSelectedMonth] = useState(() =>
    format(new Date(), 'yyyy-MM')
  );
  const { diaryData, loading } = useFetchMonthlyDiaryData(selectedMonth);

  return (
    <>
      <Helmet>
        <title>하루몽 - 통계</title>
        <meta name="description" content="하루몽 통계 페이지 입니다." />
        <meta property="author" content="하루몽" />

        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://harumong.netlify.app/chart" />
        <meta property="og:site_name" content="하루몽 - 감정일기" />
        <meta property="og:title" content="하루몽 - 감정일기" />
        <meta
          property="og:description"
          content="감정 기반으로 작성하는 일기 어플리케이션 하루몽"
        />
        <meta
          property="og:image"
          content="https://harumong.netlify.app/logo.png"
        />
      </Helmet>
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
    </>
  );
};

export default Chart;
