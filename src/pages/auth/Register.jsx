import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@/components';
import toast from 'react-hot-toast';
import pb from '@/api/pb';
import {
  validateEmail,
  validateUsername,
  validateNickname,
  validatePassword,
  authUtils,
} from '@/utils';
import { useCheckAvailability } from '@/hooks';

const FORM_FIELDS = [
  'username',
  'email',
  'name',
  'password',
  'passwordConfirm',
];
const DUPLICATE_CHECK_FIELDS = ['username', 'name'];

const Register = () => {
  const navigate = useNavigate();
  const { duplicate, checkAvailability, resetDuplicate } =
    useCheckAvailability();

  const [form, setForm] = useState({
    username: '',
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (authUtils.getAuth().isAuth) navigate('/');
  }, [navigate]);

  const validateField = useCallback(
    (id, value, updatedForm = form) => {
      const validationRules = {
        username: () =>
          validateUsername(value)
            ? ''
            : '영문, 숫자 포함 4자리 이상 입력하세요.',
        email: () =>
          validateEmail(value) ? '' : '유효한 이메일 주소를 입력하세요.',
        name: () =>
          validateNickname(value) ? '' : '특수문자 제외 2자리 이상 입력하세요.',
        password: () =>
          validatePassword(value)
            ? ''
            : '영문, 숫자, 특수문자 포함 8자리 이상 입력하세요.',
        passwordConfirm: () =>
          value === updatedForm.password ? '' : '비밀번호가 일치하지 않습니다.',
      };

      return validationRules[id] ? validationRules[id]() : '';
    },
    [form]
  );

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (DUPLICATE_CHECK_FIELDS.includes(id)) {
      resetDuplicate(id);
    }

    setForm((prevForm) => {
      const updatedForm = { ...prevForm, [id]: value };
      const error = validateField(id, value, updatedForm);
      setErrors((prev) => ({ ...prev, [id]: error }));

      if (id === 'password' || id === 'passwordConfirm') {
        const confirmError = validateField(
          'passwordConfirm',
          updatedForm.passwordConfirm,
          updatedForm
        );
        setErrors((prev) => ({ ...prev, passwordConfirm: confirmError }));
      }

      return updatedForm;
    });
  };

  const validateForm = useCallback(() => {
    let isValid = true;
    const newErrors = {};

    FORM_FIELDS.forEach((field) => {
      if (!form[field].trim()) {
        newErrors[field] = '이 필드는 필수입니다.';
        isValid = false;
      } else {
        const error = validateField(field, form[field]);
        if (error) {
          newErrors[field] = error;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [form, validateField]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!validateForm()) {
      toast.error('모든 필드를 올바르게 입력해주세요.');
      return;
    }

    if (!duplicate.username || !duplicate.name) {
      toast.error('아이디와 닉네임 중복 확인을 해주세요.');
      return;
    }

    const data = { ...form, emailVisibility: true };

    try {
      setIsSubmitting(true);
      await toast.promise(pb.collection('users').create(data), {
        loading: '회원가입 시도 중...',
        success: '회원가입을 완료했습니다!',
        error: '회원가입에 실패했습니다...',
      });
      navigate('/login');
    } catch (error) {
      console.error('[Error] 회원가입: ', error);
      setIsSubmitting(false);
    }
  };

  const renderDuplicateCheckButton = useCallback(
    (field) => (
      <button
        type="button"
        onClick={() => checkAvailability(field, form[field])}
        className={`text-sm font-medium text-blue text-nowrap ${
          validateField(field, form[field])
            ? 'text-gray-300 cursor-not-allowed'
            : ''
        }`}
        disabled={validateField(field, form[field])}
      >
        중복확인
      </button>
    ),
    [checkAvailability, form, validateField]
  );

  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-dvh">
      <header className="flex justify-center">
        <h1 className="text-[36px] font-semibold text-gray-450">회원가입</h1>
      </header>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <div className="flex justify-between max-w-[250px] gap-2">
            <Input
              label="아이디"
              type="text"
              id="username"
              value={form.username}
              onChange={handleChange}
              error={!!errors.username}
              errorMessage={errors.username}
              duplicate={duplicate.username}
              className="min-h-[61px]"
            />
            {renderDuplicateCheckButton('username')}
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
          <div className="flex justify-between max-w-[250px] gap-2">
            <Input
              label="닉네임"
              type="text"
              id="name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              errorMessage={errors.name}
              duplicate={duplicate.name}
              className="min-h-[61px]"
            />
            {renderDuplicateCheckButton('name')}
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
            disabled={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default React.memo(Register);
