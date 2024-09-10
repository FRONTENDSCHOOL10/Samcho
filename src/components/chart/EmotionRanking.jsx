import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EmotionRankCard } from '@/components';
import { useFetchMonthlyDiaryData } from '@/hooks';
import emotions from '@/assets/icons/emotions/emotions'; // 감정 이미지 import

const EmotionRanking = ({ selectedMonth }) => {
  const { diaryData, loading } = useFetchMonthlyDiaryData(selectedMonth); // 커스텀 훅 사용
  const [rankingsData, setRankingsData] = useState([]);

  useEffect(() => {
    if (!loading && diaryData) {
      // 감정별 기록 횟수를 저장할 객체
      const rank = diaryData.reduce((acc, item) => {
        (item.emotion || []).forEach((emotion) => {
          acc[emotion] = (acc[emotion] || 0) + 1;
        });
        return acc;
      }, {});

      // 감정 데이터를 배열로 변환하고 횟수별로 내림차순 정렬, 상위 3개 감정 선택
      const renderData = Object.entries(rank)
        .map(([emotion, count]) => ({
          emotion,
          count,
          image: emotions[emotion] || '/default-image-path.png', // 감정 이미지 경로 추가
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 3)
        .map((item, index) => ({
          ...item,
          rank: index + 1,
        }));

      setRankingsData(renderData);
    }
  }, [loading, diaryData]);

  if (loading) {
    return <p>로딩 중...</p>; // 로딩 중 표시
  }

  const description = rankingsData.length ? (
    <>
      이번 달에는{' '}
      <span className="text-base font-bold text-blue-500">
        {rankingsData[0].emotion}
      </span>
      을(를) 가장 많이 기록했어요.
    </>
  ) : (
    <span>감정 기록이 없습니다.</span>
  );

  return (
    <article className="flex flex-col w-full gap-6 p-4 bg-white rounded-[0.625rem] shadow-light">
      <header className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-600">감정랭킹</h2>
        <Link
          to="/chart/more"
          state={{ selectedMonth }} // Pass selectedMonth to the more page
          aria-label="감정 랭킹 더보기"
          className="text-sm font-semibold text-gray-300"
        >
          더보기
        </Link>
      </header>

      <div className="flex justify-around gap-5">
        {rankingsData.map((rankItem) => (
          <EmotionRankCard
            key={rankItem.rank} // 감정보다는 순위가 고유함
            text={rankItem.emotion}
            count={rankItem.count}
            rank={rankItem.rank}
            image={rankItem.image}
          />
        ))}
      </div>
      <footer className="text-sm font-medium text-center text-gray-600">
        {description}
      </footer>
    </article>
  );
};

export default EmotionRanking;
