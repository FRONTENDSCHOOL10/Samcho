import {
  SearchDiaryHistory,
  SearchDiaryInput,
  SearchDiaryResult,
} from '@/components';
import { useSearchDiary } from '@/hooks';
import { Helmet } from 'react-helmet-async';

const SearchDiary = () => {
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
    <>
      <Helmet>
        <title>하루몽 - 검색</title>
        <meta name="description" content="하루몽 검색 페이지 입니다." />
        <meta property="author" content="하루몽" />

        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://harumong.netlify.app/home/search"
        />
        <meta property="og:site_name" content="하루몽 - 감정일기" />
        <meta property="og:title" content="하루몽 - 감정일기" />
        <meta
          property="og:description"
          content="감정 기반으로 작성하는 일기 어플리케이션 하루몽"
        />
        <meta
          property="og:image"
          content="https://harumong.netlify.app/logo.png"
        />
      </Helmet>

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
    </>
  );
};

export default SearchDiary;
