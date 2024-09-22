import {
  SearchDiaryHistory,
  SearchDiaryInput,
  SearchDiaryResult,
} from '@/components';
import { useSearchDiary } from '@/hooks';

export const Component = () => {
  const {
    inputValue,
    setInputValue,
    searchResults,
    setSearchResults,
    isSearched,
    setIsSearched,
    history,
    handleClearHistory,
    handleDeleteHistoryItem,
    handleDiarySearch,
    handleHistoryItemClick,
    buddyData,
  } = useSearchDiary();

  return (
    <section className="pb-[60px]">
      <h1 className="sr-only">한줄 일기 검색</h1>
      <SearchDiaryInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        onDiarySearch={handleDiarySearch}
        setIsSearched={setIsSearched}
        setSearchResults={setSearchResults}
      />
      {inputValue === '' && (
        <SearchDiaryHistory
          history={history}
          onClearHistory={handleClearHistory}
          onDeleteHistoryItem={handleDeleteHistoryItem}
          onClickHistoryItem={handleHistoryItemClick}
        />
      )}
      <SearchDiaryResult
        buddyData={buddyData}
        inputValue={inputValue}
        searchResults={searchResults}
        isSearched={isSearched}
      />
    </section>
  );
};
