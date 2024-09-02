import { Calendar2, Filter, List, Search } from '@/assets/icons/menu';
import { useState } from 'react';

const TopNavigation = () => {
  const [isCalendarView, setIsCalendarView] = useState(true);

  const handleToggleIcon = () => {
    setIsCalendarView(!isCalendarView);
  };

  return (
    <header className="pt-5 w-full max-w-[27.5rem]">
      <nav className="flex justify-between w-full">
        <Filter className="cursor-pointer fill-gray-450" />
        <div className="flex gap-5">
          <Search className="cursor-pointer" />

          {isCalendarView ? (
            <List
              className="cursor-pointer fill-gray-450"
              onClick={handleToggleIcon}
            />
          ) : (
            <Calendar2
              className="cursor-pointer fill-gray-450"
              onClick={handleToggleIcon}
            />
          )}
        </div>
      </nav>
    </header>
  );
};

export default TopNavigation;
