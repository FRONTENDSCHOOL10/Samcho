import { SearchDiaryHistory, SearchDiaryInput } from '@/components';
import { useEffect, useState } from 'react';

const SearchDiary = () => {
  const [inputValue, setInputValue] = useState('');
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

  return (
    <>
      <h1 className="sr-only">한줄 일기 검색</h1>
      <SearchDiaryInput
        inputValue={inputValue}
        setInputValue={setInputValue}
        addHistory={handleAddHistory}
      />
      {inputValue === '' && (
        <SearchDiaryHistory
          history={history}
          clearHistory={handleClearHistory}
        />
      )}
    </>
  );
};

export default SearchDiary;
