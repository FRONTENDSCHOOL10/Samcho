import PropTypes from 'prop-types';
import { DiaryCard } from '..';

const SearchDiaryResult = ({
  inputValue,
  searchResults,
  isSearched,
  buddyData,
}) => {
  const emptyPhrase = `"${inputValue}" 검색 결과가 없어요.\n다른 단어로 검색하는 건 어떨까요?`;

  if (Object.keys(searchResults).length > 0 && inputValue) {
    return (
      <main className="flex flex-col">
        {Object.keys(searchResults).map((yearMonth) => (
          <section key={yearMonth} className="my-5">
            <h2 className="font-semibold text-left text-gray-450">
              {yearMonth}
            </h2>
            {searchResults[yearMonth].map((diary) => (
              <div key={diary.id} className="">
                <DiaryCard diary={diary} buddyData={buddyData} />
              </div>
            ))}
          </section>
        ))}
      </main>
    );
  } else if (isSearched && inputValue) {
    return (
      <p className="mt-[30px] font-semibold text-center text-gray-300 whitespace-pre-wrap">
        {emptyPhrase}
      </p>
    );
  }
  return null;
};

SearchDiaryResult.propTypes = {
  searchResults: PropTypes.objectOf(PropTypes.array).isRequired,
  inputValue: PropTypes.string.isRequired,
  isSearched: PropTypes.bool.isRequired,
  buddyData: PropTypes.array.isRequired,
};

export default SearchDiaryResult;
