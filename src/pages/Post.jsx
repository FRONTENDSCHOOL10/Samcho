import { pb } from '@/api';
import { DiaryCard, LoadingSpinner, TopHeader } from '@/components';
import { useState, useEffect } from 'react';
import { useFetchAllBuddyData } from '@/hooks';
import {
  isAfter,
  addHours,
  differenceInHours,
  differenceInMinutes,
} from 'date-fns';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { buddyData } = useFetchAllBuddyData();

  useEffect(() => {
    const getPost = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('auth')).user.id;

        const records = await pb.collection('post').getFullList({
          filter: `(recipient = "${userId}" || requester = "${userId}") && status = "accepted"`,
          expand:
            'recipient, recipient_diary.user, requester, requester_diary.user',
        });

        const now = new Date();

        // 필터링과 삭제를 동시에 처리하는 최적화된 방법
        const diary = [];

        await Promise.all(
          records.map(async (record) => {
            const updatedTime = new Date(record.updated);

            // 24시간이 지난 데이터는 삭제
            if (isAfter(now, addHours(updatedTime, 24))) {
              await pb.collection('post').delete(record.id);
            } else {
              // 24시간 내의 데이터는 diary 배열에 추가
              const minutesDifference = differenceInMinutes(now, updatedTime);
              const timeAgo =
                minutesDifference < 60
                  ? '방금 전'
                  : `${differenceInHours(now, updatedTime)}시간`;

              if (record.recipient === userId) {
                diary.push({
                  ...record.expand.requester_diary,
                  timeAgo,
                });
              } else if (record.requester === userId) {
                diary.push({
                  ...record.expand.recipient_diary,
                  timeAgo,
                });
              }
            }
          })
        );

        setPosts(diary);
      } catch (error) {
        if (error.status === 0) return;
        setError(true);
        console.error('Data fetch error', error);
      }

      setLoading(false);
    };

    getPost();
  }, []);

  return (
    <section className="flex flex-col gap-5 pb-[80px]">
      <TopHeader title="교환일기 우편함" />
      <main className="flex flex-col gap-5">
        {loading && (
          <LoadingSpinner text="하루몽이 교환일기를 불러오고 있어요" />
        )}
        {error && (
          <div className="fixed flex flex-col items-center w-full gap-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <p className="font-medium text-center text-red">
              교환일기를 불러오지 못했습니다.
            </p>
          </div>
        )}
        {posts.length === 0 && !loading && (
          <div className="fixed flex flex-col items-center w-full gap-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <p className="font-medium text-center text-gray-400">
              단짝과 교환한 일기가 존재하지 않아요!
            </p>
          </div>
        )}
        {posts.map((post) => (
          <DiaryCard
            key={post.id}
            diary={post}
            buddyData={buddyData}
            type="date"
            exchange={true}
            timeAgo={post.timeAgo} // 계산된 시간 차이를 DiaryCard로 넘김
          />
        ))}
      </main>
    </section>
  );
};

export default Post;
