import { pb } from '@/api';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Modal } from '..';

const FindPwModal = ({
  isOpen,
  closeModal,
  findUsername,
  setFindUsername,
  email,
  setEmail,
  isSubmitting,
  setIsSubmitting,
}) => {
  const handleFindPassword = async () => {
    setIsSubmitting(true);

    try {
      // 아이디와 이메일이 일치하는지 확인
      const users = await pb.collection('users').getFullList({
        filter: `username="${findUsername}" && email="${email}"`,
      });

      if (users.length === 0) {
        toast.error('아이디와 이메일이 일치하지 않습니다.', {
          duration: 2000,
          id: 'idEmailError',
        });
        setIsSubmitting(false);
        return;
      }

      // 아이디와 이메일이 일치할 경우 비밀번호 재설정 요청
      await pb.collection('users').requestPasswordReset(email);

      toast.success('비밀번호 재설정 메일이 발송되었습니다.', {
        duration: 2000,
      });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
    setIsSubmitting(false);
  };

  return (
    <Modal
      isOpen={isOpen('findPasswordModal')}
      closeModal={() => closeModal('findPasswordModal')}
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">비밀번호 찾기</h3>
        <section className="flex flex-col gap-2">
          <label htmlFor="find-password-username" className="sr-only">
            아이디 입력
          </label>
          <input
            type="text"
            id="find-password-username"
            value={findUsername}
            onChange={(e) => setFindUsername(e.target.value)}
            placeholder="아이디 입력"
            className="w-full p-2 border border-gray-300 rounded-md"
            aria-label="아이디 입력"
          />
          <div className="flex flex-row gap-1">
            <label htmlFor="find-password-email" className="sr-only">
              이메일 입력
            </label>
            <input
              type="email"
              id="find-password-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 입력"
              className="w-3/4 p-2 border border-gray-300 rounded-md"
              aria-label="이메일 입력"
            />
            <button
              className={`w-1/4 p-2 text-white rounded-md text-wrap ${
                isSubmitting || !findUsername || !email
                  ? 'bg-gray-300'
                  : 'bg-blue-500'
              }`}
              onClick={handleFindPassword}
              disabled={isSubmitting || !findUsername || !email}
            >
              {isSubmitting ? '인증요청 중' : '인증요청'}
            </button>
          </div>
        </section>
      </div>
    </Modal>
  );
};

FindPwModal.propTypes = {
  isOpen: PropTypes.func,
  closeModal: PropTypes.func,
  email: PropTypes.string,
  setEmail: PropTypes.func,
  findUsername: PropTypes.string,
  setFindUsername: PropTypes.func,
  isSubmitting: PropTypes.bool,
  setIsSubmitting: PropTypes.func,
};

export default FindPwModal;
