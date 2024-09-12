import { pb } from '@/api';
import { DiaryCard, TopHeader } from '@/components';
import { useState, useEffect } from 'react';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        console.log('데이터 받아올게 ㄱㄷ');
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
        console.log('진짜 다 끝남');
      } catch (error) {
        if (error.status === 0) return;
        setError(true);
        console.error('Data fetch error', error);
      } finally {
        console.log('나 finally임');
        setLoading(false);
      }
    };

    getPost();
  }, []);

  return (
    <section className="flex flex-col gap-5 pb-[80px]">
      <TopHeader title="교환일기 우편함" />
      <main className="flex flex-col gap-5">
        {loading && (
          <p className="font-medium text-center text-gray-300">
            교환일기 데이터 불러오는 중...
          </p>
        )}
        {error && (
          <p className="font-medium text-center text-red">
            교환일기 데이터를 불러오지 못했습니다...
          </p>
        )}
        {posts.length === 0 && !loading && (
          <p className="font-medium text-center text-gray-300">
            교환일기 데이터 없음.
          </p>
        )}
        {posts.map((post) => (
          <DiaryCard key={post.id} diary={post} type="date" />
        ))}
      </main>
    </section>
  );
};

export default Post;
