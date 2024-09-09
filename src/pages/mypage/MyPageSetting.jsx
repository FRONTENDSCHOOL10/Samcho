import { useEffect, useState } from 'react';
import { DirectionRight } from '@/assets/icons/direction';
import { TopHeader } from '@/components';
import { defaultAuthData, pb } from '@/api';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const MypageSetting = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const authData = localStorage.getItem('pocketbase_auth');

    if (authData) {
      const parsedData = JSON.parse(authData);
      const userModel = parsedData.model;
      const storedUsername = userModel.username;

      setUsername(storedUsername);
    }
  });

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      pb.authStore.clear();
      localStorage.setItem('auth', JSON.stringify(defaultAuthData));
      navigate('/login');
    } catch (error) {
      console.error(error);
      toast.error('로그아웃 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 회원 탈퇴 처리 함수
  // const handleDeleteAccount = async () => {
  //   const confirmed = window.confirm('정말로 회원 탈퇴를 하시겠습니까?');
  //   if (!confirmed) return;

  //   setIsLoading(true);

  //   try {
  //     // API 호출을 통해 회원 탈퇴 처리
  //     await pb.collection('users').delete(pb.authStore.model.id); // 현재 사용자 삭제

  //     // 탈퇴 성공 후 로그아웃 처리
  //     pb.authStore.clear(); // 인증 정보 초기화

  //     toast.success('회원 탈퇴가 완료되었습니다.');

  //     // 리디렉션 (로그아웃 후 홈으로 이동)
  //     location.href = '/login';
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('회원 탈퇴 중 오류가 발생했습니다.');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <section className="flex flex-col justify-between min-h-dvh pb-[80px]">
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
            <p className="text-base font-medium text-gray-300">{username}</p>
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
          onClick={handleLogout}
          className="w-full px-5 py-[15px] bg-white rounded-[10px] shadow-light flex justify-center items-center"
          aria-label="로그아웃 버튼"
          disabled={isLoading}
        >
          <span className="text-lg font-bold text-blue-500">로그아웃</span>
        </button>
        <button
          //onClick={handleDeleteAccount}
          className="w-full px-5 py-[15px] bg-red rounded-[10px] shadow-light flex justify-center items-center"
          aria-label="회원 탈퇴 버튼"
          disabled={isLoading}
        >
          <span className="text-lg font-bold text-white">회원탈퇴</span>
        </button>
      </div>
    </section>
  );
};

export default MypageSetting;
