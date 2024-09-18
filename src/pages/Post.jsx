import { pb } from '@/api';
import { DiaryCard, LoadingSpinner, TopHeader } from '@/components';
import { useState, useEffect } from 'react';
import { useFetchAllBuddyData } from '@/hooks';

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

        const diary = records.map((record) => {
          if (record.recipient === userId) {
            return record.expand.requester_diary;
          } else if (record.requester === userId) {
            return record.expand.recipient_diary;
          }
        });

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
          />
        ))}
      </main>
    </section>
  );
};

export default Post;
