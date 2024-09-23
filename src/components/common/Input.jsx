import PropTypes from 'prop-types';
import { useState, useCallback, useMemo } from 'react';
import VisibleIcon from '@/assets/icons/passwordView/visible.svg';
import InvisibleIcon from '@/assets/icons/passwordView/invisible.svg';

const styles = {
  input:
    'block py-2.5 px-0 w-full text-base rounded-none bg-transparent border-b text-gray-450 border-gray-400 focus:outline-none focus:border-blue-500 focus:text-blue-500',
  error: 'w-full text-red text-xs mt-1 text-nowrap',
  success: 'w-full mt-1 text-xs text-green-600',
  label: (isFocused, hasValue) => `
    absolute text-sm top-3 duration-300 transform origin-[0]
    ${
      isFocused || hasValue
        ? '-translate-y-6 scale-75'
        : 'translate-y-0 scale-100'
    }
    ${isFocused ? 'text-blue-500' : 'text-gray-450'}
  `,
};

const Input = ({
  label,
  id,
  type,
  className = '',
  error,
  errorMessage,
  duplicate,
  isViewIcon = false,
  onChange,
  form = {},
  ...props
}) => {
  const [inputState, setInputState] = useState({
    isFocused: false,
    hasValue: false,
    isHide: type === 'password',
  });

  const handleFocus = useCallback(
    () => setInputState((prev) => ({ ...prev, isFocused: true })),
    []
  );

  const handleBlur = useCallback(({ target: { value } }) => {
    setInputState((prev) => ({
      ...prev,
      isFocused: false,
      hasValue: Boolean(value),
    }));
  }, []);

  const handleChange = useCallback(
    (e) => {
      setInputState((prev) => ({ ...prev, hasValue: Boolean(e.target.value) }));
      onChange?.(e);
    },
    [onChange]
  );

  const handleToggle = useCallback(() => {
    setInputState((prev) => ({ ...prev, isHide: !prev.isHide }));
  }, []);

  const successMessage = useMemo(() => {
    const messages = {
      username: '사용 가능한 아이디입니다.',
      email: '사용 가능한 이메일입니다.',
      name: '사용 가능한 닉네임입니다.',
      password: '사용 가능한 비밀번호입니다.',
      passwordConfirm: '비밀번호가 일치합니다.',
    };

    const conditions = {
      username: !error && inputState.hasValue && duplicate,
      email: !error && inputState.hasValue && duplicate,
      name: !error && inputState.hasValue && duplicate,
      password: !error && inputState.hasValue,
      passwordConfirm:
        !error &&
        inputState.hasValue &&
        (form.password || '') === (form.passwordConfirm || ''),
    };

    return conditions[id] ? messages[id] : null;
  }, [
    id,
    error,
    inputState.hasValue,
    duplicate,
    form.password,
    form.passwordConfirm,
  ]);

  return (
    <div className={`relative w-[242px] ${className}`}>
      <input
        type={
          type === 'password' ? (inputState.isHide ? 'password' : 'text') : type
        }
        id={id}
        className={`${styles.input} ${error ? 'border-red-500' : ''}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
      <label
        htmlFor={id}
        className={styles.label(inputState.isFocused, inputState.hasValue)}
      >
        {label}
      </label>

      {error && errorMessage && <p className={styles.error}>{errorMessage}</p>}
      {successMessage && <p className={styles.success}>{successMessage}</p>}

      {isViewIcon && (
        <button
          type="button"
          className="absolute right-0 top-3"
          onClick={handleToggle}
          aria-label={inputState.isHide ? '비밀번호 보기' : '비밀번호 숨기기'}
        >
          <img
            src={inputState.isHide ? InvisibleIcon : VisibleIcon}
            alt={inputState.isHide ? '비밀번호 숨김' : '비밀번호 표시'}
          />
        </button>
      )}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['email', 'password', 'text', 'number']).isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  isViewIcon: PropTypes.bool,
  onChange: PropTypes.func,
  duplicate: PropTypes.bool,
  form: PropTypes.object,
};

export default Input;
