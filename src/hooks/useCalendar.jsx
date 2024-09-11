import { FeelingCalendar } from '@/components';
import {
  addDays,
  format,
  getMonth,
  getWeeksInMonth,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

const useCalendar = (
  diaryData,
  selectedMonth = format(new Date(), 'yyyy-MM'),
  selectedMood = '전체'
) => {
  const [currentDate, setCurrentDate] = useState(
    new Date(`${selectedMonth}-01`)
  );

  useEffect(() => {
    if (selectedMonth) {
      setCurrentDate(new Date(`${selectedMonth}-01`));
    }
  }, [selectedMonth]);

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
        const hasDiaryWithDifferentMood =
          dayDiary && dayDiary.mood !== selectedMood && selectedMood !== '전체';

        days.push({
          key: dayIdx,
          component: (
            <td key={dayIdx}>
              <FeelingCalendar
                day={parseInt(format(day, 'd'), 10)}
                mood={dayDiary ? dayDiary.mood : undefined}
                date={formattedDate}
                id={dayDiary ? dayDiary.id : ''}
                hasDiaryWithDifferentMood={hasDiaryWithDifferentMood}
              />
            </td>
          ),
        });
      }

      weeks.push({ key: weekIdx, days });
    }

    return weeks;
  }, [diaryData, firstDayOfCalendar, weeksInMonth, month, selectedMood]);

  return { weekRows, currentDate, setCurrentDate };
};

useCalendar.propTypes = {
  diaryData: PropTypes.array,
  selectedMonth: PropTypes.string,
};

export default useCalendar;
