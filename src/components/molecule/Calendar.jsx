import { useCalendar } from '@/hooks';

const WEEKS = ['일', '월', '화', '수', '목', '금', '토'];

// 임시 데이터 (DB 연결 시 삭제할 것)
const diaryData = [
  { date: '2024-08-01', isDiaryWritten: true, mood: 'happy' },
  { date: '2024-08-31', isDiaryWritten: true, mood: 'soso' },
  { date: '2024-09-01', isDiaryWritten: true, mood: 'sad' },
  { date: '2024-09-11', isDiaryWritten: true, mood: 'bad' },
  { date: '2024-09-16', isDiaryWritten: true, mood: 'soso' },
  { date: '2024-09-18', isDiaryWritten: true, mood: 'smile' },
  { date: '2024-09-21', isDiaryWritten: true, mood: 'sad' },
  { date: '2024-09-25', isDiaryWritten: true, mood: 'smile' },
  { date: '2024-09-26', isDiaryWritten: true, mood: 'smile' },
  { date: '2024-09-30', isDiaryWritten: true, mood: 'bad' },
];

const Calendar = () => {
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

export default Calendar;
