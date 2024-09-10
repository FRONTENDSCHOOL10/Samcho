import PropTypes from 'prop-types';
import { SearchDiaryHistoryItem } from '..';

const SearchDiaryHistory = ({ history, clearHistory }) => {
  return (
    <section aria-labelledby="search-history-title">
      <div className="flex items-center justify-between w-full my-5">
        <h2 id="search-history-title" className="font-bold text-gray-450">
          검색 기록
        </h2>
        {history.length > 0 && (
          <button
            type="button"
            className="text-sm font-medium text-gray-400"
            aria-label="기록 전체 삭제"
            onClick={clearHistory}
          >
            전체 삭제
          </button>
        )}
      </div>

      {history.length > 0 ? (
        <ul className="flex flex-col gap-5 px-3">
          <SearchDiaryHistoryItem key={history} history={history} />
        </ul>
      ) : (
        <p className="mt-10 font-normal text-center text-gray-300">
          검색 기록이 없어요.
        </p>
      )}
    </section>
  );
};

SearchDiaryHistory.propTypes = {
  history: PropTypes.arrayOf(PropTypes.string).isRequired,
  clearHistory: PropTypes.func.isRequired,
};

export default SearchDiaryHistory;
