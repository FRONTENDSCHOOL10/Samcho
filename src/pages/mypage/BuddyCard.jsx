import { PropTypes } from 'prop-types';

const BuddyCard = ({ buddyName, startDate }) => {
  const calculateDays = (startDate) => {
    const start = new Date(startDate);
    const today = new Date();
    const timeDifference = today - start;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference + 1;
  };

  const daysTogether = calculateDays(startDate);

  return (
    <section className="flex justify-between bg-white py-[13px] px-[18px] rounded-[14px] shadow-light items-center">
      <h2 className="text-lg font-medium">{buddyName}</h2>
      <div className="flex flex-row gap-[15px] items-center">
        <span className="font-medium text-gray-300">{`${daysTogether}일 째 단짝 중`}</span>
        <button
          type="button"
          className="text-white bg-red w-12 px-[10px] py-[5px] rounded-[5px]"
        >
          절교
        </button>
      </div>
    </section>
  );
};

BuddyCard.propTypes = {
  buddyName: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
};

export default BuddyCard;
