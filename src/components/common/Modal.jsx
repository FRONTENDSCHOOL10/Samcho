import PropTypes from 'prop-types';
import { memo, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';

const Modal = ({ isOpen, closeModal, children, showCloseButton = true }) => {
  // ESC 버튼을 누를 경우 모달 창 닫기
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-[1000] backdrop-blur-[1px]">
      <div className="relative max-w-[400px] w-[calc(100vw-40px)] p-4 bg-white rounded-lg shadow-lg">
        {showCloseButton && (
          <button
            onClick={closeModal}
            type="button"
            className="absolute top-[18px] right-5"
          >
            <IoClose aria-hidden={true} className="w-6 h-6" color="#393939" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node,
  showCloseButton: PropTypes.bool,
};

export default memo(Modal);
