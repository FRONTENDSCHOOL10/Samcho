import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const sizes = {
  small: 'max-w-[110px] h-[55px] px-5 py-[18px]',
  large: 'w-full h-[55px] px-[126px] py-2',
};

const types = {
  primary: 'bg-blue text-white ',
  secondary: 'bg-white text-blue ',
  disabled: 'bg-gray-200 text-gray-400 cursor-not-allowed',
  red: 'bg-white text-red',
};

const baseClasses =
  'rounded-xl font-bold flex justify-center items-center shadow-light';

const Button = ({
  text = '레이블',
  size = 'small',
  type = 'primary',
  className = '',
  to,
  ...props
}) => {
  let typeClasses = types[type];
  let sizeClasses = sizes[size];
  const combinedClasses = `${baseClasses} ${sizeClasses} ${typeClasses} ${className}`;

  if (to) {
    return (
      <Link
        to={to}
        role="button"
        aria-disabled={type === 'disabled'}
        className={combinedClasses}
        {...props}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      disabled={type === 'disabled'}
      className={combinedClasses}
      {...props}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string,
  size: PropTypes.oneOf(['small', 'large']),
  type: PropTypes.oneOf(['primary', 'secondary', 'disabled', 'red']),
  to: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
