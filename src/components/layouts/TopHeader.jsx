import { DirectionLeft } from '@/assets/icons/direction';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const TopHeader = ({ title, isShowIcon = false }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="pt-5 w-full max-w-[27.5rem] flex justify-center items-center text-lg font-semibold relative">
      {isShowIcon && (
        <DirectionLeft
          className="absolute left-0 cursor-pointer fill-black"
          aria-label="뒤로 가기"
          onClick={handleBackClick}
        />
      )}
      <h1>{title}</h1>
    </header>
  );
};

TopHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isShowIcon: PropTypes.bool,
};

export default TopHeader;
