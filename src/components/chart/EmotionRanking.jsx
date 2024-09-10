import emotions from '@/assets/icons/emotions/emotions';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmotionRankCard } from '..';
import pb from '@/api/pb';

const EmotionRanking = ({ selectedMonth }) => {
  const [rankingsData, setRankingsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRankingsData = async () => {
      try {
        const diaryData = await pb.collection('diary').getFullList({
          filter: `date >= '${selectedMonth}-01' && date <= '${selectedMonth}-31'`,
        });

        const rank = diaryData.reduce((acc, item) => {
          const emotionsArray = item.emotion || [];
          emotionsArray.forEach((emotion) => {
            acc[emotion] = (acc[emotion] || 0) + 1;
          });
          return acc;
        }, {});

        const renderData = Object.entries(rank)
          .map(([emotion, count]) => ({
            emotion,
            count,
            image: emotions[emotion],
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 3)
          .map((item, index) => ({
            ...item,
            rank: index + 1,
          }));

        setRankingsData(renderData);
      } catch (error) {
        console.error('Error fetching rankings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRankingsData();
  }, [selectedMonth]);

  return (
    <article className="flex flex-col w-full gap-6 p-4 bg-white rounded-[0.625rem] shadow-light">
      <header className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-600">감정랭킹</h2>
        <Link
          to={{
            pathname: '/chart/more',
          }}
          state={{ selectedMonth }} // selectedMonth를 Link로 넘겨줌
          aria-label="감정 랭킹 더보기"
          className="text-sm font-semibold text-gray-300"
        >
          더보기
        </Link>
      </header>

      <div className="flex justify-around gap-5">
        {loading ? (
          <p>로딩 중...</p>
        ) : (
          rankingsData.map((rankItem) => (
            <EmotionRankCard
              key={rankItem.emotion}
              text={rankItem.emotion}
              count={rankItem.count}
              rank={rankItem.rank}
              image={rankItem.image}
            />
          ))
        )}
      </div>

      <footer className="text-sm font-medium text-center text-gray-600">
        {rankingsData.length ? (
          <>
            이번 달에는{' '}
            <span className="text-base font-bold text-blue-500">
              {rankingsData[0].emotion}
            </span>
            을(를) 가장 많이 기록했어요.
          </>
        ) : (
          <span>감정 기록이 없습니다.</span>
        )}
      </footer>
    </article>
  );
};

export default EmotionRanking;
