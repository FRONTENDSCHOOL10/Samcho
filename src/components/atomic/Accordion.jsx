import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import 'tailwindcss/tailwind.css';

const Accordion = ({ title, children, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <details
      className="px-5 py-[0.9375rem] bg-white rounded-[0.9375rem] shadow-light"
      open={isOpen}
    >
      <summary
        className="flex items-center justify-between cursor-pointer"
        onClick={handleToggle}
      >
        <h2 className="text-base font-semibold text-gray-450">{title}</h2>
        {isOpen ? (
          <FaChevronUp color="#555555" />
        ) : (
          <FaChevronDown color="#555555" />
        )}
      </summary>
      {isOpen && <div className={`mt-3 ${className}`}>{children}</div>}
    </details>
  );
};

Accordion.propTypes = {
  title: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Accordion;
