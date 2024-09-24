import PropTypes from 'prop-types';

const EmotionRankCard = ({ text, count, rank, image, grayscale = false }) => {
  return (
    <article
      className={`w-full p-3 rounded-lg py bg-blue-10 ${
        grayscale ? 'grayscale' : ''
      }`}
    >
      <h3 className="sr-only">
        {rank}위: {text}
      </h3>
      <p
        className="flex justify-start font-semibold text-blue"
        aria-hidden="true"
      >
        {rank}
      </p>
      <div className="flex flex-col items-center justify-center gap-1">
        <img
          src={image}
          alt={text}
          className="w-[50px] h-[50px] rounded-full object-cover"
          width={50}
          height={50}
        />
        <p className="text-sm font-medium text-blue" aria-hidden="true">
          {text}
        </p>
        <p className="text-xs font-normal text-blue">{count}회</p>
      </div>
    </article>
  );
};

EmotionRankCard.propTypes = {
  text: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  rank: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired, // image 필드 추가
  grayscale: PropTypes.bool,
};

export default EmotionRankCard;
