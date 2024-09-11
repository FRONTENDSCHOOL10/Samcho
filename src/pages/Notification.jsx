import { useState, useEffect } from 'react';
import { TopHeader, NotificationCard } from '@/components';
import pb from '@/api/pb';
import toast from 'react-hot-toast';

const Notification = () => {
  const [notificationData, setNotificationData] = useState(null);
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
        setLoading(false);
      } catch (error) {
        if (error.status === 0) return;
        setErrorMessage(
          error.message || '데이터를 불러오는 중 오류가 발생했습니다.'
        );
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
      await pb.collection('notification').delete(notification.id);
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
      await pb.collection('notification').delete(notification.id);
      setNotificationData((prevData) =>
        prevData.filter((item) => item.id !== notification.id)
      );
      toast.success('단짝 요청을 거절했습니다.');
    } catch (error) {
      console.error('거절 처리 중 오류 발생: ', error);
    }
  };

  // 로딩 중일 때 로딩 메시지 표시
  if (loading) {
    return <p>로딩 중...</p>;
  }

  // 에러가 발생하면 에러 메시지 표시
  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  // 데이터가 로드되고 알림이 있을 때 알림 목록을 렌더링
  return (
    <section className="flex flex-col gap-5 min-h-dvh pb-[80px]">
      <TopHeader title="알림" isShowIcon />
      <main className="flex flex-col gap-5">
        {notificationData && notificationData.length > 0 ? (
          notificationData.map((notification) => (
            <NotificationCard
              key={notification?.id}
              buddyName={notification?.expand.counter_part.name}
              notificationTime={notification?.created.slice(0, 19)}
              type={
                notification.type === '교환일기'
                  ? 'exchangeRequest'
                  : 'buddyRequest'
              }
              onAccept={() => handleBuddyAccept(notification)}
              onReject={() => handleBuddyReject(notification)}
            />
          ))
        ) : (
          <p>알림이 없습니다..!</p>
        )}
      </main>
    </section>
  );
};

export default Notification;
