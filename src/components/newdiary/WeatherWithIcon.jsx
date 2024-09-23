import PropTypes from 'prop-types';

const WeatherWithIcon = ({ src, text, isSelected, onClick, className }) => {
  const buttonClasses = `flex flex-col justify-center items-center gap-1.5 w-full cursor-pointer ${className}`;
  const imageClasses = `rounded-full w-9 h-9 ${
    isSelected ? 'grayscale-0' : 'grayscale'
  }`;

  const spanClasses = `text-xs font-medium ${
    isSelected ? 'text-blue-500' : 'text-gray-300'
  }`;

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      aria-pressed={isSelected}
    >
      <img
        src={src}
        alt={text}
        className={imageClasses}
        width={36}
        height={36}
        loading="lazy"
      />
      <span className={spanClasses}>{text}</span>
    </button>
  );
};

WeatherWithIcon.propTypes = {
  src: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default WeatherWithIcon;
