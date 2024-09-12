import { DirectionLeft } from '@/assets/icons/direction';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

const TopHeader = ({ title, isShowIcon = false, onBackClick }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <header className="pt-5 w-full max-w-[27.5rem] flex justify-center items-center text-lg font-semibold relative">
      {isShowIcon && (
        <button
          type="button"
          className="absolute left-0"
          aria-label="뒤로 가기"
          onClick={handleBackClick}
        >
          <DirectionLeft className="fill-black" aria-hidden="true" />
        </button>
      )}
      <h1 className="text-lg">{title}</h1>
    </header>
  );
};

TopHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isShowIcon: PropTypes.bool,
  onBackClick: PropTypes.func,
};

export default memo(TopHeader);
