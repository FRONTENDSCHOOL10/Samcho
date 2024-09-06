import PropTypes from 'prop-types';

const YearMonth = ({ selectedMonth, setSelectedMonth, className }) => {
  const handleChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <label htmlFor="monthType" className="sr-only">
        월 선택
      </label>
      <input
        className="custom-month-input relative text-base font-semibold text-gray-450 bg-inherit border-b-[1px] border-gray-300 px-[0.625rem] py-[0.3125rem] rounded-none"
        type="month"
        name="monthType"
        id="monthType"
        min="1900-01"
        max={selectedMonth}
        value={selectedMonth}
        onChange={handleChange}
      />
    </div>
  );
};

YearMonth.propTypes = {
  selectedMonth: PropTypes.string,
  setSelectedMonth: PropTypes.func,
  className: PropTypes.string,
};

export default YearMonth;
