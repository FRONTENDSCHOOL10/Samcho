import { useCalendar } from '@/hooks';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import FeelingCalendar from './FeelingCalendar';

const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = ({
  diaryData = [],
  selectedMonth = format(new Date(), 'yyyy-MM'),
  selectedMood,
  loading,
}) => {
  const { weekRows } = useCalendar(
    diaryData,
    selectedMonth,
    selectedMood,
    loading
  );

  return (
    <table className="w-full border-separate border-spacing-y-5 border-spacing-x-0">
      <caption className="sr-only">일기 달력</caption>
      <thead>
        <tr>
          {WEEKS.map((day, idx) => (
            <th key={idx} className="font-medium">
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {weekRows.map((week) => (
          <tr key={week.key}>
            {week.days.map((day) => (
              <td key={day.key}>
                {day.isCurrentMonth ? (
                  <FeelingCalendar
                    day={parseInt(format(day.day, 'd'), 10)}
                    mood={day.mood}
                    date={day.date}
                    id={day.id}
                    hasDiaryWithDifferentMood={day.hasDiaryWithDifferentMood}
                    loading={loading}
                  />
                ) : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Calendar.propTypes = {
  diaryData: PropTypes.array,
  selectedMonth: PropTypes.string,
  selectedMood: PropTypes.string,
  loading: PropTypes.bool,
};

export default Calendar;
