import { DirectionLeft } from '@/assets/icons/direction';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const TopHeader = ({ title, subTitle = '', isShowIcon = false }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
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
      <div className="flex flex-col">
        <h1 className="text-lg text-center">{title}</h1>
        <p className="text-sm font-medium text-gray-300">{subTitle}</p>
      </div>
    </header>
  );
};

TopHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  isShowIcon: PropTypes.bool,
};

export default memo(TopHeader);
