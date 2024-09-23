import { useState, useEffect } from 'react';
import { IconRankMoreList, ToggleButton, TopHeader } from '@/components';
import emotions from '@/assets/icons/emotions/emotions';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ChartMoreList = () => {
  const location = useLocation();
  const { diaryData } = location.state || {}; // state에서 diaryData를 받음

  const [activeButton, setActiveButton] = useState('기록 수 많은 순');
  const [rankingsData, setRankingsData] = useState([]);

  const handleToggle = (buttonText) => {
    setActiveButton(buttonText);
  };

  const getButtonClass = (buttonText) =>
    activeButton === buttonText
      ? 'bg-blue-500 text-white font-bold border-blue-500'
      : 'bg-white text-blue-500 border-gray-200 font-medium';

  useEffect(() => {
    const fetchRankingsData = () => {
      if (!diaryData) {
        console.error('No diary data available');
        return;
      }

      const rank = diaryData.reduce((acc, item) => {
        const emotionsArray = item.emotion || [];

        emotionsArray.forEach((emotion) => {
          acc[emotion] = (acc[emotion] || 0) + 1;
        });

        return acc;
      }, {});

      const rankingsArray = Object.entries(rank)
        .map(([emotion, count]) => ({
          emotion,
          count,
          image: emotions[emotion],
        }))
        .sort((a, b) =>
          activeButton === '기록 수 많은 순'
            ? b.count - a.count
            : a.count - b.count
        )
        .slice(0, 10); // 상위 10개만 선택

      setRankingsData(rankingsArray);
    };

    fetchRankingsData();
  }, [diaryData, activeButton]);

  if (diaryData.length === 0) {
    return (
      <>
        <TopHeader title="감정 랭킹" isShowIcon={true} />
        <div className="fixed flex flex-col items-center w-full gap-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
          <p className="font-medium text-center text-gray-400">
            아직 기록한 감정이 존재하지 않아요!
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>하루몽 - 감정랭킹</title>
        <meta
          name="description"
          content="하루몽 감정랭킹 더보기 페이지 입니다."
        />
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
      <section className="min-h-dvh pb-[80px]">
        <TopHeader title="감정 랭킹" isShowIcon={true} />
        <div className="flex pt-5 gap-x-2">
          <ToggleButton
            text="기록 수 많은 순"
            onClick={() => handleToggle('기록 수 많은 순')}
            className={getButtonClass('기록 수 많은 순')}
          />
          <ToggleButton
            text="기록 수 적은 순"
            onClick={() => handleToggle('기록 수 적은 순')}
            className={getButtonClass('기록 수 적은 순')}
          />
        </div>
        <div className="flex flex-col bg-white p-[0.9375rem] mt-5 rounded-[0.625rem] shadow-light">
          {rankingsData.map((rankItem, index) => (
            <IconRankMoreList
              key={rankItem.emotion}
              rank={index + 1}
              emotion={rankItem.emotion}
              count={rankItem.count}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ChartMoreList;
