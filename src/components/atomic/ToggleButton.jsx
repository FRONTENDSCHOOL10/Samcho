import { useState } from 'react';
import PropTypes from 'prop-types';

const ToggleButton = ({ text, onClick, className, style }) => {
  const [isActive, setIsActive] = useState(false);

 
  const handleClick = () => {
    setIsActive(prevState => !prevState); 
    if (onClick) {
      onClick(); 
    }
  };

 
  const defaultStyle = {
    width: 77,
    height: 35,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 9,
    paddingBottom: 9,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    borderRadius: 50,
    background: isActive ? '#4D82BE' : 'white',
    border: isActive ? 'none' : '1px solid #D9D9D9',
    boxShadow: isActive ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
    ...style 
  };

  return (
    <div
      className={className}
      style={defaultStyle}
      onClick={handleClick}
    >
      <div
        style={{
          color: isActive ? 'white' : '#4D82BE',
          fontSize: 14,
          fontFamily: 'Pretendard',
          fontWeight: '700',
          lineHeight: '35px', 
          textAlign: 'center', 
          whiteSpace: 'nowrap', 
        }}
      >
        {text}
      </div>
    </div>
  );
};

ToggleButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ToggleButton;
