import { Close, History } from '@/assets/icons/menu';
import PropTypes from 'prop-types';

const SearchDiaryHistoryItem = ({ term }) => {
  return (
    <li className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <History className="w-5 h-5 fill-gray-300" aria-hidden="true" />
        <p className="font-semibold text-gray-450">{term}</p>
      </div>
      <button type="button" aria-label="검색어 기록 삭제">
        <Close className="w-3 h-3 fill-gray-300" aria-hidden="true" />
      </button>
    </li>
  );
};

SearchDiaryHistoryItem.propTypes = {
  term: PropTypes.string.isRequired,
};

export default SearchDiaryHistoryItem;
