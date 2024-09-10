import { DirectionLeft } from '@/assets/icons/direction';
import { Close, Search } from '@/assets/icons/menu';
import { useFetchAllDiaryData } from '@/hooks';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DiaryCard } from '..';

const SearchDiaryInput = ({ inputValue, setInputValue, addHistory }) => {
  const { diaryData, loading } = useFetchAllDiaryData();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const navigate = useNavigate();

  const emptyPhrase = `"${inputValue}" 검색 결과가 없어요.\n다른 단어로 검색하는 건 어떨까요?`;

  const handleBackClick = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleClear = () => {
    setInputValue('');
    setSearchResults([]);
    setIsSearched(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue && !loading) {
      const result = diaryData.filter((diary) =>
        diary.content.includes(inputValue)
      );

      setSearchResults(result);
      setIsSearched(true);
      addHistory(inputValue);
    }
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

            <button type="submit" aria-label="검색 실행">
              <Search className="w-5 h-5 text-blue" />
            </button>
          </div>
        </div>
      </form>
      {searchResults.length > 0 && (
        <div className="flex flex-col gap-5 mt-5">
          {searchResults.map((diary) => (
            <DiaryCard key={diary.id} diary={diary} />
          ))}
        </div>
      )}
      {isSearched && searchResults.length <= 0 && (
        <p className="mt-[30px] font-semibold text-center text-gray-300 whitespace-pre-wrap">
          {emptyPhrase}
        </p>
      )}
    </>
  );
};

SearchDiaryInput.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  addHistory: PropTypes.func.isRequired,
};

export default SearchDiaryInput;
