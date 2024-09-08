import { useState } from 'react';
import { Button, Input } from '@/components';
import pb from '@/api/pb';
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const [error, setError] = useState('');

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const authData = await pb
        .collection('users')
        .authWithPassword(username, password);

      localStorage.setItem('pb_auth_token', authData.token);

      toast.success('로그인에 성공하였습니다.');
      location.href = '/';
    } catch (error) {
      toast.dismiss();
      toast.error('로그인에 실패했습니다.');
      console.error('로그인 실패:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <header className="flex justify-center w-[225px] h-[150px]">
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
    </div>
  );
};

export default Login;
