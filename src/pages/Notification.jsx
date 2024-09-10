import { useState, useEffect } from 'react';
import { TopHeader, NotificationCard } from '@/components';
import pb from '@/api/pb';
import toast from 'react-hot-toast';

const Notification = () => {
  const [notificationData, setNotificationData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const userId = JSON.parse(localStorage.getItem('auth')).user.id;

  useEffect(() => {
    const getData = async () => {
      try {
        const records = await pb.collection('notification').getFullList({
          sort: '-created',
          filter: `user = "${userId}"`,
          expand: 'counter_part',
        });

        setNotificationData(records);
        console.log(records);
      } catch (error) {
        if (error.status === 0) return;
        setErrorMessage(error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      getData();
    } else {
      setErrorMessage('사용자 정보를 불러올 수 없습니다.');
      setLoading(false);
    }
  }, [userId]);

  const handleBuddyAccept = async (notification) => {
    try {
      // notification 컬렉션에서 데이터 삭제
      await pb.collection('notification').delete(notification.id);

      // buddy 컬렉션에 데이터 추가 (쌍방 데이터)
      await pb.collection('buddy').create({
        user: userId,
        buddy: notification.expand.counter_part.id,
        status: 'accepted',
      });

      await pb.collection('buddy').create({
        user: notification.expand.counter_part.id,
        buddy: userId,
        status: 'accepted',
      });

      // UI에서 해당 알림 카드 제거
      setNotificationData((prevData) =>
        prevData.filter((item) => item.id !== notification.id)
      );
      toast.success('단짝 요청을 수락했습니다!');
    } catch (error) {
      console.error('수락 처리 중 오류 발생: ', error);
    }
  };

  const handleBuddyReject = async (notification) => {
    try {
      // notification 컬렉션에서 데이터 삭제
      await pb.collection('notification').delete(notification.id);

      // UI에서 해당 알림 카드 제거
      setNotificationData((prevData) =>
        prevData.filter((item) => item.id !== notification.id)
      );

      toast.success('단짝 요청을 거절했습니다.');
    } catch (error) {
      console.error('거절 처리 중 오류 발생: ', error);
    }
  };

  if (loading) {
    return <p>로딩 중...</p>; // 데이터를 불러오는 동안 표시되는 메시지
  }

  return (
    <section className="flex flex-col gap-5 min-h-dvh pb-[80px]">
      <TopHeader title="알림" isShowIcon />
      <main className="flex flex-col gap-5">
        {notificationData.map((notification) => (
          <NotificationCard
            key={notification?.id}
            buddyName={notification?.expand.counter_part.name}
            notificationTime={notification?.created.slice(0, 19)}
            type={
              notification.type === '교환일기'
                ? 'exchangeRequest'
                : 'buddyRequest'
            }
            onAccept={() => handleBuddyAccept(notification)} // 수락 클릭 핸들러
            onReject={() => handleBuddyReject(notification)} // 거절 클릭 핸들러
          />
        ))}
      </main>
    </section>
  );
};

export default Notification;
