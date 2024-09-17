import PropTypes from 'prop-types';
import moods from '@/assets/icons/mood/moods';

const MoodDistribution = ({ mood = '행복', ratio = 0, grayscale = false }) => {
  let altText;

  switch (mood) {
    case '행복':
      altText = '행복한 감정';
      break;
    case '슬픔':
      altText = '슬픈 감정';
      break;
    case '나쁨':
      altText = '기분 나쁜 감정';
      break;
    case '기쁨':
      altText = '기분 좋은 감정';
      break;
    case '보통':
      altText = '그저 그런 감정';
      break;
    case '기록 없음':
      altText = '기록 없음';
    default:
      altText = '행복한 감정';
  }

  return (
    <div className={`w-[45px] h-[68px] flex flex-col gap-3 items-center`}>
      <img
        src={moods[mood]}
        alt={altText}
        className={`w-9 h-9 ${grayscale ? 'grayscale' : ''}`}
      />
      <span
        className={`flex justify-center items-center w-[45px] h-5 bg-blue-10 rounded-xl self-stretch text-xs font-medium text-blue-500 text-center ${
          grayscale ? 'grayscale' : ''
        }`}
      >{`${ratio}%`}</span>
    </div>
  );
};

MoodDistribution.propTypes = {
  ratio: PropTypes.number,
  mood: PropTypes.oneOf(['나쁨', '슬픔', '행복', '기쁨', '보통']),
  grayscale: PropTypes.bool,
};

export default MoodDistribution;
