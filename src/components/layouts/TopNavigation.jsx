import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Calendar2,
  Filter,
  List,
  Search,
  Notification,
} from '@/assets/icons/menu';
import { useModal } from '@/hooks';
import { Modal } from '..';

const TopNavigation = ({ onToggleView }) => {
  const [isCalendarView, setIsCalendarView] = useState(true);

  const { isOpen, openModal, closeModal } = useModal();

  const handleToggleIcon = () => {
    setIsCalendarView(!isCalendarView);
    onToggleView();
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
        <div className="flex gap-[10px]">
          <button
            type="button"
            aria-label="검색"
            onClick={() => openModal('searchModal')}
          >
            <Search aria-hidden="true" />
          </button>
          <Link to={'/notification'} title="알림">
            <Notification className=" fill-gray-450" aria-hidden="true" />
          </Link>

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

      <Modal
        isOpen={isOpen('filterModal')}
        closeModal={() => closeModal('filterModal')}
      >
        <h2 className="mb-4 text-xl font-bold">기분 필터링 검색</h2>
        <p className="mb-4">모달 바디</p>
      </Modal>

      <Modal
        isOpen={isOpen('searchModal')}
        closeModal={() => closeModal('searchModal')}
      >
        <h2 className="mb-4 text-xl font-bold">일기 검색</h2>
        <p className="mb-4">모달 바디</p>
      </Modal>
    </>
  );
};

TopNavigation.propTypes = {
  onToggleView: PropTypes.func,
};

export default TopNavigation;
