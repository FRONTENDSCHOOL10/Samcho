import { memo } from 'react';
import PropTypes from 'prop-types';
import { IoClose } from 'react-icons/io5';

const Modal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-[1000] backdrop-blur-[1px]">
      <div className="relative w-full max-w-[400px] p-6 bg-white rounded-lg shadow-lg">
        <button
          onClick={closeModal}
          type="button"
          className="absolute top-6 right-5"
        >
          <IoClose aria-hidden={true} className="w-6 h-6" />
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default memo(Modal);
