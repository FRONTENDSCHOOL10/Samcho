import PropTypes from 'prop-types';

const IconRank = ({ text, count, rank, className }) => {
  return (
    <div className={`relative w-24 h-32 px-6 pt-7 pb-5 bg-color-blue-10 rounded-lg flex flex-col justify-end items-center gap-1 inline-flex ${className}`}>
      <div className="absolute w-20 h-4 text-sm font-semibold text-blue-500 top-2 left-2 font-Pretendard">
        {rank}
      </div>
      <div className="w-12 h-12 bg-blue-100 rounded-full" />
      <div className="text-xs font-medium text-blue-500 font-Pretendard">{text}</div>
      <div className="text-xs font-medium text-blue-500 font-Pretendard">{count}회</div>
    </div>
  );
};

IconRank.propTypes = {
  text: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default IconRank;
