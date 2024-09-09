import { DirectionLeft } from '@/assets/icons/direction';
import { Close, Search } from '@/assets/icons/menu';
import { useFetchAllDiaryData } from '@/hooks';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryCard } from '..';

const emptyPhrase = `검색 결과가 없어요.\n다른 단어로 검색하는 건 어떨까요?`;

const SearchDiaryInput = ({ inputValue, setInputValue, addHistory }) => {
  const { diaryData, loading } = useFetchAllDiaryData();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsSearched(false);
  };

  const handleClear = () => {
    setInputValue('');
    setSearchResults([]);
    setIsSearched(false);
  };

  const handleSearch = () => {
    if (inputValue && !loading) {
      setIsSearched(false);

      const result = diaryData.filter((diary) =>
        diary.content.includes(inputValue)
      );
      setSearchResults(result);
      setIsSearched(true);
      addHistory(inputValue);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <>
      <form className="flex gap-4 pt-5" onSubmit={handleSubmit}>
        <button type="button" aria-label="뒤로 가기" onClick={handleBackClick}>
          <DirectionLeft className=" fill-black" />
        </button>
        <div className="flex w-full px-4 py-[10px] border-gray-200 border bg-white rounded-lg items-center ">
          <input
            id="diary-search"
            type="text"
            placeholder="한줄 일기 검색"
            value={inputValue}
            onChange={handleChange}
            className="w-full pr-4 font-semibold outline-none text-gray-450 placeholder:text-gray-200 placeholder:font-normal"
          />
          <div className="flex gap-4">
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="검색어 초기화"
              >
                <Close className="w-3 h-3 fill-gray-400" />
              </button>
            )}

            <button type="button" aria-label="검색 실행">
              <Search className="w-5 h-5 text-blue" />
            </button>
          </div>
        </div>
      </form>

      {searchResults.length > 0 && inputValue ? (
        <div className="flex flex-col gap-5 mt-5">
          {searchResults.map((diary) => (
            <DiaryCard key={diary.id} date={diary.date} />
          ))}
        </div>
      ) : (
        isSearched && (
          <p className="mt-[30px] font-semibold text-center text-gray-300 whitespace-pre-wrap">
            {emptyPhrase}
          </p>
        )
      )}
    </>
  );
};

export default SearchDiaryInput;
