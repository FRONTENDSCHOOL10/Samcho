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
import { Helmet } from 'react-helmet-async';

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
          sort: '-updated',
        });

        const now = new Date();

        const diary = [];

        await Promise.all(
          records.map(async (record) => {
            const updatedTime = new Date(record.updated);

            if (isAfter(now, addHours(updatedTime, 24))) {
              await pb.collection('post').delete(record.id);
            } else {
              const minutesDifference = differenceInMinutes(now, updatedTime);
              const timeAgo =
                minutesDifference < 1
                  ? '방금 전'
                  : minutesDifference < 60
                  ? `${minutesDifference}분`
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
    <>
      <Helmet>
        <title>하루몽 - 우편함</title>
        <meta name="description" content="하루몽 우편함 페이지 입니다." />
        <meta property="author" content="하루몽" />

        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://harumong.netlify.app/post" />
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

      <section className="flex flex-col gap-5 pb-[80px]">
        <TopHeader
          title="교환일기 우편함"
          subTitle="교환일기는 24시간 뒤에 자동으로 삭제됩니다."
        />
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
    </>
  );
};

export default Post;
