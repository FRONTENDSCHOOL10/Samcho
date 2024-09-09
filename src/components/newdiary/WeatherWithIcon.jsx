import PropTypes from 'prop-types';

const WeatherWithIcon = ({ src, text, isSelected, onClick, className }) => {
  return (
    <button
      type="button"
      className={`flex flex-col justify-center items-center gap-1.5 w-full cursor-pointer ${className}`}
      onClick={onClick}
      aria-pressed={isSelected}
    >
      <img
        src={src}
        alt={text}
        className={`rounded-full w-9 h-9 ${
          isSelected ? 'grayscale-0' : 'grayscale'
        }`}
      />
      <span
        className={`text-xs font-medium ${
          isSelected ? 'text-blue-500' : 'text-gray-300'
        }`}
      >
        {text}
      </span>
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
