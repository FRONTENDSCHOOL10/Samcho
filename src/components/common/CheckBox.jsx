import PropTypes from 'prop-types';
import { useId, memo } from 'react';
import { FaRegCheckCircle, FaCheckCircle } from 'react-icons/fa';

const CheckBox = ({ label, checked, onChange }) => {
  const id = useId();

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="hidden"
        aria-checked={checked}
      />
      <label htmlFor={id} className="flex items-center cursor-pointer">
        {checked ? (
          <FaCheckCircle className="w-5 h-5 text-blue-500" />
        ) : (
          <FaRegCheckCircle className="w-5 h-5 text-gray-300" />
        )}
        <span className="ml-2 text-lg">{label}</span>
      </label>
    </div>
  );
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default memo(CheckBox);
