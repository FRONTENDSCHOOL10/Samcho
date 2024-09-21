import { useState } from 'react';
import pb from '@/api/pb';
import toast from 'react-hot-toast';
import { deleteFilter } from '@/utils';

export const useBuddySearchAction = (
  userData,
  relationshipStatus,
  closeModal
) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = JSON.parse(localStorage.getItem('auth')).user.id;

  const handleBuddySearchAction = async () => {
    toast.remove();

    if (isSubmitting) return;
    setIsSubmitting(true);

    // 본인에게 단짝 신청을 보낸 경우
    if (userId === userData.id) {
      toast.error('자신에게 단짝 요청을 보낼 수 없습니다.', { duration: 2000 });
      setIsSubmitting(false);
      return;
    }

    // 이미 상대방에게서 단짝 요청을 받은 경우
    if (relationshipStatus === 'pending_recipient') {
      toast.error('이미 상대방에게 단짝 요청을 받았습니다.', {
        duration: 2000,
      });
      setIsSubmitting(false);
      return;
    }

    // 이미 상대방에게 단짝 요청을 보낸 경우
    if (relationshipStatus === 'pending_requester') {
      const deletePromise = toast.promise(
        (async () => {
          // 1) buddy 데이터 삭제
          await deleteFilter(
            'buddy',
            `requester = "${userId}" && recipient = "${userData.id}" && status = "pending"`
          );

          // 2) notification 데이터 삭제
          await deleteFilter(
            'notification',
            `requester = "${userId}" && recipient = "${userData.id}" && type = "단짝"`
          );
        })(),
        {
          loading: '단짝 신청 취소 중...',
          success: '단짝 신청이 취소되었습니다!',
          error: '단짝 신청 취소에 실패했습니다.',
        },
        { duration: 2000 }
      );

      deletePromise
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          console.error('[Error] 신청 취소 실패:', error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
      return;
    }

    // 단짝 신청 처리
    try {
      const buddyPromise = pb.collection('buddy').create({
        recipient: userData.id,
        requester: userId,
        status: 'pending',
      });

      toast
        .promise(
          buddyPromise,
          {
            loading: '단짝 신청 중...',
            success: '단짝 신청을 보냈습니다!',
            error: '단짝 신청에 실패했습니다.',
          },
          { duration: 2000 }
        )
        .then(async (buddy) => {
          await pb.collection('notification').create({
            recipient: userData.id,
            requester: userId,
            type: '단짝',
            type_id: buddy.id,
          });
          closeModal();
        })
        .catch((error) => {
          console.error('[Error] 단짝 신청 실패:', error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } catch (error) {
      toast.error('단짝 신청에 실패했습니다.', { duration: 2000 });
      setIsSubmitting(false);
      console.error(error);
    }
  };

  return { handleBuddySearchAction, isSubmitting };
};

export default useBuddySearchAction;
