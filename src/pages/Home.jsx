import {
  Calendar,
  DiaryCard,
  LoadingSpinner,
  TopNavigation,
  YearMonth,
} from '@/components';
import { useFetchAllBuddyData } from '@/hooks';
import { useMonthlyDateStore } from '@/stores';
import { useCallback, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const {
    viewMode,
    setViewMode,
    selectedMood,
    setSelectedMood,
    selectedMonth,
    setSelectedMonth,
    diaryData,
    loading,
    initialize,
  } = useMonthlyDateStore();

  useEffect(() => {
    // 페이지 진입 시 초기화 로직 호출
    initialize();
  }, [initialize]);

  useEffect(() => {
    navigate(`/home/${viewMode}`);
  }, [navigate, viewMode]);

  const { buddyData } = useFetchAllBuddyData();

  const filteredMoodData = useMemo(() => {
    const dataToReturn =
      selectedMood === '전체'
        ? diaryData
        : diaryData.filter((diary) => diary.mood === selectedMood);

    return dataToReturn.sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [diaryData, selectedMood]);

  useEffect(() => {
    if (
      selectedMood !== '전체' &&
      filteredMoodData.length === 0 &&
      diaryData.length !== 0
    ) {
      toast.error(`${selectedMood} 기분의 일기가 없어요😥`, {
        duration: 2000,
        id: 'filterError',
      });
    }
  }, [selectedMood, filteredMoodData.length, diaryData.length]);

  const handleToggleView = useCallback(() => {
    setViewMode(viewMode === 'calendar' ? 'list' : 'calendar');
  }, [viewMode, setViewMode]);

  const renderContent = () => {
    if (loading)
      return <LoadingSpinner text="하루몽이 일기를 불러오고 있어요" />;

    if (viewMode === 'calendar') {
      return (
        <Calendar
          diaryData={diaryData}
          selectedMonth={selectedMonth}
          selectedMood={selectedMood}
        />
      );
    }

    return (
      <main className="flex flex-col gap-5">
        {filteredMoodData.length > 0 ? (
          filteredMoodData.map((diary) => (
            <DiaryCard key={diary.id} diary={diary} buddyData={buddyData} />
          ))
        ) : (
          <div className="fixed flex flex-col items-center w-full gap-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <p className="mt-5 font-semibold text-center text-gray-300">
              해당 월에는 아직 일기 기록이 없어요
            </p>
          </div>
        )}
      </main>
    );
  };

  return (
    <>
      <Helmet>
        <title>하루몽 - 홈</title>
        <meta name="description" content="하루몽 홈 페이지 입니다." />
        <meta property="author" content="하루몽" />

        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://harumong.netlify.app/home/calendar"
        />
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

      <section className="min-h-dvh pb-[80px]">
        <h1 className="sr-only">캘린더</h1>
        <TopNavigation
          selectedMood={selectedMood}
          setSelectedMood={setSelectedMood}
          onToggleView={handleToggleView}
        />
        <YearMonth
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          className="py-5"
        />
        {renderContent()}
      </section>
    </>
  );
};

export default Home;
