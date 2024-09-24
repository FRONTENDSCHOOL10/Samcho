import {
  EmotionRanking,
  MoodChart,
  MoodDistributionChart,
  TopHeader,
  YearMonth,
} from '@/components';
import { useMonthlyDateStore } from '@/stores';
import { Suspense, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

const Chart = () => {
  const { selectedMonth, setSelectedMonth, diaryData, loading, initialize } =
    useMonthlyDateStore();

  useEffect(() => {
    // 페이지 진입 시 초기화 로직 호출
    initialize();
  }, [initialize]);

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
          content="https://harumong.netlify.app/logo.webp"
        />
      </Helmet>
      <section className="flex flex-col gap-5 pb-[80px]">
        <TopHeader title="분석보고서" />
        <YearMonth
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
        />
        <Suspense
          fallback={
            <div className="w-[400px] h-[304px] bg-white shadow-light"></div>
          }
        >
          <MoodChart diaryData={diaryData} loading={loading} />
        </Suspense>
        <MoodDistributionChart diaryData={diaryData} loading={loading} />
        <EmotionRanking diaryData={diaryData} loading={loading} />
      </section>
    </>
  );
};

export default Chart;
