import pb from '@/api/pb';
import { Button, Input, Modal } from '@/components';
import { authUtils } from '@/utils';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { useModal } from '@/hooks';

const Login = () => {
  const { isOpen, openModal, closeModal } = useModal();

  const navigate = useNavigate();
  const { state } = useLocation();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [findUsername, setFindUsername] = useState('');
  const [foundUserId, setFoundUserId] = useState(''); // 아이디 찾기 -> 검색된 아이디
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const isLogin = authUtils.getAuth();
    if (isLogin.isAuth) navigate('/');
  }, [navigate]);

  useEffect(() => {
    if (state && !state.isAuth) {
      toast.error('하루몽은 로그인 후 이용 가능합니다!', {
        id: 'isNotLogin',
        duration: 2000,
      });
    }
  }, [state]);

  const handleLogin = async (e) => {
    e.preventDefault();
    toast.remove();

    if (username === '' || password === '') {
      toast.error('아이디 혹은 비밀번호를 입력해 주세요.', {
        duration: 1500,
        className: 'custom-toast',
      });
      return;
    }

    setIsSubmitting(true);
    toast
      .promise(
        authenticateUser(username, password),
        {
          loading: '로그인 시도 중...',
          success: '하루몽에 오신걸 환영합니다!',
          error: '로그인에 실패했습니다...',
        },
        {
          duration: 2000,
        }
      )
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        if (error.message !== '이메일 인증이 필요합니다') {
          console.error('[Error] 로그인 실패: ', error);
        }
        setIsSubmitting(false);
      });
  };

  // 아이디 찾기 처리 함수
  const handleFindId = async () => {
    setIsSubmitting(true);
    toast.remove();
    try {
      const users = await pb.collection('users').getFullList({
        filter: `email="${email}"`, // 이메일 필터링
      });

      // 이메일과 일치하는 사용자가 없을 경우
      if (users.length === 0) {
        throw new Error('해당 이메일로 가입된 아이디가 없습니다.');
      }

      // 이메일과 일치하는 사용자가 있을 경우, username을 찾음
      const foundUser = users[0];
      setFoundUserId(foundUser.username);
    } catch (error) {
      toast.error(
        error.message || '아이디 찾기 실패. 이메일을 확인해 주세요.',
        {
          duration: 2000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // 비밀번호 찾기 처리 함수
  const handleFindPassword = async () => {
    setIsSubmitting(true);
  };

  return (
    <>
      <Helmet>
        <title>하루몽 - 로그인</title>
        <meta name="description" content="하루몽 로그인 페이지 입니다." />
        <meta property="author" content="하루몽" />

        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://harumong.netlify.app/login" />
        <meta property="og:site_name" content="하루몽 - 감정일기" />
        <meta property="og:title" content="하루몽 - 감정일기" />
        <meta
          property="og:description"
          content="감정 기반으로 작성하는 일기 어플리케이션 하루몽"
        />
        <meta
          property="og:image"
          content="https://harumong.netlify.app/logo.png"
        />
      </Helmet>
      <section className="flex flex-col items-center justify-center gap-10 min-h-dvh">
        <header className="flex justify-center">
          <h1 className="sr-only">하루몽 로그인</h1>
          <img
            src="/logo.png"
            alt="하루몽"
            loading="lazy"
            width={225}
            height={150}
          />
        </header>
        <form onSubmit={handleLogin} className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <Input
              label="아이디"
              type="text"
              id="login_username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              label="비밀번호"
              type="password"
              id="login_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isViewIcon={true}
            />
          </div>

          <div className="flex flex-row justify-between flex-nowrap">
            <Button
              to="/register"
              text="회원가입"
              type="secondary"
              className="flex-1"
            />
            <Button
              buttonType="submit"
              type="primary"
              text="로그인"
              className="flex-1"
              aria-disabled={username === '' || password === ''}
              disabled={isSubmitting}
            />
          </div>

          {/* 아이디 찾기 및 비밀번호 찾기 버튼 */}
          <div className="flex flex-row justify-center gap-7">
            <button
              type="button"
              onClick={() => openModal('findIdModal')}
              className="text-sm text-blue-500"
            >
              아이디 찾기
            </button>
            <button
              type="button"
              onClick={() => openModal('findPasswordModal')}
              className="text-sm text-blue-500"
            >
              비밀번호 찾기
            </button>
          </div>
        </form>

        {/* 아이디 찾기 모달 */}
        <Modal
          isOpen={isOpen('findIdModal')}
          closeModal={() => {
            closeModal('findIdModal');
            setFoundUserId('');
            setEmail('');
          }}
        >
          <section className="flex flex-col gap-3">
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
                className="flex-[2] p-2 border border-gray-300 rounded-md"
                aria-label="이메일 입력"
              />
              <button
                onClick={handleFindId}
                className={`flex-1 p-2 text-white ${
                  isSubmitting ? 'bg-gray-300' : 'bg-blue-500'
                } rounded-md`}
                disabled={!email || isSubmitting}
              >
                검색
              </button>
            </div>
            {foundUserId && (
              <div className="text-base text-center text-gray-400">
                검색된 아이디는{' '}
                <span className="font-semibold text-blue-500">
                  {foundUserId}
                </span>{' '}
                입니다.
              </div>
            )}
          </section>
        </Modal>

        {/* 비밀번호 찾기 모달 */}
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
                  className="p-2 border border-gray-300 rounded-md"
                  aria-label="이메일 입력"
                />
                <button
                  className="flex-1 p-1 text-white bg-blue-500 rounded-md"
                  onClick={handleFindPassword}
                >
                  인증 요청
                </button>
              </div>
            </section>

            <button
              onClick={handleFindPassword}
              className={`p-2 text-white ${
                isSubmitting ? 'bg-gray-300' : 'bg-blue-500'
              } rounded-md`}
              disabled={!findUsername || !email || isSubmitting}
            >
              비밀번호 변경
            </button>
          </div>
        </Modal>
      </section>
    </>
  );
};

export default Login;

// 인증 함수
const authenticateUser = async (username, password) => {
  try {
    const response = await pb
      .collection('users')
      .authWithPassword(username, password);
    const { model, token } = authUtils.getPocketbaseAuth();

    if (!model.verified) {
      pb.authStore.clear();
      throw new Error('이메일 인증이 필요합니다');
    }

    authUtils.setAuthData(model, token);
    return response;
  } catch (error) {
    if (error.message === '이메일 인증이 필요합니다') {
      toast.error('가입한 이메일의 인증을 확인 후 로그인 하세요', {
        duration: 2000,
      });
    }
    throw error;
  }
};
