import PropTypes from 'prop-types';

const WeatherWithIcon = ({ text, className }) => {
  return (
    <div
      className={`flex flex-col items-center justify-start gap-1.5 ${className}`}
    >
      <div
        className="h-11 w-11 bg-[#D3E0EF] rounded-full mb-2"
      />
      <div
        className="text-[#4D82BE] text-xs font-medium font-Pretendard break-words"
      >
        {text}
      </div>
    </div>
  );
};

WeatherWithIcon.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default WeatherWithIcon;
