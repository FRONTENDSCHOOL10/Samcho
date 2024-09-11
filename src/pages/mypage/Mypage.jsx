import { useState, useEffect } from 'react';
import { TopHeader, BuddySearch } from '@/components';
import { Link, useNavigate } from 'react-router-dom';
import { DirectionRight } from '@/assets/icons/direction';
import toast from 'react-hot-toast';
import useFetchBuddyData from '@/hooks/useFetchBuddyData';
import { useModal } from '@/hooks';

const Mypage = () => {
  const [nickname, setNickName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const { buddyData } = useFetchBuddyData();
  const buddyCount = buddyData.length;

  const { isOpen, openModal, closeModal } = useModal();
  const [searchBuddy, setSearchBuddy] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    const authData = localStorage.getItem('pocketbase_auth');

    if (authData) {
      const parsedData = JSON.parse(authData);
      const userModel = parsedData.model;
      const storedNickName = userModel.name;
      const storedUserName = userModel.username;
      const storedEmail = userModel.email;

      setNickName(storedNickName);
      setUserName(storedUserName);
      setEmail(storedEmail);
    }
  }, []);

  const handleSearchInputChange = (e) => {
    setSearchBuddy(e.target.value);
  };

  const handleSearchClick = () => {
    toast.dismiss();

    if (!searchBuddy.trim()) {
      toast.error('아이디 혹은 닉네임을 입력하세요.');
      return;
    }

    setTriggerSearch(true);
    openModal('searchModal');
  };

  const handleNavigateToSetting = () => {
    navigate('/mypage/setting', {
      state: { nickname }, // state를 통해 데이터 전달
    });
  };

  return (
    <>
      <TopHeader title="내정보" />
      <div className="flex flex-col justify-start items-center gap-[25px] mt-5 min-h-dvh pb-[80px]">
        {/* 계정 섹션 */}
        <section className="flex flex-col w-full gap-4">
          <h2 className="text-lg font-semibold text-gray-450">계정</h2>
          <div className="w-full flex items-center justify-between p-[0.9375rem] bg-white rounded-[10px] shadow-light">
            <div className="flex flex-col">
              <h3 className="text-base font-semibold text-gray-450">
                {nickname}
                <span className="mt-2 text-xs leading-3 text-gray-300">
                  ({username})
                </span>
              </h3>
              <p className="text-sm font-medium text-gray-400">{email}</p>
            </div>
            <nav aria-label="계정 관리">
              <button
                onClick={handleNavigateToSetting} // 버튼 클릭 시 데이터와 함께 이동
                aria-label="계정 관리 페이지로 이동"
              >
                <DirectionRight className="fill-black" />
              </button>
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
                1234개
              </p>
            </article>
            <article className="w-full p-[0.9375rem] bg-white rounded-[0.625rem] shadow-light flex flex-col gap-2">
              <h3 className="text-base font-medium text-gray-450">올린 사진</h3>
              <p className="text-sm font-medium text-gray-400 self-left">
                1234개
              </p>
            </article>
          </div>
          <article className="w-full h-[60px] p-[0.9375rem] bg-white rounded-[0.625rem] shadow-light flex items-center justify-between">
            <h3 className="sr-only">사진 모아 보기</h3>
            <p className="text-base font-medium text-gray-450">
              사진 모아 보기
            </p>
            <nav aria-label="사진 모아 보기">
              <Link
                to="/mypage/photo"
                aria-label="사진 모아 보기 페이지로 이동"
              >
                <DirectionRight className="fill-black" />
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
              {buddyCount}명
            </p>
            <nav aria-label="단짝 관리">
              <Link
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
              placeholder="사용자의 아이디 혹은 닉네임을 입력하세요"
              className="flex-1 text-base font-medium outline-none text-gray-450 placeholder:text-gray-300"
              value={searchBuddy}
              onChange={handleSearchInputChange}
            />
            <button
              type="button"
              className="text-base font-semibold text-blue-500"
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
