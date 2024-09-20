import pb from '@/api/pb';
import { Button, Input } from '@/components';
import { authUtils } from '@/utils';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [username, setUsername] = useState('');
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

  return (
    <section className="flex flex-col items-center justify-center gap-10 min-h-dvh">
      <header className="flex justify-center w-[225px] h-[150px]">
        <h1 className="sr-only">하루몽 로그인</h1>
        <img src="/logo.png" alt="하루몽" />
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
      </form>
    </section>
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
