import { useState } from 'react';
import { Button, Input } from '@/components';
import toast from 'react-hot-toast';
import pb from '@/api/pb';
import {
  validateEmail,
  validateUsername,
  validateNickname,
  validatePassword,
} from '@/utils';
import { useNavigate } from 'react-router-dom';
import useCheckAvailability from '@/hooks/useCheckAvailability'; // 추가

const Register = () => {
  const navigate = useNavigate();

  // 폼 상태
  const [form, setForm] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  });

  // 에러 상태
  const [errors, setErrors] = useState({});

  // 중복 확인 관련 훅 사용
  const { duplicate, checkAvailability, resetDuplicate } =
    useCheckAvailability();

  // 입력 시 실시간 유효성 검증
  const handleChange = (e) => {
    const { id, value } = e.target;

    // 아이디나 닉네임이 변경될 경우 중복 상태 초기화
    if (id === 'username' || id === 'name') {
      resetDuplicate(id);
    }

    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [id]: value };

      // 실시간 유효성 검사
      validateField(id, value, updatedForm);

      // 비밀번호 변경 시 비밀번호 확인도 다시 검사
      if (id === 'password' || id === 'passwordConfirm') {
        validateField(
          'passwordConfirm',
          updatedForm.passwordConfirm,
          updatedForm
        );
      }

      return updatedForm;
    });
  };

  // 유효성 검증을 통한 메세지 표시
  const validateField = (id, value, updatedForm = form) => {
    let error = '';

    switch (id) {
      case 'username':
        if (!validateUsername(value))
          error = '영문, 숫자 포함 4자리 이상 입력하세요.';
        break;
      case 'email':
        if (!validateEmail(value)) error = '유효한 이메일 주소를 입력하세요.';
        break;
      case 'name':
        if (!validateNickname(value)) error = '한글 2자리 이상 입력하세요.';
        break;
      case 'password':
        if (!validatePassword(value))
          error = '영문, 숫자, 특수문자 포함 8자리 이상 입력하세요.';
        break;
      case 'passwordConfirm':
        if (value !== updatedForm.password)
          error = '비밀번호가 일치하지 않습니다.';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [id]: error }));
  };

  // 최종 유효성 검증 및 회원가입 데이터 제출
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, name, password, passwordConfirm } = form;

    toast.dismiss();

    let formIsValid = true;
    const newErrors = {};

    Object.keys(form).forEach((field) => {
      validateField(field, form[field]);
      if (errors[field]) {
        formIsValid = false;
        newErrors[field] = errors[field];
      }
    });

    setErrors(newErrors);

    if (!formIsValid) {
      toast.error('입력된 정보가 유효하지 않습니다.');
      return;
    }

    if (!duplicate.username) {
      toast.error('아이디 중복 확인을 해주세요.');
      return;
    }

    if (!duplicate.name) {
      toast.error('닉네임 중복 확인을 해주세요.');
      return;
    }

    const data = {
      username,
      email,
      name,
      password,
      passwordConfirm,
      emailVisibility: true,
    };

    toast
      .promise(pb.collection('users').create(data), {
        loading: '회원가입 시도 중...',
        success: '회원가입을 완료했습니다!',
        error: '회원가입에 실패했습니다...',
      })
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('[Error] 회원가입: ', error);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-dvh">
      <header className="flex justify-center">
        <h1 className="text-[36px] font-semibold text-gray-450">회원가입</h1>
      </header>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <div className="flex gap-2 w-fit">
            <Input
              label="아이디"
              type="text"
              id="username"
              value={form.username}
              onChange={handleChange}
              error={!!errors.username}
              errorMessage={errors.username}
              duplicate={duplicate.username}
              className="!w-[166px] min-h-[61px]"
            />
            <Button
              type="secondary"
              size="xs"
              text="중복 확인"
              onClick={() => checkAvailability('username', form.username)}
              className="!rounded-md"
            />
          </div>
          <Input
            label="이메일"
            type="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            errorMessage={errors.email}
            className="min-h-[61px]"
          />
          <div className="flex gap-2 w-fit">
            <Input
              label="닉네임"
              type="text"
              id="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              errorMessage={errors.name}
              duplicate={duplicate.name}
              className="!w-[166px] min-h-[61px]"
            />
            <Button
              size="xs"
              type="secondary"
              text="중복 확인"
              onClick={() => checkAvailability('name', form.name)}
              className="!rounded-md"
            />
          </div>
          <Input
            label="비밀번호"
            type="password"
            id="password"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            errorMessage={errors.password}
            isViewIcon={true}
            className="min-h-[61px]"
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
            className="min-h-[61px]"
          />
        </div>

        <div className="flex flex-row justify-between flex-nowrap">
          <Button
            to="/login"
            text="이전으로"
            type="secondary"
            className="flex-1"
          />
          <Button
            buttonType="submit"
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
