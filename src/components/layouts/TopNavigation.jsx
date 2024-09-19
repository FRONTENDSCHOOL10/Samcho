import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Calendar2,
  Filter,
  List,
  Search,
  Notification,
} from '@/assets/icons/menu';
import { useModal, useNotification } from '@/hooks';
import { Modal, Select } from '..';
import useNotificationStore from '@/stores/notificationStore';

const TopNavigation = ({ selectedMood, setSelectedMood, onToggleView }) => {
  const [isCalendarView, setIsCalendarView] = useState(true);
  const [tempMoodFilter, setTempMoodFilter] = useState(selectedMood);
  const { isOpen, openModal, closeModal } = useModal();
  const unreadCount = useNotificationStore((state) => state.unreadCount);

  useNotification();

  const handleToggleIcon = () => {
    setIsCalendarView(!isCalendarView);
    onToggleView();
  };

  const handleFilterConfirm = () => {
    setSelectedMood(tempMoodFilter);
    closeModal('filterModal');
  };

  return (
    <>
      <nav
        className="flex justify-between w-full pt-5"
        aria-label="일기 필터 및 검색 메뉴"
      >
        <button
          type="button"
          aria-label="일기 필터"
          title="일기 필터"
          onClick={() => openModal('filterModal')}
        >
          <Filter className=" fill-gray-450" aria-hidden="true" />
        </button>
        <div className="flex gap-4">
          <Link to="/home/search" aria-label="일기 검색" title="일기 검색">
            <Search aria-hidden="true" className=" text-gray-450" />
          </Link>
          <Link to={'/home/notification'} title="알림">
            <div className="relative">
              <Notification className=" fill-gray-450" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white rounded-full -right-1 -top-1 bg-red">
                  {unreadCount}
                </span>
              )}
            </div>
          </Link>

          {isCalendarView ? (
            <button
              type="button"
              aria-label="일기 리스트 형식으로 보기"
              title="리스트 형식"
              onClick={handleToggleIcon}
            >
              <List className="fill-gray-450" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              aria-label="일기 캘린더 형식으로 보기"
              title="캘린더 형식"
              onClick={handleToggleIcon}
            >
              <Calendar2 className="fill-gray-450" aria-hidden="true" />
            </button>
          )}
        </div>
      </nav>

      <Modal
        isOpen={isOpen('filterModal')}
        closeModal={() => closeModal('filterModal')}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-500">
            기분 필터링 검색
          </h2>
          <Select
            options={['전체', '행복', '기쁨', '보통', '나쁨', '슬픔']}
            value={tempMoodFilter}
            onChange={(value) => setTempMoodFilter(value)}
          />
          <div className="flex justify-end">
            <button
              className="w-full py-1 font-medium text-white bg-blue-500 rounded-md"
              onClick={handleFilterConfirm}
              type="button"
            >
              적용
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

TopNavigation.propTypes = {
  onToggleView: PropTypes.func,
  selectedMood: PropTypes.string,
  setSelectedMood: PropTypes.func,
};

export default memo(TopNavigation);
