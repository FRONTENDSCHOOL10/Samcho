import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Calendar2,
  Filter,
  List,
  Search,
  Notification,
} from '@/assets/icons/menu';

const TopNavigation = ({ onToggleView }) => {
  const [isCalendarView, setIsCalendarView] = useState(true);

  const handleToggleIcon = () => {
    setIsCalendarView(!isCalendarView);
    onToggleView();
  };

  return (
    <nav
      className="flex justify-between w-full pt-5"
      aria-label="일기 필터 및 검색 메뉴"
    >
      <button type="button" aria-label="일기 필터">
        <Filter className=" fill-gray-450" aria-hidden="true" />
      </button>
      <div className="flex gap-[10px]">
        <button type="button" aria-label="검색">
          <Search aria-hidden="true" />
        </button>
        <button type="button" aria-label="알림">
          <Notification className=" fill-gray-450" aria-hidden="true" />
        </button>

        {isCalendarView ? (
          <button
            type="button"
            aria-label="일기 리스트 보기"
            onClick={handleToggleIcon}
          >
            <List className="fill-gray-450" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            aria-label="캘린더 보기"
            onClick={handleToggleIcon}
          >
            <Calendar2 className="fill-gray-450" aria-hidden="true" />
          </button>
        )}
      </div>
    </nav>
  );
};

TopNavigation.propTypes = {
  onToggleView: PropTypes.func,
};

export default TopNavigation;
