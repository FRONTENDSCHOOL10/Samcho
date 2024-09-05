import { useCalendar } from '@/hooks';
import PropTypes from 'prop-types';

const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

const Calendar = ({ diaryData = [] }) => {
  const { weekRows } = useCalendar(diaryData);

  return (
    <table className="w-full border-separate border-spacing-y-8 border-spacing-x-0">
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
          <tr key={week.key}>{week.days.map((day) => day.component)}</tr>
        ))}
      </tbody>
    </table>
  );
};

Calendar.propTypes = {
  diaryData: PropTypes.array,
};

export default Calendar;
