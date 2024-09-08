import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Select = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full">
      <button
        onClick={toggleDropdown}
        className="flex flex-row justify-between w-full px-3 py-2 border border-gray-200 rounded-md flex-nowrap"
      >
        <span
          className={`self-center text-sm leading-[0.75rem] font-semibold ${
            value && 'text-blue-500'
          }`}
        >
          {value}
        </span>
        <span className="flex items-center">
          {isOpen ? (
            <FaChevronUp size={16} color="#555555" />
          ) : (
            <FaChevronDown size={16} color="#555555" />
          )}
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full py-1 overflow-auto bg-white border border-gray-200 rounded-md max-h-60">
          {options.map((option) => (
            <li
              key={option}
              onClick={() => handleSelect(option)}
              className={`cursor-pointer select-none relative text-sm px-3 py-2 ${
                value === option ? 'text-blue font-semibold' : 'text-gray-300'
              } hover:bg-gray-100`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Select;
