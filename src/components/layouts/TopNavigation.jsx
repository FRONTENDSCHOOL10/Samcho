import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar2,
  Filter,
  List,
  Search,
  Notification,
} from '@/assets/icons/menu';
import { useModal } from '@/hooks';
import { Modal, Select } from '..';

const TopNavigation = ({ selectedMood, setSelectedMood, onToggleView }) => {
  const [isCalendarView, setIsCalendarView] = useState(true);
  const { isOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  const handleToggleIcon = () => {
    setIsCalendarView(!isCalendarView);
    onToggleView();
  };

  const handleFilterConfirm = () => {
    closeModal('filterModal');
  };

  const handleSearchClick = () => {
    navigate('/home/search');
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
          onClick={() => openModal('filterModal')}
        >
          <Filter className=" fill-gray-450" aria-hidden="true" />
        </button>
        <div className="flex gap-4">
          <button
            type="button"
            aria-label="일기 검색"
            onClick={handleSearchClick}
          >
            <Search aria-hidden="true" className=" text-gray-450" />
          </button>
          <Link to={'/home/notification'} title="알림">
            <Notification className=" fill-gray-450" aria-hidden="true" />
          </Link>

          {isCalendarView ? (
            <button
              type="button"
              aria-label="일기 리스트 형식으로 보기"
              onClick={handleToggleIcon}
            >
              <List className="fill-gray-450" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="button"
              aria-label="일기 캘린더 형식으로 보기"
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
            value={selectedMood}
            onChange={(value) => setSelectedMood(value)}
          />
          <div className="flex justify-end">
            <button
              className="px-3 py-1 font-medium text-white bg-blue-500 rounded-md w-fit"
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

export default TopNavigation;
