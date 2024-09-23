import { Button, Input } from '@/components';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { pb } from '@/api';
import toast from 'react-hot-toast';
import { validatePassword } from '@/utils';

export const Component = () => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [token, setToken] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    setToken(token);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      toast.error('비밀번호가 서로 일치하지 않습니다.', {
        duration: 2000,
        id: 'passwordError',
      });
      return;
    }

    if (!validatePassword(password)) {
      toast.error(
        '비밀번호는 영문, 숫자, 특수문자 포함 8자리 이상 입력해주세요.',
        { duration: 3000, id: 'passwordValidation' }
      );
      return;
    }

    toast
      .promise(
        pb
          .collection('users')
          .confirmPasswordReset(token, password, passwordConfirm),
        {
          loading: '비밀번호 변경중...',
          success: '비밀번호가 변경되었습니다.',
          error:
            '비밀번호 변경중 오류가 발생하였습니다. \n다시 이메일 인증을 요청 해주세요.',
        }
      )
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('[error] 비밀번호 변경중 에러 발생: ', error);
      });
  };

  return (
    <section className="flex flex-col items-center justify-center gap-10 min-h-dvh">
      <Helmet>
        <title>하루몽 - 비밀번호 재설정</title>
      </Helmet>
      <header className="flex justify-center">
        <h1 className="sr-only">하루몽 비밀번호 재설정</h1>
        <img
          src="/logo.webp"
          alt="하루몽"
          loading="lazy"
          width={225}
          height={150}
        />
      </header>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend className="sr-only">비밀번호 재설정</legend>
          <div className="flex flex-col items-center justify-center gap-4">
            <Input
              label="새 비밀번호"
              type="password"
              id="new_password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isViewIcon={true}
            />
            <Input
              label="새 비밀번호 확인"
              type="password"
              id="new_password_confirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              isViewIcon={true}
            />
          </div>

          <Button
            buttonType="submit"
            type="primary"
            size="large"
            text="비밀번호 재설정"
            className={`mt-4 !w-[242px] text-nowrap ${
              !password || !passwordConfirm ? 'bg-gray-300' : 'bg-blue-500'
            }`}
            aria-disabled={!password || !passwordConfirm}
            disabled={!password || !passwordConfirm}
          />
        </fieldset>
      </form>
    </section>
  );
};

export default Component;
