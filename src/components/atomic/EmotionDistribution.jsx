import PropTypes from 'prop-types';
import {
  BadMong,
  SadMong,
  HappyMong,
  SmileMong,
  SosoMong,
} from '@/assets/icons/mood';

const EmotionDistribution = ({ mood = 'happy', ratio = 0 }) => {
  const moods = {
    bad: BadMong,
    sad: SadMong,
    happy: HappyMong,
    smile: SmileMong,
    soso: SosoMong,
  };

  let altText;

  switch (mood) {
    case 'happy':
      altText = '행복한 감정';
      break;
    case 'sad':
      altText = '슬픈 감정';
      break;
    case 'bad':
      altText = '기분 나쁜 감정';
      break;
    case 'smile':
      altText = '기분 좋은 감정';
      break;
    case 'soso':
      altText = '그저 그런 감정';
      break;
    default:
      altText = '행복한 감정';
  }

  const containerClasses = `w-[45px] h-[68px] flex flex-col gap-3 items-center`;
  const imgClasses = `w-[36px] h-[36px]`;
  const ratioClasses = `flex justify-center items-center w-[45px] h-[20px] bg-blue-10 rounded-xl self-stretch text-xs font-medium text-blue-500 text-center`;

  return (
    <div className={containerClasses}>
      <img src={moods[mood]} alt={altText} className={imgClasses}></img>
      <span className={ratioClasses}>{`${ratio}%`}</span>
    </div>
  );
};

EmotionDistribution.propTypes = {
  ratio: PropTypes.number,
  mood: PropTypes.oneOf(['bad', 'sad', 'happy', 'smile', 'soso']),
};

export default EmotionDistribution;
