import {
  Calendar,
  DiaryCard,
  LoadingSpinner,
  TopNavigation,
  YearMonth,
} from '@/components';
import { useFetchAllBuddyData, useFetchMonthlyDiaryData } from '@/hooks';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = ({ viewMode: initialViewMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [diaryData, setDiaryData] = useState([]);
  const [viewMode, setViewMode] = useState(initialViewMode || 'calendar');
  const [selectedMood, setSelectedMood] = useState('전체');
  const [selectedMonth, setSelectedMonth] = useState(() =>
    format(new Date(), 'yyyy-MM')
  );

  const { diaryData: data, loading } = useFetchMonthlyDiaryData(selectedMonth);
  const { buddyData } = useFetchAllBuddyData();

  useEffect(() => {
    if (location.pathname.includes('list')) {
      setViewMode('list');
    } else {
      setViewMode('calendar');
    }
  }, [location.pathname]);

  useEffect(() => {
    setDiaryData(data);
  }, [data]);

  const filteredMoodData = useMemo(() => {
    if (selectedMood === '전체') return diaryData;
    return diaryData.filter((diary) => diary.mood === selectedMood);
  }, [diaryData, selectedMood]);

  useEffect(() => {
    if (selectedMood !== '전체' && filteredMoodData.length === 0) {
      toast.error(`${selectedMood} 기분의 일기가 없어요😥`, {
        duration: 3000,
      });
    }
  }, [selectedMood, filteredMoodData]);

  const handleToggleView = () => {
    const newViewMode = viewMode === 'calendar' ? 'list' : 'calendar';
    setViewMode(newViewMode);
    navigate(`/home/${newViewMode}`);
  };

  const handleDiaryDelete = (id) => {
    setDiaryData((prevData) => prevData.filter((diary) => diary.id !== id));
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
          setSelectedMonth={setSelectedMonth}
          className="py-5"
        />
        {loading ? (
          <LoadingSpinner text="일기를 불러오고 있어요" />
        ) : viewMode === 'calendar' ? (
          <Calendar
            diaryData={diaryData}
            selectedMonth={selectedMonth}
            selectedMood={selectedMood}
            loading={loading}
          />
        ) : (
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
              <p className="mt-5 font-semibold text-center text-gray-300">
                해당 월에는 일기 기록이 없어요 😭
              </p>
            )}
          </main>
        )}
      </section>
    </>
  );
};

Home.propTypes = {
  viewMode: PropTypes.node,
};

export default Home;
