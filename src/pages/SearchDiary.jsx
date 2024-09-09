import { SearchDiaryHistory, SearchDiaryInput } from '@/components';
import { useState } from 'react';

const SearchDiary = () => {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState([]);

  const handleAddHistory = (term) => {
    if (!history.includes(term) && term.trim() !== '') {
      setHistory((prevHistory) => {
        const updatedHistory = [term, ...prevHistory];

        if (updatedHistory.length > 10) {
          updatedHistory.pop();
        }
        return updatedHistory;
      });
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
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
