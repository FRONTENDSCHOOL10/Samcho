import { Button, Input } from '@/components';

Input;
const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <header className="flex justify-center w-[225px] h-[150px]">
        <img src="/logo.png" alt="하루몽" />
      </header>
      <form className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <Input label="아이디" type="text" id="user_id" />
          <Input label="비밀번호" type="password" id="user_pw" />
        </div>
        <div className="flex flex-row justify-between flex-nowrap">
          <Button
            to="/register"
            text="회원가입"
            type="secondary"
            className="flex-1"
          />
          <Button to="/" text="로그인" type="primary" className="flex-1" />
        </div>
      </form>
    </div>
  );
};

export default Login;
