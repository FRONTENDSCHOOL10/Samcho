import { PropTypes } from 'prop-types';
import { differenceInDays, differenceInHours } from 'date-fns';
import { memo } from 'react';
import pb from '@/api/pb';
import toast from 'react-hot-toast';
import { ConfirmModal } from '..';
import { useModal } from '@/hooks';

const BuddyCard = ({ buddyName, startDate, buddyId, onDelete }) => {
  const hoursDifference = differenceInHours(new Date(), new Date(startDate));
  const daysDifference = differenceInDays(new Date(), new Date(startDate));

  const { isOpen, openModal, closeModal } = useModal();

  const handleDelete = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('auth')).user.id;

      const records = await pb.collection('buddy').getFullList({
        filter: `recipient = "${buddyId}" && requester = "${userId}" || recipient = "${userId}" && requester = "${buddyId}"`,
      });

      await pb.collection('buddy').delete(records[0].id);
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
