import { DirectionRight } from '@/assets/icons/direction';
import { TopHeader } from '@/components';

const MypageSetting = () => {
  return (
    <div className="flex flex-col justify-between h-full pb-20">
      <TopHeader title="계정 관리" isShowIcon={true} />
      <main className="flex flex-col items-center flex-1 gap-10 mt-5">
        <section
          className="w-full p-5 bg-white rounded-[10px] shadow-light flex justify-between items-center"
          aria-labelledby="items-to-change-title"
        >
          <div className="flex flex-col">
            <h2
              id="items-to-change-title"
              className="text-base font-semibold text-black"
            >
              닉네임 변경
            </h2>
            <p className="text-base font-medium text-gray-300">두팔</p>
          </div>
          <button type="button" aria-label="닉네임 변경">
            <DirectionRight
              className="w-5 h-5 fill-gray-600"
              aria-hidden="true"
            />
          </button>
        </section>
      </main>
      <div className="flex flex-col gap-2">
        <button
          className="w-full px-5 py-[15px] bg-white rounded-[10px] shadow-light flex justify-center items-center"
          aria-label="로그아웃 버튼"
        >
          <span className="text-lg font-bold text-blue-500">로그아웃</span>
        </button>
        <button
          className="w-full px-5 py-[15px] bg-red rounded-[10px] shadow-light flex justify-center items-center"
          aria-label="회원 탈퇴 버튼"
        >
          <span className="text-lg font-bold text-white">회원탈퇴</span>
        </button>
      </div>
    </div>
  );
};

export default MypageSetting;
