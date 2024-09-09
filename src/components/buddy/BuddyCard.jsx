import { PropTypes } from 'prop-types';
import { differenceInDays, format } from 'date-fns';
import { memo } from 'react';
import pb from '@/api/pb';

const BuddyCard = ({ buddyName, startDate, buddyId, onDelete }) => {
  const daysDifference = differenceInDays(
    format(new Date(), 'yyyy-MM-dd'),
    startDate
  );

  const handleDelete = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem('auth')).user.id;

      const records = await pb.collection('buddy').getFullList({
        filter: `(user = "${userId}" && buddy = "${buddyId}") || (user = "${buddyId}" && buddy = "${userId}")`,
      });

      const deletePromises = records.map((record) =>
        pb.collection('buddy').delete(record.id)
      );

      await Promise.all(deletePromises);

      onDelete(buddyId);
    } catch (error) {
      console.error('단짝 삭제 중 오류 발생:', error);
    }
  };

  return (
    <div className="flex justify-between bg-white py-[13px] px-[18px] rounded-[14px] shadow-light items-center">
      <p className="text-lg font-medium">{buddyName}</p>
      <div className="flex flex-row gap-[15px] items-center">
        <p className="font-medium text-gray-300">{`${daysDifference}일 째 단짝 중`}</p>
        <button
          type="button"
          aria-label={`${buddyName}님과 절교 `}
          className="text-white bg-red w-12 px-[10px] py-[5px] rounded-[5px]"
          onClick={handleDelete}
        >
          절교
        </button>
      </div>
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
