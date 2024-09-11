import { DirectionLeft } from '@/assets/icons/direction';
import { Close, Search } from '@/assets/icons/menu';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const SearchDiaryInput = ({
  inputValue,
  setInputValue,
  onDiarySearch,
  setIsSearched,
  setSearchResults,
}) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setIsSearched(false);
    setSearchResults({});
  };

  const handleClear = () => {
    setInputValue('');
    setSearchResults({});
    setIsSearched(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onDiarySearch(inputValue);
  };

  return (
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
  );
};

SearchDiaryInput.propTypes = {
  inputValue: PropTypes.string.isRequired,
  setInputValue: PropTypes.func.isRequired,
  onDiarySearch: PropTypes.func.isRequired,
  setIsSearched: PropTypes.func.isRequired,
  setSearchResults: PropTypes.func.isRequired,
};

export default SearchDiaryInput;
