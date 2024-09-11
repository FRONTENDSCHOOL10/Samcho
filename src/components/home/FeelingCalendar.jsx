import DayCircle from '@/assets/icons/daycircle/daycircle.svg?react';
import moods from '@/assets/icons/mood/moods';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const FeelingCalendar = ({
  day,
  mood,
  date,
  id,
  hasDiaryWithDifferentMood,
}) => {
  const hasDiaryWithDifferentMoodClasses = `${
    hasDiaryWithDifferentMood
      ? 'text-blue-500 font-semibold w-8 bg-opacity-7 flex justify-center items-center bg-blue-50 rounded-xl'
      : ''
  }`;

  const handleClick = (e) => {
    const selectedDate = format(new Date(date), 'yyyy-MM-dd');
    const currentDate = format(new Date(), 'yyyy-MM-dd');

    if (currentDate < selectedDate) {
      e.preventDefault();
      toast.error('미래의 일기는 아직 기록할 수 없어요!');
      return;
    }
  };

  return (
    <div className="flex items-center flex-col gap-[7px]">
      <Link
        to={id ? `/diary/detail/${id}` : `/diary/new`}
        onClick={handleClick}
        state={id ? null : { date }}
      >
        {mood && !hasDiaryWithDifferentMood ? (
          <img src={moods[mood]} alt={mood} className="w-[44px] h-[44px]" />
        ) : (
          <DayCircle className="fill-blue-50 bg-opacity-5 w-[44px] h-[44px]" />
        )}
      </Link>
      <span className={hasDiaryWithDifferentMoodClasses}>{day}</span>
    </div>
  );
};

FeelingCalendar.propTypes = {
  day: PropTypes.number,
  mood: PropTypes.string,
  id: PropTypes.string,
  date: PropTypes.string,
  hasDiaryWithDifferentMood: PropTypes.bool,
};

export default FeelingCalendar;
