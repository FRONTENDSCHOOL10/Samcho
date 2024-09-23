import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
import { Helmet } from 'react-helmet-async';

const FORM_FIELDS = [
  'username',
  'email',
  'name',
  'password',
  'passwordConfirm',
];
const DUPLICATE_CHECK_FIELDS = ['username', 'email', 'name'];

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
          validateUsername(value) ? '' : '영어, 숫자 4자리 이상 입력하세요.',
        email: () =>
          validateEmail(value) ? '' : '유효한 이메일 주소를 입력하세요.',
        name: () =>
          validateNickname(value) ? '' : '특수문자 제외 2~6 자리로 입력하세요.',
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

  const handleChange = useCallback(
    (e) => {
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
    },
    [validateField, resetDuplicate]
  );

  const validateForm = useCallback(() => {
    const newErrors = {};
    const isValid = FORM_FIELDS.every((field) => {
      if (!form[field].trim()) {
        newErrors[field] = '해당 필드 입력은 필수입니다.';
        return false;
      }
      const error = validateField(field, form[field]);
      if (error) {
        newErrors[field] = error;
        return false;
      }
      return true;
    });

    setErrors(newErrors);
    return isValid;
  }, [form, validateField]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.remove();

    if (!validateForm()) {
      toast.error('모든 필드를 올바르게 입력해주세요.', { duration: 1500 });
      return;
    }

    if (!DUPLICATE_CHECK_FIELDS.every((field) => duplicate[field])) {
      toast.error('중복 확인을 하지 않은 필드가 존재합니다.', {
        duration: 1500,
      });
      return;
    }

    const data = { ...form, emailVisibility: true };

    try {
      setIsSubmitting(true);
      await toast.promise(
        pb.collection('users').create(data),
        {
          loading: '회원가입 시도 중...',
          success: '회원가입을 완료했습니다!',
          error: '회원가입에 실패했습니다...',
        },
        { duration: 2000 }
      );
      await pb.collection('users').requestVerification(form.email);
      toast.success('가입한 이메일 인증 후 로그인이 가능합니다.', {
        duration: 5000,
      });
      navigate('/login');
    } catch (error) {
      console.error('[Error] 회원가입: ', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderDuplicateCheckButton = useCallback(
    (field) => (
      <button
        type="button"
        onClick={() => checkAvailability(field, form[field])}
        className={`text-sm font-medium text-blue text-nowrap ${
          validateField(field, form[field]) || duplicate[field]
            ? 'text-gray-300 cursor-not-allowed'
            : ''
        }`}
        disabled={validateField(field, form[field]) || duplicate[field]}
      >
        중복확인
      </button>
    ),
    [checkAvailability, form, validateField, duplicate]
  );

  const formFields = useMemo(
    () => [
      { id: 'username', label: '아이디', type: 'text' },
      { id: 'email', label: '이메일', type: 'email' },
      { id: 'name', label: '닉네임', type: 'text' },
      { id: 'password', label: '비밀번호', type: 'password', isViewIcon: true },
      {
        id: 'passwordConfirm',
        label: '비밀번호 확인',
        type: 'password',
        isViewIcon: true,
      },
    ],
    []
  );

  return (
    <div className="flex flex-col items-center justify-center gap-10 min-h-dvh">
      <Helmet>
        <title>하루몽 - 회원가입</title>
        <meta name="description" content="하루몽 회원가입 페이지 입니다." />
        <meta property="author" content="하루몽" />

        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://harumong.netlify.app/register"
        />
        <meta property="og:site_name" content="하루몽 - 감정일기" />
        <meta property="og:title" content="하루몽 - 감정일기" />
        <meta
          property="og:description"
          content="감정 기반으로 작성하는 일기 어플리케이션 하루몽"
        />
        <meta
          property="og:image"
          content="https://harumong.netlify.app/logo.webp"
        />
      </Helmet>

      <header className="flex justify-center">
        <h1 className="text-[36px] font-semibold text-gray-450">회원가입</h1>
      </header>
      <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          {formFields.map(({ id, label, type, isViewIcon }) => (
            <div key={id} className="flex justify-between max-w-[250px] gap-2">
              <Input
                label={label}
                type={type}
                id={id}
                value={form[id]}
                onChange={handleChange}
                error={!!errors[id]}
                errorMessage={errors[id]}
                duplicate={duplicate[id]}
                isViewIcon={isViewIcon}
                className="min-h-[65px]"
              />
              {DUPLICATE_CHECK_FIELDS.includes(id) &&
                renderDuplicateCheckButton(id)}
            </div>
          ))}
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
