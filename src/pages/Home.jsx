import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';

import {
  Calendar,
  DiaryCard,
  LoadingSpinner,
  TopNavigation,
  YearMonth,
} from '@/components';
import { useFetchMonthlyDiaryData, useFetchAllBuddyData } from '@/hooks';

const Home = ({ viewMode: initialViewMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [viewMode, setViewMode] = useState(initialViewMode || 'calendar');
  const [selectedMood, setSelectedMood] = useState('전체');
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const queryParams = queryString.parse(location.search);
    return queryParams.date || format(new Date(), 'yyyy-MM');
  });

  const { diaryData, setDiaryData, loading } =
    useFetchMonthlyDiaryData(selectedMonth);
  const { buddyData } = useFetchAllBuddyData();

  const filteredMoodData = useMemo(() => {
    if (selectedMood === '전체') return diaryData;
    return diaryData.filter((diary) => diary.mood === selectedMood);
  }, [diaryData, selectedMood]);

  useEffect(() => {
    if (selectedMood !== '전체' && filteredMoodData.length === 0) {
      toast.error(`${selectedMood} 기분의 일기가 없어요😥`, {
        duration: 1000,
      });
    }
  }, [selectedMood, filteredMoodData.length]);

  const handleToggleView = useCallback(() => {
    setViewMode((prevMode) => (prevMode === 'calendar' ? 'list' : 'calendar'));
  }, []);

  useEffect(() => {
    const newQueryParams = queryString.stringify({
      date: selectedMonth,
    });
    navigate(`/home/${viewMode}?${newQueryParams}`, { replace: true });
  }, [navigate, selectedMonth, viewMode]);

  const handleDiaryDelete = useCallback(
    (id) => {
      setDiaryData((prevData) => prevData.filter((diary) => diary.id !== id));
    },
    [setDiaryData]
  );

  const handleMonthChange = useCallback((newMonth) => {
    setSelectedMonth(newMonth);
  }, []);

  const renderContent = () => {
    if (loading)
      return <LoadingSpinner text="하루몽이 일기를 불러오고 있어요" />;

    if (viewMode === 'calendar') {
      return (
        <Calendar
          diaryData={diaryData}
          selectedMonth={selectedMonth}
          selectedMood={selectedMood}
          loading={loading}
        />
      );
    }

    return (
      <main className="flex flex-col gap-5">
        {filteredMoodData.length > 0 ? (
          filteredMoodData.map((diary) => (
            <DiaryCard
              key={diary.id}
              diary={diary}
              buddyData={buddyData}
              onDelete={handleDiaryDelete}
            />
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
        <meta property="og:title" content="하루몽 - 감정일기" />
        <meta property="twitter:title" content="하루몽 - 감정일기" />
        <meta property="og:type" content="site" />
        <meta property="og:url" content="" />
        <meta
          property="og:description"
          content="감정 기반으로 작성하는 일기 어플리케이션 하루몽"
        />
        <meta property="og:image" content="" />
        <meta property="og:site:author" content="하루몽 일동" />
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
          setSelectedMonth={handleMonthChange}
          className="py-5"
        />
        {renderContent()}
      </section>
    </>
  );
};

Home.propTypes = {
  viewMode: PropTypes.oneOf(['calendar', 'list']),
};

export default React.memo(Home);
