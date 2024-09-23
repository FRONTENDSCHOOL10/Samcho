import React, { useMemo, useCallback } from 'react';
import { format, isToday } from 'date-fns';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import DayCircle from '@/assets/icons/daycircle/daycircle.svg?react';
import moods from '@/assets/icons/mood/moods';

const formatDate = (date) => format(new Date(date), 'yyyy-MM-dd');
const currentDate = formatDate(new Date());

const FeelingCalendar = React.memo(
  ({ day, mood, date, id, hasDiaryWithDifferentMood }) => {
    const selectedDate = useMemo(() => formatDate(date), [date]);
    const isCurrentDay = useMemo(() => isToday(new Date(date)), [date]);

    const dayCircleClasses = useMemo(
      () =>
        `fill-blue-50 bg-opacity-5 w-11 h-11 ${
          isCurrentDay ? 'text-blue-300 stroke-current stroke-[4px]' : ''
        }`,
      [isCurrentDay]
    );

    const hasDiaryWithDifferentMoodClasses = useMemo(
      () =>
        `${
          hasDiaryWithDifferentMood
            ? 'flex items-center justify-center w-8 font-semibold text-blue-500 bg-opacity-7 bg-blue-50 rounded-xl'
            : ''
        } ${isCurrentDay ? 'font-semibold text-blue' : ''}`,
      [hasDiaryWithDifferentMood, isCurrentDay]
    );

    const harumongImgClasses = useMemo(
      () => `w-11 h-11 ${isCurrentDay ? 'drop-shadow-[0_0_1px_#4d82be]' : ''}`,
      [isCurrentDay]
    );

    const handleClick = useCallback(
      (e) => {
        if (currentDate < selectedDate) {
          e.preventDefault();
          toast.remove();
          toast.error('미래의 일기는 아직 기록할 수 없어요!', {
            duration: 1500,
          });
        }
      },
      [selectedDate]
    );

    return (
      <div className="flex items-center flex-col gap-[7px]">
        <Link
          to={id ? `/diary/detail/${id}` : '/diary/new'}
          onClick={handleClick}
          state={id ? null : { date }}
        >
          {mood && !hasDiaryWithDifferentMood ? (
            <img
              src={moods[mood]}
              alt={mood}
              className={harumongImgClasses}
              width={44}
              height={44}
              loading="lazy"
            />
          ) : (
            <DayCircle className={dayCircleClasses} />
          )}
        </Link>
        <span className={hasDiaryWithDifferentMoodClasses}>{day}</span>
      </div>
    );
  }
);

FeelingCalendar.propTypes = {
  day: PropTypes.number,
  mood: PropTypes.string,
  id: PropTypes.string,
  date: PropTypes.string,
  hasDiaryWithDifferentMood: PropTypes.bool,
};

FeelingCalendar.displayName = 'FeelingCalendar';

export default FeelingCalendar;
