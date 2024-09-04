import { useState } from 'react';
import PropTypes from 'prop-types';
import { Calendar2, Filter, List, Search } from '@/assets/icons/menu';

const TopNavigation = ({ onToggleView }) => {
  const [isCalendarView, setIsCalendarView] = useState(true);

  const handleToggleIcon = () => {
    setIsCalendarView(!isCalendarView);
    onToggleView();
  };

  return (
    <header className="pt-5 w-full max-w-[27.5rem]">
      <nav
        className="flex justify-between w-full"
        aria-label="일기 필터 및 검색 메뉴"
      >
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

TopNavigation.propTypes = {
  onToggleView: PropTypes.func,
};

export default TopNavigation;
