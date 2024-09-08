import { useState } from 'react';
import { Button, Input } from '@/components';
import pb from '@/api/pb';
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  });

  //const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const validateUsername = (username) => {
    const usernameRegex = /^[A-Za-z]+$/;
    return usernameRegex.test(username);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z0-9]{2,}$/;
    return nameRegex.test(name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, name, password, passwordConfirm } = formData;

    // 중복 토스트 제거
    toast.dismiss();

    if (username === '') {
      toast.error('아이디를 입력해 주십시오');
      return;
    } else if (!validateUsername(username)) {
      toast.error('아이디는 영어로만 입력해 주십시오');
      return;
    } else if (email === '') {
      toast.error('이메일을 입력해 주십시오');
      return;
    } else if (!validateEmail(email)) {
      toast.error('유효한 이메일 주소를 입력해 주십시오');
      return;
    } else if (name === '') {
      toast.error('닉네임을 입력해 주십시오');
      return;
    } else if (!validateName(name)) {
      toast.error(
        '닉네임은 두 자리 이상이어야 하며, 특수문자는 사용할 수 없습니다.'
      );
      return;
    } else if (password === '') {
      toast.error('비밀번호를 입력해 주십시오');
      return;
    } else if (!validatePassword(password)) {
      toast.error(
        '비밀번호는 최소 8자리 이상, 영문자, 숫자, 특수문자를 포함해야 합니다.'
      );
      return;
    } else if (password !== passwordConfirm) {
      toast.error('비밀번호가 일치하지 않습니다.', {});
      return;
    }

    try {
      const data = {
        username,
        email,
        name,
        password,
        passwordConfirm,
      };

      const record = await pb.collection('users').create(data);

      toast.success('회원가입이 완료되었습니다.');
      location.reload();
    } catch (err) {
      toast.error('회원가입 중 오류가 발생했습니다.');
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full gap-10">
      <header className="flex justify-center">
        <h1 className="text-[36px] font-semibold text-gray-450">회원가입</h1>
      </header>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <Input
            label="아이디"
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
          <Input
            label="이메일"
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="닉네임"
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="비밀번호"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          <Input
            label="비밀번호 확인"
            type="password"
            id="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
          />
        </div>
        <Toaster />

        <div className="flex flex-row justify-between flex-nowrap">
          <Button
            to="/login"
            text="이전으로"
            type="secondary"
            className="flex-1"
          />
          <Button text="회원가입" type="primary" className="flex-1" />
        </div>
      </form>
    </div>
  );
};

export default Register;
