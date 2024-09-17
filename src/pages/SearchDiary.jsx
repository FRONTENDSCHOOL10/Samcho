import {
  SearchDiaryHistory,
  SearchDiaryInput,
  SearchDiaryResult,
} from '@/components';
import { useFetchAllBuddyData, useFetchAllDiaryData } from '@/hooks';
import { groupByMonth } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchDiary = () => {
  const { diaryData, loading } = useFetchAllDiaryData();
  const { buddyData } = useFetchAllBuddyData();

  const [searchParams, setSearchParams] = useSearchParams();

  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [isSearched, setIsSearched] = useState(false);
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }, [history]);

  const handleAddHistory = (term) => {
    if (term === '') return;
    setHistory((prevHistory) => {
      const updatedHistory = prevHistory.filter((item) => item !== term);

      updatedHistory.unshift(term);

      if (updatedHistory.length > 10) {
        updatedHistory.pop();
      }
      return updatedHistory;
    });
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const handleDeleteHistoryItem = (itemToDelete) => {
    setHistory((prevHistory) =>
      prevHistory.filter((item) => item !== itemToDelete)
    );
  };

  const handleDiarySearch = useCallback(
    (searchTerm) => {
      if (searchTerm && !loading) {
        const result = diaryData.filter((diary) =>
          diary.content.includes(searchTerm)
        );

        const groupedResults = groupByMonth(result);
        setSearchResults(groupedResults);
        setIsSearched(true);
        handleAddHistory(searchTerm);

        setSearchParams({ query: searchTerm });
      } else {
        setSearchResults({});
      }
    },
    [diaryData, loading, setSearchParams]
  );

  useEffect(() => {
    const searchTerm = searchParams.get('query');
    if (searchTerm) {
      setInputValue(searchTerm);

      if (!loading) handleDiarySearch(searchTerm, false);
    }
  }, [searchParams, loading, handleDiarySearch]);

  const handleHistoryItemClick = (historyItem) => {
    setInputValue(historyItem);
    handleDiarySearch(historyItem);
  };

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

export default SearchDiary;
