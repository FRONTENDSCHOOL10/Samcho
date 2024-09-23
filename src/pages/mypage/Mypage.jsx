import { useState, useEffect } from 'react';
import { TopHeader, BuddySearch } from '@/components';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useModal, useFetchAllBuddyData, useFetchAllDiaryData } from '@/hooks';
import { authUtils } from '@/utils';
import { Helmet } from 'react-helmet-async';

const Mypage = () => {
  const [nickname, setNickName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [searchBuddy, setSearchBuddy] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);

  // 단짝 리스트 데이터 훅
  const { buddyData } = useFetchAllBuddyData();

  // 다이어리 데이터 훅
  const { diaryData } = useFetchAllDiaryData();
  const photoCount = diaryData.reduce((count, entry) => {
    return entry.picture ? count + 1 : count;
  }, 0);

  // 모달 제어 훅
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    const getData = async () => {
      const { user } = await authUtils.getAuth();

      setNickName(user.name);
      setUserName(user.username);
      setEmail(user.email);
    };

    getData();
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchBuddy(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchClick();
    }
  };

  const handleSearchClick = () => {
    toast.remove();

    if (!searchBuddy.trim()) {
      toast.error('아이디 혹은 닉네임을 입력하세요.', {
        duration: 1500,
      });
      return;
    }

    setTriggerSearch(true);
    openModal('searchModal');
  };

  return (
    <>
      <Helmet>
        <title>하루몽 - 내정보</title>
        <meta name="description" content="하루몽 내정보 페이지 입니다." />
        <meta property="author" content="하루몽" />

        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://harumong.netlify.app/mypage" />
        <meta property="og:site_name" content="하루몽 - 감정일기" />
        <meta property="og:title" content="하루몽 - 감정일기" />
        <meta
          property="og:description"
          content="감정 기반으로 작성하는 일기 어플리케이션 하루몽"
        />
        <meta
          property="og:image"
          content="https://harumong.netlify.app/logo.webp"
        />
      </Helmet>

      <TopHeader title="내정보" />
      <div className="flex flex-col justify-start items-center gap-[25px] mt-5 min-h-dvh pb-[80px]">
        {/* 계정 섹션 */}
        <section className="flex flex-col w-full gap-4">
          <h2 className="text-lg font-semibold text-gray-450">계정</h2>
          <div className="w-full flex items-center justify-between p-[0.9375rem] bg-white rounded-[10px] shadow-light">
            <div className="flex flex-col gap-0.5">
              <h3 className="text-base font-semibold text-gray-450">
                {nickname}
                <span className="ml-0.5 text-sm text-gray-300 font-normal">
                  ({username})
                </span>
              </h3>
              <p className="text-sm font-medium text-gray-300">{email}</p>
            </div>
            <nav className="flex" aria-label="계정 관리">
              <Link
                className="p-2"
                to="/mypage/setting"
                aria-label="계정 관리 페이지로 이동"
              >
                <FaChevronRight aria-hidden={true} />
              </Link>
            </nav>
          </div>
        </section>

        {/* 나의 기록 섹션 */}
        <section className="flex flex-col justify-between w-full gap-4">
          <h2 className="text-lg font-semibold text-gray-450">나의 기록</h2>
          <div className="flex justify-between gap-5">
            <article className="w-full h-[110px] p-[0.9375rem] bg-white rounded-[0.625rem] shadow-light flex flex-col gap-2">
              <h3 className="text-base font-medium text-gray-450">
                기록한 하루
              </h3>
              <p className="text-sm font-medium text-gray-400 self-left">
                {diaryData?.length}개
              </p>
            </article>
            <article className="w-full p-[0.9375rem] bg-white rounded-[0.625rem] shadow-light flex flex-col gap-2">
              <h3 className="text-base font-medium text-gray-450">
                기록한 사진
              </h3>
              <p className="text-sm font-medium text-gray-400 self-left">
                {photoCount}개
              </p>
            </article>
          </div>
          <article className="w-full h-[60px] p-[0.9375rem] bg-white rounded-[0.625rem] shadow-light flex items-center justify-between">
            <h3 className="sr-only">사진 모아 보기</h3>
            <p className="text-base font-medium text-gray-450">
              사진 모아 보기
            </p>
            <nav className="flex" aria-label="사진 모아 보기">
              <Link
                className="p-2"
                to="/mypage/photo"
                aria-label="사진 모아 보기 페이지로 이동"
              >
                <FaChevronRight aria-hidden={true} />
              </Link>
            </nav>
          </article>
        </section>

        {/* 단짝 섹션 */}
        <section className="flex flex-col w-full gap-5">
          <h2 className="text-lg font-semibold text-gray-450">나의 단짝</h2>
          <article className="h-[60px] p-[0.9375rem] bg-white rounded-[0.625rem] shadow-light flex items-center justify-between">
            <h3 className="sr-only">단짝 관리</h3>
            <p className="text-base font-medium text-gray-450">
              {buddyData?.length}명
            </p>
            <nav className="flex" aria-label="단짝 관리">
              <Link
                className="p-2"
                to="/mypage/buddy-management"
                aria-label="단짝 관리 페이지로 이동"
              >
                <span className="text-base font-semibold text-blue-500">
                  관리
                </span>
              </Link>
            </nav>
          </article>
        </section>

        {/* 단짝 찾기 섹션 */}
        <section className="flex flex-col w-full gap-5">
          <h2 className="text-lg font-semibold text-gray-450">단짝 찾기</h2>
          <form
            className="h-[60px] p-[0.9375rem] bg-white rounded-[0.625rem] shadow-light flex items-center justify-between focus-within:ring-1 focus-within:ring-blue-300"
            aria-labelledby="buddy-search-label"
          >
            <label
              id="buddy-search-label"
              htmlFor="buddy-search-input"
              className="sr-only"
            >
              단짝 검색
            </label>
            <input
              type="text"
              id="buddy-search-input"
              placeholder="사용자 아이디 혹은 닉네임을 입력하세요"
              className="flex-1 text-base font-medium outline-none text-gray-450 placeholder:text-gray-300"
              value={searchBuddy}
              onChange={handleSearchInputChange}
              onKeyDown={handleEnter}
            />
            <button
              type="button"
              className="p-2 text-base font-semibold text-blue-500 text-nowrap"
              aria-label="단짝 검색"
              onClick={handleSearchClick}
            >
              검색
            </button>
          </form>
        </section>
      </div>

      {/* BuddySearch 모달 */}
      <BuddySearch
        isOpen={isOpen('searchModal')}
        closeModal={() => closeModal('searchModal')}
        searchBuddy={searchBuddy}
        triggerSearch={triggerSearch} // 검색 실행 여부 전달
        setTriggerSearch={setTriggerSearch} // 검색 실행 여부를 초기화하는 함수 전달
      />
    </>
  );
};

export default Mypage;
