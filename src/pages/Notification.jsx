import { useState, useEffect } from 'react';
import { TopHeader, NotificationCard, Modal, CheckBox } from '@/components';
import pb from '@/api/pb';
import toast from 'react-hot-toast';
import { useFetchAllDiaryData, useModal } from '@/hooks';
import { formatDate } from 'date-fns';

const Notification = () => {
  const userId = JSON.parse(localStorage.getItem('auth')).user.id;

  const [notificationData, setNotificationData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [checkedIndex, setCheckedIndex] = useState(null);
  const [diary, setDiary] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(null);

  const { isOpen, openModal, closeModal } = useModal();
  const { diaryData } = useFetchAllDiaryData();

  useEffect(() => {
    const getData = async () => {
      try {
        const records = await pb.collection('notification').getFullList({
          sort: '-created',
          filter: `recipient = "${userId}"`,
          expand: 'requester',
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

  const handleChange = (diary, index) => {
    setCheckedIndex(index);
    setDiary(diary);
  };

  const handleDiaryExchange = async () => {
    const data = {
      recipient_diary: diary,
      status: 'accepted',
    };
    try {
      await pb.collection('post').update(selectedNotification.type_id, data);
      await pb.collection('notification').delete(selectedNotification.id);

      setNotificationData((prevData) =>
        prevData.filter((item) => item.id !== selectedNotification.id)
      );
      toast.success('교환일기 신청이 수락 되었습니다.');
      closeModal('diaryListModal');
    } catch (error) {
      console.error('[error] 교환일기 수락 실패: ', error);
      toast.error('교환일기 수락에 실패했습니다.');
    }
  };

  const handleBuddyAccept = async (notification) => {
    if (notification.type === '교환일기') {
      setSelectedNotification(notification);
      openModal('diaryListModal');
    } else {
      try {
        const data = {
          status: 'accepted',
        };

        await pb.collection('buddy').update(notification.type_id, data);
        await pb.collection('notification').delete(notification.id);

        setNotificationData((prevData) =>
          prevData.filter((item) => item.id !== notification.id)
        );
        toast.success('단짝 요청을 수락했습니다!');
      } catch (error) {
        console.error('수락 처리 중 오류 발생: ', error);
      }
    }
  };

  const handleBuddyReject = async (notification) => {
    if (notification.type === '교환일기') {
      try {
        await pb.collection('post').delete(notification.type_id);
        await pb.collection('notification').delete(notification.id);
        setNotificationData((prevData) =>
          prevData.filter((item) => item.id !== notification.id)
        );
        toast.success('일기 교환 요청을 거절했습니다.');
      } catch (error) {
        console.error('거절 처리 중 오류 발생: ', error);
      }
    } else {
      try {
        await pb.collection('buddy').delete(notification.type_id);
        await pb.collection('notification').delete(notification.id);
        setNotificationData((prevData) =>
          prevData.filter((item) => item.id !== notification.id)
        );
        toast.success('단짝 요청을 거절했습니다.');
      } catch (error) {
        console.error('거절 처리 중 오류 발생: ', error);
      }
    }
  };

  // 에러가 발생하면 에러 메시지 표시
  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  // 데이터가 로드되고 알림이 있을 때 알림 목록을 렌더링
  return (
    <>
      <section className="flex flex-col gap-5 min-h-dvh pb-[80px]">
        <TopHeader title="알림" isShowIcon />
        {!loading ? (
          <main className="flex flex-col gap-5">
            {notificationData && notificationData.length > 0 ? (
              notificationData.map((notification) => (
                <NotificationCard
                  key={notification?.id}
                  buddyName={notification?.expand.requester.name}
                  notificationTime={formatDate(
                    notification?.created,
                    'yyyy-MM-dd HH:mm:ss'
                  )}
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
              <p className="font-medium text-center text-gray-300">
                알림이 오지 않았어요!
              </p>
            )}
          </main>
        ) : (
          <p className="font-medium text-center text-gray-300">
            알림 데이터 불러오는 중...
          </p>
        )}
      </section>
      <Modal
        isOpen={isOpen('diaryListModal')}
        closeModal={() => closeModal('diaryListModal')}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-500">일기 리스트</h2>
          {diaryData.map((diary, idx) => (
            <CheckBox
              key={diary.id}
              label={diary.date}
              checked={checkedIndex === idx}
              onChange={() => handleChange(diary.id, idx)}
            />
          ))}
          <button
            type="button"
            className="py-2 font-medium text-white rounded-md bg-blue"
            onClick={handleDiaryExchange}
          >
            교환
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Notification;
