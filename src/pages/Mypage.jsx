import { TopHeader } from '@/components';
import { Link } from 'react-router-dom';
import { DirectionRight } from '@/assets/icons/direction';

const Mypage = () => {
  return (
    <>
      <TopHeader title="내정보" />
      <div className="bg-blue-10 flex flex-col justify-center items-center gap-[25px]">
        
        {/* 계정 섹션 */}
        <section className="w-full flex flex-col gap-4"> 
          <h2 className="text-gray-450 text-lg font-semibold">계정</h2>
          <div className="w-full h-[100px] flex items-center justify-between p-6 bg-white rounded-[10px] shadow">
            <div className="flex flex-grow items-center">
              <div className="flex flex-col">
                <p className="text-blue-500 text-lg font-semibold">두팔</p>
                <p className="text-gray-400 text-base font-medium">abcd@email.com</p>
              </div>
            </div>
            <Link 
              to="/mypage/setting"
              className="right-6 cursor-pointer"
              aria-label="계정 관리 페이지로 이동"
            >
              <DirectionRight className="fill-black" />
            </Link>
          </div>
        </section>

        {/* 나의 기록 섹션 */}
        <section className="w-full h-[155px] flex flex-col justify-between">
          <h2 className="text-gray-450 text-lg font-semibold">나의 기록</h2>
          <div className="flex justify-between gap-5">
            <div className="w-40 h-[110px] p-[15px] bg-white rounded-[10px] shadow-light flex flex-col justify-between">
              <p className="text-gray-450 text-base font-medium">기록한 하루</p>
              <p className="text-gray-400 text-sm font-medium self-left">1234개</p>
            </div>
            <div className="w-40 h-[110px] p-[15px] bg-white rounded-[10px] shadow-light flex flex-col justify-between">
              <p className="text-gray-450 text-base font-medium">올린 사진</p>
              <p className="text-gray-400 text-sm font-medium self-left">1234개</p>
            </div>
          </div>
        </section>

        {/* 사진 모아 보기 섹션 */}
        <section className="w-full h-[60px] relative p-[15px] bg-white rounded-[13px] shadow flex items-center justify-between">
          <p className="text-gray-450 text-base font-medium">사진 모아 보기</p>
          <Link 
            to="#" // 추후 지정 
            className="right-6 cursor-pointer"
            aria-label="사진 모아 보기 페이지로 이동"
          >
            <DirectionRight className="fill-black" />
          </Link>
        </section>

        {/* 단짝 섹션 */}
        <section className="w-full flex flex-col gap-5">
          <h2 className="text-gray-450 text-lg font-semibold">단짝</h2>
          <Link 
            to="/buddy-management" 
            className="h-[60px] p-[15px] bg-white rounded-[10px] shadow-light flex items-center justify-between"
            aria-label="단짝 관리 페이지로 이동"
          >
            <p className="text-gray-450 text-base font-medium">나의 단짝 5명</p>
            <p className="w-[35px] h-[23px] text-blue-500 text-base font-semibold">관리</p>
          </Link>
        </section>

        {/* 단짝 찾기 섹션 */}
        <section className="w-full flex flex-col gap-5">
          <h2 className="text-gray-450 text-lg font-semibold">단짝 찾기</h2>
          <form className="h-[60px] p-[15px] bg-white rounded-[10px] shadow-light flex items-center justify-between">
            <input
              type="text"
              placeholder="사용자의 아이디를 입력하세요"
              className="text-left text-gray-450 text-base font-medium outline-none flex-grow focus:ring-2 focus:ring-blue-500"
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
