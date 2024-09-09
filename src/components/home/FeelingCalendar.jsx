import DayCircle from '@/assets/icons/daycircle/daycircle.svg?react';
import moods from '@/assets/icons/mood/moods';
import { isFuture } from 'date-fns';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const FeelingCalendar = ({ day, mood, id, date }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const selectedDate = new Date(date);

    if (isFuture(selectedDate)) {
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
      <button onClick={handleClick} type="button">
        {mood ? (
          <img
            src={moods[mood]}
            alt={mood}
            className="w-[44px] h-[44px] cursor-pointer"
          />
        ) : (
          // 추후 일기 해당 날짜 일기 작성으로 이동
          <DayCircle className="fill-blue-50 w-[44px] h-[44px] cursor-pointer" />
        )}
      </button>
      <span>{day}</span>
      <Toaster />
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
