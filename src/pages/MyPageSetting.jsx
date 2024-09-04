import { DirectionRight } from '@/assets/icons/direction';
import { TopHeader } from '@/components';

const MypageSetting = () => {
  return (
    <div className="bg-blue-10 flex-col justify-start items-center gap-10 flex">
        <TopHeader title="계정 관리" isShowIcon={true}/>
         <main className="self-stretch grow shrink basis-0 flex-col justify-start items-center gap-10 flex">
        <section 
          className="w-[319.08px] p-5 bg-white rounded-[10px] shadow-light flex justify-between items-center"
          aria-labelledby="items-to-change-title"
        >
          <div className="w-[184px] flex-col justify-center items-start gap-2 inline-flex">
            <h2 id="items-to-change-title" className="text-black text-[17px] font-semibold">변경할 항목</h2>
            <div className="h-[39px] flex-col justify-start items-start gap-[3px] flex">
              <p className="text-black text-[15px] font-medium">닉네임 변경하기</p>
              <p className="text-gray-300 text-[15px] font-medium">닉네임</p>
            </div>
          </div>
          <DirectionRight className="w-5 h-5 fill-gray-600" aria-hidden="true"/>
        </section>

        <button
          className="px-5 py-[15px] bg-red rounded-[10px] shadow-light flex justify-center items-center"
          aria-label="회원 탈퇴 버튼"
        >
          <span className="text-white text-lg font-bold">회원탈퇴</span>
        </button>
      </main>
    </div>
  );
};

export default MypageSetting;
