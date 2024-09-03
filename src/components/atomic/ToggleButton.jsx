import PropTypes from 'prop-types';

const ToggleButton = ({ text, onClick, className }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      type="button"
      className={`rounded-[15px] text-sm px-3 py-1.5 border ${className}`}
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
