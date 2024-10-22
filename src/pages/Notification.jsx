import { useState, useEffect } from 'react';
import {
  TopHeader,
  NotificationCard,
  Modal,
  CheckBox,
  LoadingSpinner,
} from '@/components';
import pb from '@/api/pb';
import toast from 'react-hot-toast';
import { useFetchAllDiaryData, useModal } from '@/hooks';
import { formatDate } from 'date-fns';
import { Helmet } from 'react-helmet-async';

const Notification = () => {
  const userId = JSON.parse(localStorage.getItem('auth')).user.id;

  const [notificationData, setNotificationData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [checkedIndex, setCheckedIndex] = useState(null);
  const [diary, setDiary] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      // 1. post 컬렉션에서 교환된 기록이 있는지 확인
      const existingExchanges = await pb.collection('post').getFullList({
        filter: `
          (
            (recipient = "${selectedNotification.requester}" && requester = "${userId}") || 
            (recipient = "${userId}" && requester = "${selectedNotification.requester}")
          ) && 
          (
            recipient_diary = "${diary}" || 
            requester_diary = "${diary}"
          )
        `,
      });

      // 중복된 일기가 있는 경우 교환 못함
      if (existingExchanges.length > 0) {
        toast.error('이미 해당 단짝과 이 일기를 교환 중입니다.', {
          id: 'preventExchangeDiaryDuplicationOnNotification',
          duration: 2000,
        });
        setIsSubmitting(false);
        return;
      }

      // 2. 중복되지 않은 경우 교환 수락 처리
      const data = {
        recipient_diary: diary,
        status: 'accepted',
      };

      await pb.collection('post').update(selectedNotification.type_id, data);
      await pb.collection('notification').delete(selectedNotification.id);

      setNotificationData((prevData) =>
        prevData.filter((item) => item.id !== selectedNotification.id)
      );

      toast.success('교환일기 신청이 수락 되었습니다.', {
        duration: 2000,
      });

      closeModal('diaryListModal');
    } catch (error) {
      console.error('[error] 교환일기 수락 실패: ', error);
      toast.error('교환일기 수락에 실패했습니다.', {
        duration: 2000,
      });
    }

    setIsSubmitting(false);
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
        toast.success('단짝 요청을 수락했습니다!', {
          duration: 2000,
        });
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
        toast.success('일기 교환 요청을 거절했습니다.', {
          duration: 2000,
        });
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
        toast.success('단짝 요청을 거절했습니다.', {
          duration: 2000,
        });
      } catch (error) {
        console.error('거절 처리 중 오류 발생: ', error);
      }
    }
  };

  // 에러가 발생하면 에러 메시지 표시
  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  return (
    <>
      <Helmet>
        <title>하루몽 - 알림</title>
        <meta name="description" content="하루몽 알림 페이지 입니다." />
        <meta property="author" content="하루몽" />

        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://harumong.netlify.app/home/notification"
        />
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
              <div className="fixed flex flex-col items-center w-full gap-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                <p className="h-full font-medium text-center text-gray-400">
                  도착한 알림이 없어요!
                </p>
              </div>
            )}
          </main>
        ) : (
          <LoadingSpinner text="하루몽이 도착한 알림을 불러오고 있어요" />
        )}
      </section>
      <Modal
        isOpen={isOpen('diaryListModal')}
        closeModal={() => closeModal('diaryListModal')}
      >
        <div className="flex flex-col gap-4 max-h-[50vh]">
          <h2 className="text-lg font-semibold text-gray-500">일기 리스트</h2>
          <div className="flex flex-col gap-2 overflow-y-auto">
            {diaryData.length === 0 ? (
              <div className="p-4 font-medium text-center text-gray-400">
                교환할 수 있는 일기가 없어요 😥
              </div>
            ) : (
              diaryData.map((diary, idx) => (
                <CheckBox
                  key={diary.id}
                  label={diary.date}
                  checked={checkedIndex === idx}
                  onChange={() => handleChange(diary.id, idx)}
                />
              ))
            )}
          </div>
          <button
            type="button"
            className={`py-2 font-medium text-white rounded-md ${
              !diary || isSubmitting ? 'bg-gray-300' : 'bg-blue'
            }`}
            onClick={handleDiaryExchange}
            disabled={!diary || isSubmitting}
          >
            {isSubmitting ? '교환 중...' : '교환'}
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Notification;
