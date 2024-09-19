import pb from '@/api/pb';
import { useNotificationStore } from '@/stores';

import { authUtils } from '@/utils/authUtils';
import { useEffect } from 'react';

const useNotification = () => {
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications
  );

  useEffect(() => {
    let isMounted = true;

    const { user } = authUtils.getAuth();

    if (!user) {
      console.error('사용자 인증 정보가 없습니다.');
      return;
    }

    const userId = user.id;

    const fetchNotifications = async () => {
      if (userId) {
        try {
          const notifications = await pb
            .collection('notification')
            .getFullList({
              filter: `recipient = "${userId}"`,
              expand: 'requester',
            });
          if (isMounted) {
            setNotifications(
              notifications.map((list) => ({
                ...list,
                read: false,
              }))
            );
          }
        } catch (error) {
          if (error.status === 0) return;
          console.error('Data fetch error', error);
        }
      }
    };

    const subscribeToRealtimeEvents = async () => {
      try {
        pb.collection('buddy').subscribe(
          '*',
          (e) => {
            handleRealtimeNotification(e);
          },
          { expand: 'requester' }
        );

        pb.collection('post').subscribe(
          '*',
          (e) => {
            handleRealtimeNotification(e);
          },
          { expand: 'requester' }
        );
      } catch (error) {
        console.error('실시간 알림 구독 중 오류 발생:', error);
      }
    };

    const handleRealtimeNotification = (e) => {
      if (e.action === 'create') {
        addNotification({
          id: e.record.id,
          type: e.record.type,
          timestamp: new Date(),
          read: false,
        });
      }
    };

    fetchNotifications();
    subscribeToRealtimeEvents();

    return () => {
      isMounted = false;
      pb.collection('buddy').unsubscribe('*');
      pb.collection('post').unsubscribe('*');
    };
  }, [addNotification, setNotifications]);
};

export default useNotification;
