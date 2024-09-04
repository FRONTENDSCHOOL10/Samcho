import PropTypes from 'prop-types';

const WeatherWithIcon = ({ text, className }) => {
  return (
    <div
      className={`flex flex-col items-center gap-[0.375rem] w-fit ${className}`}
      role="group"
      aria-label={text}
    >
      <div 
        className="h-11 w-11 bg-blue-50 rounded-full" 
        aria-hidden="true" 
      />
      <span 
        className="text-blue text-xs font-medium font-Pretendard break-words"
      >
        {text}
      </span>
    </div>
  );
};

WeatherWithIcon.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default WeatherWithIcon;
