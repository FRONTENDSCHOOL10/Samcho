import PropTypes from 'prop-types';
import { useState } from 'react';
import VisibleIcon from '@/assets/icons/passwordView/visible.svg';
import InvisibleIcon from '@/assets/icons/passwordView/invisible.svg';

const inputClasses =
  'block py-2.5 px-0 w-full text-base rounded-none bg-transparent border-b text-gray-450 border-gray-400 focus:outline-none focus:border-blue-500 focus:text-blue-500';

const errorClasses = 'w-full text-red text-xs mt-1 text-nowrap';

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
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [isHide, setIsHide] = useState(type === 'password'); // 초기 상태를 password 여부로 설정

  const handleFocus = () => setIsFocused(true);
  const handleBlur = ({ target: { value } }) => {
    setIsFocused(false);
    setHasValue(Boolean(value));
  };
  const handleChange = (e) => {
    setHasValue(Boolean(e.target.value));

    if (onChange) {
      onChange(e);
    }
  };

  const handleToggle = () => {
    setIsHide((prev) => !prev);
  };

  const labelClasses = `
    absolute text-sm top-3 duration-300 transform origin-[0]
    ${
      isFocused || hasValue
        ? '-translate-y-6 scale-75'
        : 'translate-y-0 scale-100'
    }
    ${isFocused ? 'text-blue-500' : 'text-gray-450'}
  `;

  // 성공 메시지 조건 설정
  const successMessages = {
    username: renderSuccessMessage(
      id === 'username' && !error && hasValue && duplicate,
      '사용 가능한 아이디입니다.'
    ),
    email: renderSuccessMessage(
      id === 'email' && !error && hasValue && duplicate,
      '사용 가능한 이메일입니다.'
    ),
    name: renderSuccessMessage(
      id === 'name' && !error && hasValue && duplicate,
      '사용 가능한 닉네임입니다.'
    ),
    password: renderSuccessMessage(
      id === 'password' && !error && hasValue,
      '사용 가능한 비밀번호입니다.'
    ),
    passwordConfirm: renderSuccessMessage(
      id === 'passwordConfirm' &&
        !error &&
        hasValue &&
        (form.password || '') === (form.passwordConfirm || ''),
      '비밀번호가 일치합니다.'
    ),
  };

  return (
    <div className={`relative w-[242px] ${className}`}>
      <input
        type={type === 'password' ? (isHide ? 'password' : 'text') : type}
        id={id}
        className={`${inputClasses} ${error ? 'border-red-500' : ''}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        {...props}
      />
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>

      {/* 에러 메시지 */}
      {error && errorMessage && <p className={errorClasses}>{errorMessage}</p>}

      {/* 성공 메시지*/}
      {successMessages[id]}

      {/* 비밀번호 보기/숨기기 아이콘 */}
      {isViewIcon && (
        <button
          type="button"
          className="absolute right-0 top-3"
          onClick={handleToggle}
          aria-label={isHide ? '비밀번호 보기' : '비밀번호 숨기기'}
          title={isHide ? '비밀번호 보기' : '비밀번호 숨기기'}
        >
          <img
            src={isHide ? InvisibleIcon : VisibleIcon}
            alt={isHide ? '비밀번호 숨김' : '비밀번호 표시'}
          />
        </button>
      )}
    </div>
  );
};

/* 성공 메세지 렌더링 함수 */
const renderSuccessMessage = (condition, message) => {
  return (
    condition && <p className="w-full mt-1 text-xs text-green-600">{message}</p>
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
