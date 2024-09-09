import { TopHeader } from '@/components';
import { Link } from 'react-router-dom';
import { DirectionRight } from '@/assets/icons/direction';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const Mypage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const authData = localStorage.getItem('pocketbase_auth');

    if (authData) {
      const parsedData = JSON.parse(authData);
      const userModel = parsedData.model;
      const storedUsername = userModel.username;
      const storedEmail = userModel.email;

      setUsername(storedUsername);
      setEmail(storedEmail);
    }
  }, [setUsername]);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss();
    toast.error('Here is your toast.');
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
                {username}
              </h3>
              <p className="text-sm font-medium text-gray-400">{email}</p>
            </div>
            <nav aria-label="계정 관리">
              <Link to="/mypage/setting" aria-label="계정 관리 페이지로 이동">
                <DirectionRight className="fill-black" />
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
            <p className="text-base font-medium text-gray-450">5명</p>
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
            onSubmit={handleSubmit}
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
              placeholder="사용자의 아이디를 입력하세요"
              className="flex-1 text-base font-medium outline-none text-gray-450 placeholder:text-gray-300"
            />
            <button
              type="submit"
              className="text-base font-semibold text-blue-500 "
              aria-label="단짝 검색"
            >
              검색
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Mypage;
