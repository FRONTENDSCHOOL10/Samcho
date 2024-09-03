import { FeelingCalendar } from '@/components';
import {
  addDays,
  format,
  getMonth,
  getWeeksInMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { useMemo, useState } from 'react';

const useCalendar = (diaryData) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const month = useMemo(() => getMonth(currentDate), [currentDate]);
  const firstDayOfMonth = useMemo(
    () => startOfMonth(currentDate),
    [currentDate]
  );
  const firstDayOfCalendar = useMemo(
    () => startOfWeek(firstDayOfMonth),
    [firstDayOfMonth]
  );
  const weeksInMonth = useMemo(
    () => getWeeksInMonth(firstDayOfMonth),
    [firstDayOfMonth]
  );

  const weekRows = useMemo(() => {
    const weeks = [];

    for (let weekIdx = 0; weekIdx < weeksInMonth; weekIdx++) {
      const days = [];

      for (let dayIdx = 0; dayIdx < 7; dayIdx++) {
        const day = addDays(firstDayOfCalendar, weekIdx * 7 + dayIdx);

        if (getMonth(day) !== month) {
          days.push({ key: dayIdx, component: <td key={dayIdx}></td> });
          continue;
        }

        const formattedDate = format(day, 'yyyy-MM-dd');
        const dayDiary = diaryData.find(
          (diary) => diary.date === formattedDate
        );

        days.push({
          key: dayIdx,
          component: (
            <td key={dayIdx}>
              <FeelingCalendar
                day={parseInt(format(day, 'd'), 10)}
                isDiaryWritten={!!dayDiary}
                mood={dayDiary ? dayDiary.mood : undefined}
              />
            </td>
          ),
        });
      }

      weeks.push({ key: weekIdx, days });
    }

    return weeks;
  }, [diaryData, firstDayOfCalendar, weeksInMonth, month]);

  return { weekRows, currentDate, setCurrentDate };
};

export default useCalendar;
