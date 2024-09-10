import { Calendar, DiaryCard, TopNavigation, YearMonth } from '@/components';
import { useFetchMonthlyDiaryData } from '@/hooks';
import { format } from 'date-fns';
import { useEffect } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Home = ({ viewMode: initialViewMode }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [viewMode, setViewMode] = useState(initialViewMode || 'calendar');
  const [selectedMood, setSelectedMood] = useState('전체');
  const [selectedMonth, setSelectedMonth] = useState(() =>
    format(new Date(), 'yyyy-MM')
  );

  useEffect(() => {
    if (location.pathname.includes('list')) {
      setViewMode('list');
    } else {
      setViewMode('calendar');
    }
  }, [location.pathname]);

  const { diaryData, loading } = useFetchMonthlyDiaryData(selectedMonth);

  const handleToggleView = () => {
    const newViewMode = viewMode === 'calendar' ? 'list' : 'calendar';
    setViewMode(newViewMode);
    navigate(`/home/${newViewMode}`);
  };

  if (loading) {
    console.log('로딩 중..');
    // 추후 로딩 처리 로직을 가져오거나..등
  }

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
        {viewMode === 'calendar' ? (
          <Calendar diaryData={diaryData} selectedMonth={selectedMonth} />
        ) : (
          <main className="flex flex-col gap-5">
            {diaryData.length > 0 ? (
              diaryData.map((diary) => (
                <DiaryCard key={diary.id} diary={diary} />
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
