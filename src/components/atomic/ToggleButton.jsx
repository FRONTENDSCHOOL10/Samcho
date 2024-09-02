import { useState } from 'react';
import PropTypes from 'prop-types';

const ToggleButton = ({ text, onClick, className }) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(prevState => !prevState); 
    if (onClick) {
      onClick(); 
    }
  };

  return (
    <button
      type="button"
      className={`w-[77px] h-[35px] inline-flex items-center justify-center cursor-pointer rounded-full text-sm font-bold whitespace-nowrap ${
        isActive
          ? 'bg-blue-500 text-white shadow-dark'
          : 'bg-white text-blue-500 border border-gray-200'
      } ${className}`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

ToggleButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default ToggleButton;
