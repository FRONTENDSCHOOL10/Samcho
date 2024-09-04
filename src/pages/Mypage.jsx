import { TopHeader } from '@/components';
import { Link } from 'react-router-dom';
import { DirectionRight } from '@/assets/icons/direction';

const Mypage = () => {
  return (
    <>
      <TopHeader title="내정보" />
      <div className="bg-blue-10 flex flex-col justify-center items-center gap-[25px]">
        {/* 계정 섹션 */}
        <section className="flex flex-col w-full gap-4">
          <h2 className="text-lg font-semibold text-gray-450">계정</h2>
          <div className="w-full h-[100px] flex items-center justify-between p-6 bg-white rounded-[10px] shadow">
            <div className="flex items-center flex-grow">
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-blue-500">두팔</p>
                <p className="text-base font-medium text-gray-400">
                  abcd@email.com
                </p>
              </div>
            </div>
            <Link
              to="/mypage/setting"
              className="cursor-pointer right-6"
              aria-label="계정 관리 페이지로 이동"
            >
              <DirectionRight className="fill-black" />
            </Link>
          </div>
        </section>

        {/* 나의 기록 섹션 */}
        <section className="w-full h-[155px] flex flex-col justify-between">
          <h2 className="text-lg font-semibold text-gray-450">나의 기록</h2>
          <div className="flex justify-between gap-5">
            <div className="w-40 h-[110px] p-[15px] bg-white rounded-[10px] shadow-light flex flex-col justify-between">
              <p className="text-base font-medium text-gray-450">기록한 하루</p>
              <p className="text-sm font-medium text-gray-400 self-left">
                1234개
              </p>
            </div>
            <div className="w-40 h-[110px] p-[15px] bg-white rounded-[10px] shadow-light flex flex-col justify-between">
              <p className="text-base font-medium text-gray-450">올린 사진</p>
              <p className="text-sm font-medium text-gray-400 self-left">
                1234개
              </p>
            </div>
          </div>
        </section>

        {/* 사진 모아 보기 섹션 */}
        <section className="w-full h-[60px] relative p-[15px] bg-white rounded-[13px] shadow flex items-center justify-between">
          <p className="text-base font-medium text-gray-450">사진 모아 보기</p>
          <Link
            to="#" // 추후 지정
            className="cursor-pointer right-6"
            aria-label="사진 모아 보기 페이지로 이동"
          >
            <DirectionRight className="fill-black" />
          </Link>
        </section>

        {/* 단짝 섹션 */}
        <section className="flex flex-col w-full gap-5">
          <h2 className="text-lg font-semibold text-gray-450">단짝</h2>
          <Link
            to="/mypage/buddy-management"
            className="h-[60px] p-[15px] bg-white rounded-[10px] shadow-light flex items-center justify-between"
            aria-label="단짝 관리 페이지로 이동"
          >
            <p className="text-base font-medium text-gray-450">나의 단짝 5명</p>
            <p className="w-[35px] h-[23px] text-blue-500 text-base font-semibold">
              관리
            </p>
          </Link>
        </section>

        {/* 단짝 찾기 섹션 */}
        <section className="flex flex-col w-full gap-5">
          <h2 className="text-lg font-semibold text-gray-450">단짝 찾기</h2>
          <form className="h-[60px] p-[15px] bg-white rounded-[10px] shadow-light flex items-center justify-between">
            <input
              type="text"
              placeholder="사용자의 아이디를 입력하세요"
              className="flex-grow text-base font-medium text-left outline-none text-gray-450 focus:ring-2 focus:ring-blue-500"
              aria-label="사용자 아이디 입력"
            />
            <button
              className="w-[35px] h-[23px] text-blue-500 text-base font-semibold"
              aria-label="검색 버튼"
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
