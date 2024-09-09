import { TopHeader } from '@/components';
import { Link } from 'react-router-dom';
import { DirectionRight } from '@/assets/icons/direction';
import toast, { Toaster } from 'react-hot-toast';

import { useEffect, useState } from 'react';

const Mypage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const authData = localStorage.getItem('pocketbase_auth');

    if (authData) {
      const parsedData = JSON.parse(authData);
      const userModel = parsedData.model;
      const storedUsername = userModel.username;
      const storedEmail = userModel.email;

      setUsername(storedUsername);
      setEmail(storedEmail);
    }
  });

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


  const handleSubmit = (e) => {
    e.preventDefault();

    toast.dismiss();
    toast.error('Here is your toast.');

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

    <>
      <TopHeader title="내정보" />
      <div className="flex flex-col justify-start items-center gap-[25px] mt-5 min-h-dvh pb-[80px]">
        {/* 계정 섹션 */}
        <section className="flex flex-col w-full gap-4">
          <h2 className="text-lg font-semibold text-gray-450">계정</h2>
          <div className="w-full flex items-center justify-between p-[0.9375rem] bg-white rounded-[10px] shadow-light">
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-gray-450">
                {username}
              </h3>
              <p className="text-sm font-medium text-gray-400">{email}</p>
            </div>
            <nav aria-label="계정 관리">
              <Link to="/mypage/setting" aria-label="계정 관리 페이지로 이동">
                <DirectionRight className="fill-black" />
              </Link>
            </nav>
          </div>
        </section>

        {/* 나의 기록 섹션 */}
        <section className="flex flex-col justify-between w-full gap-4">
          <h2 className="text-lg font-semibold text-gray-450">나의 기록</h2>
          <div className="flex justify-between gap-5">
            <article className="w-full h-[110px] p-[0.9375rem] bg-white rounded-[0.625rem] shadow-light flex flex-col gap-2">
              <h3 className="text-base font-medium text-gray-450">
                기록한 하루
              </h3>
              <p className="text-sm font-medium text-gray-400 self-left">
                1234개
              </p>
            </article>
            <article className="w-full p-[0.9375rem] bg-white rounded-[0.625rem] shadow-light flex flex-col gap-2">
              <h3 className="text-base font-medium text-gray-450">올린 사진</h3>
              <p className="text-sm font-medium text-gray-400 self-left">
                1234개
              </p>
            </article>
          </div>
          <article className="w-full h-[60px] p-[0.9375rem] bg-white rounded-[0.625rem] shadow-light flex items-center justify-between">
            <h3 className="sr-only">사진 모아 보기</h3>
            <p className="text-base font-medium text-gray-450">
              사진 모아 보기
            </p>
            <nav aria-label="사진 모아 보기">
              <Link
                to="/mypage/photo"
                aria-label="사진 모아 보기 페이지로 이동"
              >
                <DirectionRight className="fill-black" />
              </Link>
            </nav>
          </article>
        </section>

        {/* 단짝 섹션 */}
        <section className="flex flex-col w-full gap-5">
          <h2 className="text-lg font-semibold text-gray-450">나의 단짝</h2>
          <article className="h-[60px] p-[0.9375rem] bg-white rounded-[0.625rem] shadow-light flex items-center justify-between">
            <h3 className="sr-only">단짝 관리</h3>
            <p className="text-base font-medium text-gray-450">5명</p>
            <nav aria-label="단짝 관리">
              <Link
                to="/mypage/buddy-management"
                aria-label="단짝 관리 페이지로 이동"
              >
                <span className="text-base font-semibold text-blue-500">
                  관리
                </span>
              </Link>
            </nav>
          </article>
        </section>

        {/* 단짝 찾기 섹션 */}
        <section className="flex flex-col w-full gap-5">
          <h2 className="text-lg font-semibold text-gray-450">단짝 찾기</h2>
          <form
            onSubmit={handleSubmit}
            className="h-[60px] p-[0.9375rem] bg-white rounded-[0.625rem] shadow-light flex items-center justify-between focus-within:ring-1 focus-within:ring-blue-300"
            aria-labelledby="buddy-search-label"
          >
            <label
              id="buddy-search-label"
              htmlFor="buddy-search-input"
              className="sr-only"
            >
              단짝 검색
            </label>
            <input
              type="text"
              id="buddy-search-input"
              placeholder="사용자의 아이디를 입력하세요"
              className="flex-1 text-base font-medium outline-none text-gray-450 placeholder:text-gray-300"
            />
            <button
              type="submit"
              className="text-base font-semibold text-blue-500 "
              aria-label="단짝 검색"
            >
              검색
            </button>
            <Toaster />
          </form>
        </section>
      </div>
    </>

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

export default Mypage;
