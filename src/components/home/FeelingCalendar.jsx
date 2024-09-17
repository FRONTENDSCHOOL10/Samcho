import DayCircle2 from '@/assets/icons/daycircle/daycircle2.svg?react';
import moods from '@/assets/icons/mood/moods';
import { format, isToday } from 'date-fns';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const formatDate = (date) => format(new Date(date), 'yyyy-MM-dd');

const FeelingCalendar = ({
  day,
  mood,
  date,
  id,
  hasDiaryWithDifferentMood,
  loading,
}) => {
  const isCurrentDay = isToday(new Date(date));
  const selectedDate = formatDate(date);
  const currentDate = formatDate(new Date());

  const dayCircleClasses = `fill-blue-50 bg-opacity-5 w-11 h-11 ${
    isCurrentDay ? `text-blue-300 stroke-current stroke-[4px]` : ''
  }`;

  const hasDiaryWithDifferentMoodClasses = `${
    hasDiaryWithDifferentMood
      ? 'flex items-center justify-center w-8 font-semibold text-blue-500 bg-opacity-7 bg-blue-50 rounded-xl'
      : ''
  } ${isCurrentDay ? 'font-semibold text-blue' : ''}`;

  const harumongImgClasses = `w-11 h-11 ${
    isCurrentDay ? 'drop-shadow-[0_0_1px_#4d82be]' : ''
  }`;

  const handleClick = (e) => {
    if (loading) {
      e.preventDefault();
      toast.error('데이터를 불러오는 중입니다. 잠시만 기다려주세요!');
      return;
    }

    if (currentDate < selectedDate) {
      e.preventDefault();
      toast.dismiss();
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
          <img src={moods[mood]} alt={mood} className={harumongImgClasses} />
        ) : (
          <DayCircle2 className={dayCircleClasses} />
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
  loading: PropTypes.bool,
};

export default FeelingCalendar;
