import { Close, History } from '@/assets/icons/menu';
import PropTypes from 'prop-types';

const SearchDiaryHistoryItem = ({
  history,
  onDeleteHistoryItem,
  onClickHistoryItem,
}) => {
  return history.map((item, idx) => (
    <li
      key={`${item}-${idx}`}
      className="flex items-center justify-between w-full"
    >
      <div className="flex items-center gap-3">
        <History className="w-5 h-5 fill-gray-300" aria-hidden="true" />
        <button
          type="button"
          onClick={() => onClickHistoryItem(item)}
          className="font-semibold text-gray-450"
        >
          {item}
        </button>
      </div>
      <button
        type="button"
        aria-label="검색어 기록 삭제"
        onClick={() => onDeleteHistoryItem(item)}
      >
        <Close className="w-3 h-3 fill-gray-300" aria-hidden="true" />
      </button>
    </li>
  ));
};

SearchDiaryHistoryItem.propTypes = {
  history: PropTypes.array.isRequired,
  onDeleteHistoryItem: PropTypes.func.isRequired,
  onClickHistoryItem: PropTypes.func.isRequired,
};

export default SearchDiaryHistoryItem;
