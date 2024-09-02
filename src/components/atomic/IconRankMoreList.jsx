import PropTypes from 'prop-types';

const IconRankMoreList = ({ rank = 1, emotion = '감정', count = 0 }) => {
  return (
    <>
      <div
        className="inline-box box-content flex w-[149px] h-10 pl-[5px] py-[6px] items-center gap-[15px]"
        aria-labelledby="rankLabel emotionLabel countLabel"
      >
        <span id="rankLabel" className="text-lg font-bold text-blue-500">
          {rank}
        </span>
        <span className="inline-block w-10 h-10 rounded-full bg-blue-50"></span>
        <div className="flex flex-col gap-[5px] items-start content-center text-blue-500 text-sm font-medium">
          <span id="emotionLabel">{emotion}</span>
          <span id="countLabel">{`${count}회`}</span>
        </div>
      </div>
    </>
  );
};

IconRankMoreList.propTypes = {
  rank: PropTypes.number,
  emotion: PropTypes.string,
  count: PropTypes.number,
};

export default IconRankMoreList;