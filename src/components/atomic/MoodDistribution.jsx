import PropTypes from 'prop-types';
import moodIcons from '@/assets/icons/mood/moodIcons';

const MoodDistribution = ({ mood = 'happy', ratio = 0 }) => {
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

  return (
    <div className={`w-[45px] h-[68px] flex flex-col gap-3 items-center`}>
      <img src={moodIcons[mood]} alt={altText} className={`w-9 h-9`} />
      <span
        className={`flex justify-center items-center w-[45px] h-5 bg-blue-10 rounded-xl self-stretch text-xs font-medium text-blue-500 text-center`}
      >{`${ratio}%`}</span>
    </div>
  );
};

MoodDistribution.propTypes = {
  ratio: PropTypes.number,
  mood: PropTypes.oneOf(['bad', 'sad', 'happy', 'smile', 'soso']),
};

export default MoodDistribution;
