import { useFetchAllBuddyData, useFetchAllDiaryData } from '@/hooks';
import { authUtils, groupByMonth } from '@/utils';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useSearchDiary = () => {
  const { user } = authUtils.getAuth();
  const userId = user.id;

  const { diaryData, loading } = useFetchAllDiaryData();
  const { buddyData } = useFetchAllBuddyData();

  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [isSearched, setIsSearched] = useState(false);
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem(`searchHistory_${userId}`);
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem(`searchHistory_${userId}`, JSON.stringify(history));
  }, [history, userId]);

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
    localStorage.removeItem(`searchHistory_${userId}`);
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

  return {
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
  };
};

export default useSearchDiary;
