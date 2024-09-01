import { DirectionLeft } from '@/assets/icons/direction';
import PropTypes from 'prop-types';

const TopHeader = ({ title, isShowIcon = false }) => {
  return (
    <>
      <header className="pt-10 w-full max-w-[27.5rem] flex justify-center items-center text-lg font-semibold relative">
        {isShowIcon && (
          <DirectionLeft
            className="fill-black absolute left-0 cursor-pointer"
            aria-label="뒤로 가기"
          />
        )}
        <p>{title}</p>
      </header>
    </>
  );
};

TopHeader.propTypes = {
  title: PropTypes.string.isRequired,
  isShowIcon: PropTypes.bool,
};

export default TopHeader;
