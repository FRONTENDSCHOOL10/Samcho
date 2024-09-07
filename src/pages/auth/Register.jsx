import { Button, Input } from '@/components';

const Register = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <header className="flex justify-center">
        <h1 className="text-[36px] font-semibold text-gray-450">회원가입</h1>
      </header>
      <form className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <Input label="아이디" type="text" id="user_id" />
          <Input label="이메일" type="email" id="user_email" />
          <Input label="닉네임" type="text" id="user_name" />
          <Input label="비밀번호" type="password" id="user_pw" />
          <Input label="비밀번호 확인" type="password" id="user_pw-check" />
        </div>
        <div className="flex flex-row justify-between flex-nowrap">
          <Button
            to="/login"
            text="이전으로"
            type="secondary"
            className="flex-1"
          />
          <Button
            to="/login"
            text="회원가입"
            type="primary"
            className="flex-1"
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
