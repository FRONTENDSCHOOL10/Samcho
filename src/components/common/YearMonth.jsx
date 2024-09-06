import PropTypes from 'prop-types';
import { useId } from 'react';

const YearMonth = ({ selectedMonth, setSelectedMonth, className }) => {
  const id = useId();

  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <label htmlFor={id} className="sr-only">
        연도 및 월 선택
      </label>
      <input
        aria-hidden="true"
        className="custom-month-input relative text-base font-semibold text-gray-450 bg-inherit border-b-[1px] border-gray-300 px-[0.625rem] py-[0.3125rem] rounded-none"
        type="month"
        id={id}
        min="1900-01"
        max={selectedMonth}
        value={selectedMonth}
        onChange={handleChange}
      />
    </div>
  );
};

YearMonth.propTypes = {
  selectedMonth: PropTypes.string.isRequired,
  setSelectedMonth: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default YearMonth;
