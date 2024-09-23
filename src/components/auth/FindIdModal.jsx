import { pb } from '@/api';
import PropTypes from 'prop-types';
import { memo } from 'react';
import toast from 'react-hot-toast';
import { Modal } from '..';

const FindIdModal = ({
  isOpen,
  closeModal,
  setFoundUserId,
  setEmail,
  email,
  isSubmitting,
  foundUserId,
  setIsSubmitting,
}) => {
  const handleFindId = async () => {
    setIsSubmitting(true);
    toast.remove();
    try {
      const users = await pb.collection('users').getFullList({
        filter: `email="${email}"`, // 이메일 필터링
      });

      // 이메일과 일치하는 사용자가 없을 경우
      if (users.length === 0) {
        toast.error('해당 이메일로 가입된 아이디가 없습니다.', {
          id: 'emailError',
        });
        setIsSubmitting(false);
      }

      // 이메일과 일치하는 사용자가 있을 경우, username을 찾음
      const foundUser = users[0];
      setFoundUserId(foundUser.username);
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
    setIsSubmitting(false);
  };

  return (
    <Modal
      isOpen={isOpen('findIdModal')}
      closeModal={() => {
        closeModal('findIdModal');
        setFoundUserId('');
        setEmail('');
      }}
    >
      <section className="flex flex-col gap-3 min-h-[118px]">
        <h3 className="text-lg font-semibold">아이디 찾기</h3>
        <div className="flex flex-row gap-1">
          <label htmlFor="find-id-email" className="sr-only">
            이메일 입력
          </label>
          <input
            type="email"
            id="find-id-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력하세요"
            className="w-3/4 p-2 border border-gray-300 rounded-md"
            aria-label="이메일 입력"
          />
          <button
            onClick={handleFindId}
            className={`w-1/4 p-2 text-white text-wrap ${
              isSubmitting || !email ? 'bg-gray-300' : 'bg-blue-500'
            } rounded-md`}
            disabled={!email || isSubmitting}
          >
            {isSubmitting ? '검색중' : '검색'}
          </button>
        </div>
        {foundUserId && (
          <div className="text-base text-center text-gray-400">
            해당 이메일로 가입된 아이디는{' '}
            <span className="font-semibold text-blue-500">{foundUserId}</span>{' '}
            입니다.
          </div>
        )}
      </section>
    </Modal>
  );
};

FindIdModal.propTypes = {
  isOpen: PropTypes.func,
  closeModal: PropTypes.func,
  setFoundUserId: PropTypes.func,
  setEmail: PropTypes.func,
  email: PropTypes.string,
  isSubmitting: PropTypes.bool,
  foundUserId: PropTypes.string,
  setIsSubmitting: PropTypes.func,
};

export default memo(FindIdModal);
