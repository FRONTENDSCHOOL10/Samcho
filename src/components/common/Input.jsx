import PropTypes from 'prop-types';
import { useState } from 'react';

const inputClasses =
  'block py-2.5 px-0 w-[242px] text-sm rounded-none bg-transparent border-b text-gray-400 border-gray-400 focus:outline-none focus:border-blue-500 focus:text-blue-500';

const errorClasses = 'text-red text-xs mt-1';

const Input = ({
  label,
  id,
  type,
  className = '',
  error,
  errorMessage,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = ({ target: { value } }) => {
    setIsFocused(false);
    setHasValue(Boolean(value));
  };
  const handleChange = ({ target: { value } }) => {
    setHasValue(Boolean(value));
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
        type={type}
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
};

export default Input;
