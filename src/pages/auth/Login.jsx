import { useState } from 'react';
import { Button, Input } from '@/components';
import pb from '@/api/pb';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (username === '' || password === '') {
      toast.error('아이디 혹은 비밀번호를 입력해 주세요.');
      return;
    }

    try {
      await pb.collection('users').authWithPassword(username, password);

      const pocketbaseAuth = JSON.parse(
        localStorage.getItem('pocketbase_auth')
      );

      const { model, token } = pocketbaseAuth;

      localStorage.setItem(
        'auth',
        JSON.stringify({
          isAuth: !!model,
          user: model,
          token,
        })
      );

      navigate('/');
    } catch (error) {
      toast.dismiss();
      toast.error('아이디 혹은 비밀번호가 일치하지 않습니다.');
      console.error('로그인 실패:', error);
    }
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
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label="비밀번호"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Toaster />

        <div className="flex flex-row justify-between flex-nowrap">
          <Button
            to="/register"
            text="회원가입"
            type="secondary"
            className="flex-1"
          />
          <Button type="primary" text="로그인" className="flex-1" />
        </div>
      </form>
    </section>
  );
};

export default Login;
