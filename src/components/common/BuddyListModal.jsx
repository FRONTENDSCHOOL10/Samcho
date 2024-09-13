import PropTypes from 'prop-types';
import { Modal, CheckBox } from '..';

const BuddyListModal = ({
  isOpen,
  closeModal,
  buddyData,
  checkedIndex,
  handleChange,
  handleExchange,
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-500">단짝 리스트</h2>
        {buddyData.length <= 0 && (
          <p className="w-full py-2 font-medium text-center text-gray-300">
            단짝이 존재하지 않습니다.
          </p>
        )}
        {buddyData.map((buddy, idx) => (
          <CheckBox
            key={buddy.buddyId}
            label={buddy.buddyName}
            checked={checkedIndex === idx}
            onChange={() => handleChange(buddy.buddyId, idx)}
          />
        ))}
        <button
          type="button"
          className="py-2 font-medium text-white rounded-md bg-blue"
          onClick={handleExchange}
          disabled={buddyData.length === 0}
          aria-disabled={buddyData.length === 0}
        >
          교환신청
        </button>
      </div>
    </Modal>
  );
};

BuddyListModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  buddyData: PropTypes.arrayOf(
    PropTypes.shape({
      buddyId: PropTypes.string.isRequired,
      buddyName: PropTypes.string.isRequired,
    })
  ).isRequired,
  checkedIndex: PropTypes.number,
  handleChange: PropTypes.func.isRequired,
  handleExchange: PropTypes.func.isRequired,
};

export default BuddyListModal;
