import PropTypes from 'prop-types';
import { useState } from 'react';
import VisibleIcon from '@/assets/icons/passwordView/visible.svg';
import InvisibleIcon from '@/assets/icons/passwordView/invisible.svg';

const inputClasses =
  'block py-2.5 px-0 w-[242px] text-sm rounded-none bg-transparent border-b text-gray-400 border-gray-400 focus:outline-none focus:border-blue-500 focus:text-blue-500';

const errorClasses = 'w-[242px] text-red text-xs mt-1';

const Input = ({
  label,
  id,
  type,
  className = '',
  error,
  errorMessage,
  isViewIcon = false,
  onChange,
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
    ${isFocused ? 'text-blue-500' : 'text-gray-400'}
  `;

  return (
    <div className={`relative ${className}`}>
      <input
        type={type === 'password' ? (isHide ? 'password' : 'text') : type} // isHide 상태에 따라 type 변경
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
      {error && errorMessage && <p className={errorClasses}>{errorMessage}</p>}
      {type === 'password' && id === 'password' && !error && hasValue && (
        <p className="w-[242px] text-green-600 text-xs mt-1">
          사용가능한 비밀번호입니다.
        </p>
      )}
      {type === 'password' &&
        id === 'passwordConfirm' &&
        !error &&
        hasValue && (
          <p className="w-[242px] text-green-600 text-xs mt-1">
            비밀번호가 일치합니다.
          </p>
        )}
      {isViewIcon && (
        <button
          type="button"
          className="absolute right-0 top-3"
          onClick={handleToggle}
          aria-label={isHide ? '비밀번호 보기' : '비밀번호 숨기기'}
        >
          <img src={isHide ? VisibleIcon : InvisibleIcon} aria-hidden="true" />
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
};

export default Input;
