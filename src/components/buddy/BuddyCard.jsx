import pb from '@/api/pb';
import { useModal } from '@/hooks';
import { differenceInDays, differenceInHours } from 'date-fns';
import { PropTypes } from 'prop-types';
import { memo } from 'react';
import toast from 'react-hot-toast';
import { ConfirmModal } from '..';
import { authUtils } from '@/utils';
import { useNotificationStore } from '@/stores';

const BuddyCard = ({ buddyName, startDate, buddyId, onDelete }) => {
  const hoursDifference = differenceInHours(new Date(), new Date(startDate));
  const daysDifference = differenceInDays(new Date(), new Date(startDate));
  const setNotifications = useNotificationStore(
    (state) => state.setNotifications
  );

  const { isOpen, openModal, closeModal } = useModal();

  const handleDelete = async () => {
    try {
      const { user } = authUtils.getAuth();
      const userId = user.id;

      if (!user) {
        toast.error(
          '사용자 인증정보를 불러오지 못했어요. 다시 시도해주세요 😥'
        );
        return;
      }

      const record = await pb
        .collection('buddy')
        .getFirstListItem(
          `recipient = "${buddyId}" && requester = "${userId}" || recipient = "${userId}" && requester = "${buddyId}"`
        );

      if (!record) {
        toast.error('단짝 정보를 찾을 수 없어요. 다시 시도해주세요 😥');
        return;
      }

      await pb.collection('buddy').delete(record.id);

      // 교환일기 알림 삭제
      const notification = await pb
        .collection('notification')
        .getFirstListItem(
          `(recipient = "${userId}" && requester = "${buddyId}" && type = "교환일기") || (recipient = "${buddyId}" && requester = "${userId}" && type = "교환일기")`
        );

      if (notification) {
        await pb.collection('notification').delete(notification.id);
      }

      // 교환일기 삭제
      const posts = await pb.collection('post').getFullList({
        filter: `(recipient = "${buddyId}" && requester = "${userId}") || (recipient = "${userId}" && requester = "${buddyId}")`,
      });

      if (posts.length > 0) {
        for (const post of posts) {
          await pb.collection('post').delete(post.id);
        }
      }

      // 알림 상태 업데이트
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

      toast.success('단짝을 멀리 보냈습니다.');
      closeModal('breachModal');
      onDelete(buddyId);
    } catch (error) {
      console.error('단짝 삭제 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex justify-between bg-white p-[0.9375rem] rounded-[10px] shadow-light items-center">
      <p className="text-lg font-medium">{buddyName}</p>
      <div className="flex flex-row gap-[15px] items-center">
        <p className="font-medium text-gray-300">
          {hoursDifference < 24
            ? `${hoursDifference}시간 단짝 중`
            : `${daysDifference}일 단짝 중`}
        </p>
        <button
          type="button"
          aria-label={`${buddyName}님과 절교 `}
          className="text-white bg-red px-[10px] py-[5px] rounded-[5px]"
          onClick={() => openModal('breachModal')}
        >
          절교
        </button>
      </div>
      <ConfirmModal
        isOpen={isOpen('breachModal')}
        closeModal={() => closeModal('breachModal')}
        title="단짝절교"
        onConfirm={() => handleDelete()}
      >
        <strong>{buddyName}</strong>님과 정말 절교 하시겠습니까?
      </ConfirmModal>
    </div>
  );
};

BuddyCard.propTypes = {
  buddyName: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  buddyId: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default memo(BuddyCard);
