import pb from '@/api/pb';
import { useNotificationStore } from '@/stores';
import { authUtils } from '@/utils';
import toast from 'react-hot-toast';

const useBuddyActions = () => {
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications
  );

  const deleteBuddy = async (buddyId, onDelete) => {
    const auth = authUtils.getAuth();
    if (!auth || !auth.user) {
      toast.error('사용자 인증정보를 불러오지 못했어요. 다시 시도해주세요 😥');
      return;
    }

    const userId = auth.user.id;

    return toast.promise(
      (async () => {
        try {
          const record = await pb
            .collection('buddy')
            .getFirstListItem(
              `recipient = "${buddyId}" && requester = "${userId}" || recipient = "${userId}" && requester = "${buddyId}"`
            );

          if (!record) {
            throw new Error('단짝 정보를 찾을 수 없어요. 다시 시도해주세요 😥');
          }

          await pb.collection('buddy').delete(record.id);

          // 교환일기 알림 삭제
          try {
            const notification = await pb
              .collection('notification')
              .getFirstListItem(
                `(recipient = "${userId}" && requester = "${buddyId}" && type = "교환일기") || (recipient = "${buddyId}" && requester = "${userId}" && type = "교환일기")`
              );

            if (notification) {
              await pb.collection('notification').delete(notification.id);
            }
          } catch (error) {
            if (error.status !== 404) {
              console.error('교환일기 알림 삭제 중 오류 발생', error);
              throw error;
            }
          }

          // 교환일기 삭제
          try {
            const posts = await pb.collection('post').getFullList({
              filter: `(recipient = "${buddyId}" && requester = "${userId}") || (recipient = "${userId}" && requester = "${buddyId}")`,
            });

            if (posts.length > 0) {
              for (const post of posts) {
                await pb.collection('post').delete(post.id);
              }
            }
          } catch (error) {
            console.error('교환일기 삭제 중 오류 발생', error);
            throw new Error(
              '교환일기 삭제 중 문제가 발생했어요. 다시 시도해주세요 😥'
            );
          }

          // 알림 상태 업데이트
          try {
            const updatedNotifications = await pb
              .collection('notification')
              .getFullList({
                filter: `recipient = "${userId}"`,
              });
            setNotifications(
              updatedNotifications.map((list) => ({
                ...list,
                read: false,
              }))
            );
          } catch (error) {
            console.error('알림 상태 업데이트 중 오류 발생', error);
          }

          onDelete(buddyId);
        } catch (error) {
          console.error('단짝 삭제 중 오류 발생:', error);
          throw error;
        }
      })(),
      {
        loading: '단짝을 삭제하는 중입니다...⏳',
        success: '단짝을 멀리 보냈습니다 👋',
        error: '단짝 삭제 중 오류가 발생했어요. 다시 시도해주세요 😥',
      }
    );
  };

  return { deleteBuddy };
};

export default useBuddyActions;
