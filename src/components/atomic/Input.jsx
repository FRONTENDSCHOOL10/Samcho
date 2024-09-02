import PropTypes from 'prop-types';
import { useState } from 'react';

const Input = ({ label, id, type, className = '' }) => {
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

  const inputClasses = `
    block py-2.5 px-0 w-[242px] text-sm rounded-none bg-transparent border-b-[1px]
    text-gray-400 border-gray-400 focus:outline-none focus:border-blue-500 focus:text-blue-500
  `;

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
        className={inputClasses}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
      />
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['email', 'password', 'text', 'number']).isRequired,
  id: PropTypes.string.isRequired,
};

export default Input;
