import DayCircle from '@/assets/icons/daycircle/daycircle.svg?react';
import moods from '@/assets/icons/mood/moods';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const FeelingCalendar = ({ day, mood, date }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/diary/${date}`);
  };

  return (
    <div className="flex items-center flex-col gap-[7px]">
      {mood ? (
        <button onClick={handleClick} type="button">
          <img
            src={moods[mood]}
            alt={mood}
            className="w-[44px] h-[44px] cursor-pointer"
          />
        </button>
      ) : (
        // 추후 일기 해당 날짜 일기 작성으로 이동
        <DayCircle className="fill-blue-50 w-[44px] h-[44px]" />
      )}
      <span>{day}</span>
    </div>
  );
};

FeelingCalendar.propTypes = {
  day: PropTypes.number.isRequired,
  mood: PropTypes.string,
  date: PropTypes.string.isRequired,
};

export default FeelingCalendar;
