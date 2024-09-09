import { useState } from 'react';
import { Button, Input } from '@/components';
import pb from '@/api/pb';
import toast, { Toaster } from 'react-hot-toast';
import {
  validateEmail,
  validateUsername,
  validateNickname,
  validatePassword,
} from '@/utils';

const Register = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });

    validateField(id, value);
  };

  const validateField = (id, value) => {
    let error = '';

    switch (id) {
      case 'username':
        if (!validateUsername(value))
          error = '아이디는 영문, 숫자 포함 4자리 이상 입력하세요.';
        break;
      case 'email':
        if (!validateEmail(value)) error = '유효한 이메일 주소를 입력하세요.';
        break;
      case 'name':
        if (!validateNickname(value))
          error = '닉네임은 한글로 두자리 이상 입력하세요.';
        break;
      case 'password':
        if (!validatePassword(value))
          error =
            '비밀번호는 8자리 이상 영문, 숫자, 특수문자를 포함해야 합니다.';
        break;
      case 'passwordConfirm':
        if (value !== form.password) error = '비밀번호가 일치하지 않습니다.';
        break;
      default:
        break;
    }

    setErrors({ ...errors, [id]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, name, password, passwordConfirm } = form;

    // 중복 토스트 제거
    toast.dismiss();

    let formIsValid = true;
    let missingFields = false;

    const fieldKeys = Object.keys(form);
    const newErrors = {};

    fieldKeys.forEach((field) => {
      if (!form[field]) {
        missingFields = true;
        newErrors[field] = '해당 필드를 입력해 주세요.';
      }
      validateField(field, form[field]);
      if (errors[field]) formIsValid = false;
    });

    setErrors(newErrors);

    if (missingFields) {
      toast.error('입력하지 않은 필드값이 존재합니다.');
      return;
    }

    if (formIsValid) {
      try {
        const data = {
          username,
          email,
          name,
          password,
          passwordConfirm,
          emailVisibility: true,
        };
        console.log(data);

        await pb.collection('users').create(data);

        toast.success('회원가입이 완료되었습니다.');
      } catch (err) {
        toast.error('회원가입 중 오류가 발생했습니다.');
        console.error(err);
      }
    } else {
      toast.error('입력하지 않은 필드값이 존재합니다.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-dvh">
      <header className="flex justify-center">
        <h1 className="text-[36px] font-semibold text-gray-450">회원가입</h1>
      </header>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <Input
            label="아이디"
            type="text"
            id="username"
            value={form.username}
            onChange={handleChange}
            error={!!errors.username}
            errorMessage={errors.username}
          />
          <Input
            label="이메일"
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            errorMessage={errors.email}
          />
          <Input
            label="닉네임"
            type="text"
            id="name"
            value={form.name}
            onChange={handleChange}
            error={!!errors.name}
            errorMessage={errors.name}
          />
          <Input
            label="비밀번호"
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            errorMessage={errors.password}
            isViewIcon={true}
          />
          <Input
            label="비밀번호 확인"
            type="password"
            id="passwordConfirm"
            value={form.passwordConfirm}
            onChange={handleChange}
            error={!!errors.passwordConfirm}
            errorMessage={errors.passwordConfirm}
            isViewIcon={true}
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
