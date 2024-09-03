import PropTypes from 'prop-types';

const IconRankMoreList = ({ rank = 1, emotion = '감정', count = 0 }) => {
  return (
    <div
      className="flex w-full p-2 items-center gap-[15px]"
      aria-labelledby="rankLabel emotionLabel countLabel"
    >
      <span
        id="rankLabel"
        className="w-6 text-lg font-semibold text-left text-blue-500"
      >
        {rank}
      </span>
      <span className="inline-block w-10 h-10 rounded-full bg-blue-50"></span>
      <div className="flex flex-col gap-[5px] items-start content-center text-blue-500 text-sm font-medium">
        <span id="emotionLabel">{emotion}</span>
        <span id="countLabel">{`${count}회`}</span>
      </div>
    </div>
  );
};

IconRankMoreList.propTypes = {
  rank: PropTypes.number,
  emotion: PropTypes.string,
  count: PropTypes.number,
};

export default IconRankMoreList;
