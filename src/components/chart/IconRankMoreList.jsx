import PropTypes from 'prop-types';
import emotions from '@/assets/icons/emotions/emotions';

const IconRankMoreList = ({ rank = 1, emotion = '신나는', count = 0 }) => {
  return (
    <section className="flex w-full p-2 items-center gap-[15px]">
      <h2
        className="w-6 text-lg font-semibold text-left text-blue-500"
        aria-label={`순위 ${rank}위`}
      >
        <span aria-hidden="true">{rank}</span>
      </h2>
      <figure className="flex flex-row gap-[15px] items-start content-center text-blue-500 text-sm font-medium">
        <img
          src={emotions[emotion]}
          className="w-10 h-10"
          alt={emotion}
          width={40}
          height={40}
          loading="lazy"
        />
        <figcaption className="flex flex-col gap-[5px]">
          <span>{emotion}</span>
          <span aria-label="이 감정이 기록된 횟수">{`${count}회`}</span>
        </figcaption>
      </figure>
    </section>
  );
};

IconRankMoreList.propTypes = {
  rank: PropTypes.number,
  emotion: PropTypes.string,
  count: PropTypes.number,
};

export default IconRankMoreList;
