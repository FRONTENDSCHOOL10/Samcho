import { pb } from '@/api';
import { DiaryCard, TopHeader } from '@/components';
import { useState, useEffect } from 'react';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('auth')).user.id;

    const getPost = async () => {
      try {
        const records = await pb.collection('post').getFullList({
          filter: `user = "${userId}"`,
          expand: 'user, exchange_diary, exchange_diary.user',
        });
        setPosts(records);
      } catch (error) {
        if (error.status === 0) return;
        console.error('Data fetch error', error);
      } finally {
        setLoading(false);
      }
    };

    getPost();
  }, []);

  if (loading) {
    return (
      <>
        <div>로딩중..</div>
      </>
    );
  }

  return (
    <section className="flex flex-col gap-5 pb-[80px]">
      <TopHeader title="교환일기 우편함" />
      <main className="flex flex-col gap-5">
        {posts.map((post) => (
          <DiaryCard
            key={post.id}
            diary={post.expand.exchange_diary}
            type="date"
          />
        ))}
      </main>
    </section>
  );
};

export default Post;
