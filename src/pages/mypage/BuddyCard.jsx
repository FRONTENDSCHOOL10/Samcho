import { PropTypes } from 'prop-types';
import { differenceInDays, format } from 'date-fns';

const BuddyCard = ({ buddyName, startDate }) => {
  const daysDifference = differenceInDays(
    format(new Date(), 'yyyy-MM-dd'),
    startDate
  );

  return (
    <div className="flex justify-between bg-white py-[13px] px-[18px] rounded-[14px] shadow-light items-center">
      <p className="text-lg font-medium">{buddyName}</p>
      <div className="flex flex-row gap-[15px] items-center">
        <p className="font-medium text-gray-300">{`${daysDifference}일 째 단짝 중`}</p>
        <button
          type="button"
          aria-label={`${buddyName}님과 절교 `}
          className="text-white bg-red w-12 px-[10px] py-[5px] rounded-[5px]"
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
};

export default BuddyCard;
