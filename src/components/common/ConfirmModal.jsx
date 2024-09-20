import PropTypes from 'prop-types';
import { Modal } from '..';

const ConfirmModal = ({
  isOpen,
  closeModal,
  title,
  onConfirm,
  children,
  disabled = false,
}) => {
  return (
    <Modal isOpen={isOpen} closeModal={closeModal} showCloseButton={false}>
      <div className="flex flex-col items-center justify-center gap-5">
        <h2 className="text-lg font-semibold text-gray-500">{title}</h2>
        <p className="font-medium text-gray-500">{children}</p>
        <div className="flex flex-row w-full gap-5">
          <button
            type="button"
            className="flex-1 py-2 text-white bg-red-500 rounded-md bg-red"
            onClick={closeModal}
            disabled={disabled}
          >
            아니오
          </button>
          <button
            type="button"
            className="flex-1 py-2 text-white bg-blue-500 rounded-md"
            onClick={onConfirm}
            disabled={disabled}
          >
            예
          </button>
        </div>
      </div>
    </Modal>
  );
};

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
};

export default ConfirmModal;
