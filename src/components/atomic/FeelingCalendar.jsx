import DayCircle from '@/assets/icons/daycircle/daycircle.svg?react';
import moodIcons from '@/assets/icons/mood/moodIcons';
import PropTypes from 'prop-types';

const FeelingCalendar = ({ day, isDiaryWritten = false, mood }) => {
  return (
    <div className="flex items-center flex-col gap-[7px]">
      {isDiaryWritten ? (
        <img
          src={moodIcons[mood]}
          alt="감정 아이콘"
          className="w-[44px] h-[44px]"
        />
      ) : (
        <DayCircle className="fill-blue-50 w-[44px] h-[44px]" />
      )}
      <span>{day}</span>
    </div>
  );
};

FeelingCalendar.propTypes = {
  day: PropTypes.number.isRequired,
  isDiaryWritten: PropTypes.bool,
  mood: PropTypes.string,
};

export default FeelingCalendar;
