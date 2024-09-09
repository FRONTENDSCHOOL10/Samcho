import { SearchDiaryHistoryItem } from '..';

const SearchDiaryHistory = () => {
  return (
    <section>
      <div className="flex items-center justify-between w-full my-5">
        <h2 className="font-bold text-gray-450">검색 기록</h2>
        <button
          type="button"
          className="text-sm font-medium text-gray-400"
          aria-label="기록 전체 삭제"
        >
          전체 삭제
        </button>
      </div>
      <ul className="flex flex-col gap-5 px-3">
        <SearchDiaryHistoryItem term="이야이야호" />
        <SearchDiaryHistoryItem term="우왕" />
        <SearchDiaryHistoryItem term="지두팔" />
        <SearchDiaryHistoryItem term="고기맛있당" />
      </ul>
    </section>
  );
};

export default SearchDiaryHistory;
