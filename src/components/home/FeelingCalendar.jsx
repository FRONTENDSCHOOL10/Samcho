import DayCircle from '@/assets/icons/daycircle/daycircle.svg?react';
import moods from '@/assets/icons/mood/moods';
import { isFuture } from 'date-fns';
import PropTypes from 'prop-types';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const FeelingCalendar = ({ day, mood, id, date }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    const selectedDate = new Date(date);

    if (isFuture(selectedDate)) {
      e.preventDefault();
      toast.error('미래의 일기는 아직 기록할 수 없어요!');
      return;
    }

    if (id) {
      navigate(`/diary/detail/${id}`);
    } else {
      navigate(`/diary/new`, { state: { date } });
    }
  };

  return (
    <div className="flex items-center flex-col gap-[7px]">
      <Link
        to={id ? `/diary/detail/${id}` : `/diary/new`}
        onClick={handleClick}
        state={id ? null : { date }}
      >
        {mood ? (
          <img
            src={moods[mood]}
            alt={mood}
            className="w-[44px] h-[44px] cursor-pointer"
          />
        ) : (
          <DayCircle className="fill-blue-50 w-[44px] h-[44px] cursor-pointer" />
        )}
      </Link>
      <span>{day}</span>
    </div>
  );
};

FeelingCalendar.propTypes = {
  day: PropTypes.number.isRequired,
  mood: PropTypes.string,
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default FeelingCalendar;
