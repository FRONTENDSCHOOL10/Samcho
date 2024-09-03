import { useState } from 'react';
import { Calendar, DiaryCard, TopNavigation, YearMonth } from '@/components';
import { Helmet } from 'react-helmet-async';
import pb from '@/api/pb';
import { useEffect } from 'react';

const Home = () => {
  const [viewMode, setViewMode] = useState('calendar');

  const handleToggleView = () => {
    setViewMode((prevMode) => (prevMode === 'calendar' ? 'list' : 'calendar'));
  };

  useEffect(() => {
    const getData = async () => {
      const records = await pb.collection('diary').getFullList({
        sort: '-created',
      });

      console.log(records);
    };

    getData();
  }, []);

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
      <section id="page">
        <TopNavigation onToggleView={handleToggleView} />
        <YearMonth className="py-5" />
        {viewMode === 'calendar' ? (
          <Calendar />
        ) : (
          <div className="flex flex-col gap-5">
            <DiaryCard date="2024-09-03" />
            <DiaryCard date="2024-09-03" />
            <DiaryCard date="2024-09-03" />
            <DiaryCard date="2024-09-03" />
            <DiaryCard date="2024-09-03" />
            <DiaryCard date="2024-09-03" />
            <DiaryCard date="2024-09-03" />
            <DiaryCard date="2024-09-03" />
            <DiaryCard date="2024-09-03" />
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
