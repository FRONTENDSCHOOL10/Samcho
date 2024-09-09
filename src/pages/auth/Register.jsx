import { useState } from 'react';
import { Button, Input } from '@/components';
import pb from '@/api/pb';
import toast from 'react-hot-toast';
import {
  validateEmail,
  validateUsername,
  validateNickname,
  validatePassword,
} from '@/utils';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  });

  const [errors, setErrors] = useState({});
  const [duplicate, setDuplicate] = useState({ username: false, name: false });

  const checkAvailability = async (e, field) => {
    toast.dismiss();

    switch (field) {
      case 'username':
        if (!validateUsername(form.username)) {
          toast.error('아이디 형식이 올바르지 않습니다.');
          return;
        }

        try {
          const existingUser = await pb
            .collection('users')
            .getFirstListItem(`username="${form.username}"`);

          if (existingUser) {
            toast.error('이미 존재하는 아이디 입니다.');
            setDuplicate({ ...duplicate, username: false });
          }
        } catch (error) {
          if (error.status === 404) {
            // 404 에러인 경우, 유저가 없다는 뜻이므로 success toast 출력
            toast.success('사용 가능한 아이디 입니다!');
            setDuplicate({ ...duplicate, username: true });
            return;
          } else {
            throw error; // 다른 에러는 다시 throw하여 catch로 넘김
          }
        }
        break;

      case 'name':
        if (!validateNickname(form.name)) {
          toast.error('닉네임 형식이 올바르지 않습니다.');
          return;
        }

        try {
          const existingUser = await pb
            .collection('users')
            .getFirstListItem(`name="${form.name}"`);

          if (existingUser) {
            toast.error('이미 존재하는 닉네임 입니다!');
            setDuplicate({ ...duplicate, name: false });
          }
        } catch (error) {
          if (error.status === 404) {
            // 404 에러인 경우, 닉네임이 없다는 뜻이므로 success toast 출력
            toast.success('사용 가능한 닉네임 입니다!');
            setDuplicate({ ...duplicate, name: true });
            return;
          } else {
            throw error; // 다른 에러는 다시 throw하여 catch로 넘김
          }
        }
        break;

      default:
        toast.error('알 수 없는 필드입니다.');
        break;
    }
  };

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
    }
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
              onClick={(e) => checkAvailability(e, 'username')}
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
              onClick={(e) => checkAvailability(e, 'name')}
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
