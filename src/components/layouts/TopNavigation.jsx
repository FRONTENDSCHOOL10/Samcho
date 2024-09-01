import { Calendar2, Filter, List, Search } from '@/assets/icons/menu';
import { useState } from 'react';

const TopNavigation = () => {
  const [isCalendarview, setIsCalendarView] = useState(true);

  const handleToggleIcon = () => {
    setIsCalendarView(!isCalendarview);
  };

  return (
    <header className="py-10 w-full max-w-[27.5rem]">
      <nav className="flex w-full justify-between">
        <Filter className="cursor-pointer fill-gray-450" />
        <div className="flex gap-5">
          <Search className="cursor-pointer" />

          {isCalendarview ? (
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
