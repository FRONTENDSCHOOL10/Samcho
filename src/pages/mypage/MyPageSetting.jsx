import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Modal, TopHeader } from '@/components';
import { DirectionRight } from '@/assets/icons/direction';
import { defaultAuthData, pb } from '@/api';
import toast from 'react-hot-toast';
import useModal from '@/hooks/useModal';

const MypageSetting = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //바인딩
  const [name, setName] = useState('');
  const [newNickname, setNewNickname] = useState('');

  // 기능관련
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 모달관련
  const { isOpen, openModal, closeModal } = useModal();
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  // 위치 상태에서 닉네임을 설정합니다.
  useEffect(() => {
    if (location.state && location.state.nickname) {
      setName(location.state.nickname);
    }
  }, [location.state]);

  // 로그아웃 기능
  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      pb.authStore.clear();
      localStorage.setItem('auth', JSON.stringify(defaultAuthData));
      navigate('/login');
    } catch {
      toast.error('로그아웃 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // 닉네임 수정
  const handleUpdateNickname = useCallback(async () => {
    if (!isNicknameAvailable) {
      toast.error('이미 존재하는 닉네임이에요!');
      return;
    }

    setIsLoading(true);
    try {
      // localstora auth에도 nickname 값 세팅시키기
      const authData = localStorage.getItem('auth');

      const parsedData = JSON.parse(authData);
      const userId = parsedData.user.id;

      await pb.collection('users').update(userId, { name: newNickname });

      parsedData.user.name = newNickname;
      localStorage.setItem('auth', JSON.stringify(parsedData));

      setName(newNickname);
      toast.success('닉네임이 수정되었어요!');
      closeModal('nicknameModal');
    } catch {
      toast.error('닉네임 업데이트 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [newNickname, isNicknameAvailable, closeModal]);

  // 닉네임 중복 확인
  const checkNicknameAvailability = useCallback(async () => {
    if (!newNickname.trim()) {
      toast.error('닉네임을 입력해주세요!');
      return;
    }

    toast.dismiss();

    try {
      await pb.collection('users').getFirstListItem(`name = "${newNickname}"`);
      setIsNicknameAvailable(false);
      toast.error('이미 존재하는 닉네임이에요!');
    } catch (error) {
      if (error.status === 404) {
        setIsNicknameAvailable(true);
        toast.success('사용 가능한 닉네임이에요!');
      } else {
        toast.error('닉네임 확인 중 오류가 발생했어요!');
      }
    }
  }, [newNickname]);

  //회원 탈퇴 기능 관련함수
  const handleDeleteAccount = useCallback(async () => {
    setIsLoading(true);

    const authData = localStorage.getItem('auth');
    const parsedData = JSON.parse(authData);
    const userId = parsedData.user.id;

    await pb.collection('users').delete(userId);

    pb.authStore.clear();
    localStorage.setItem('auth', JSON.stringify(defaultAuthData));

    navigate('/login');

    toast.success('계정이 성공적으로 삭제되었습니다.');
  }, [navigate]);

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
            <p className="text-base font-medium text-gray-300">{name}</p>
          </div>
          <button
            type="button"
            aria-label="닉네임 변경 버튼"
            onClick={() => openModal('nicknameModal')}
          >
            <DirectionRight className="w-5 h-5 fill-gray-600" aria-hidden />
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
          onClick={() => setShowConfirmDelete(true)}
          className="w-full px-5 py-[15px] bg-red rounded-[10px] shadow-light flex justify-center items-center"
          aria-label="회원 탈퇴 버튼"
          disabled={isLoading}
        >
          <span className="text-lg font-bold text-white">회원탈퇴</span>
        </button>
      </div>

      {/* 닉네임 변경 모달 */}
      <Modal
        isOpen={isOpen('nicknameModal')}
        closeModal={() => closeModal('nicknameModal')}
      >
        <div className="flex flex-col gap-4 p-4">
          <h3 className="text-lg font-semibold">닉네임 변경</h3>
          {/* 라벨 추가 */}
          <label className="sr-only" htmlFor="nickname-input">
            새 닉네임 입력
          </label>
          <input
            type="text"
            value={newNickname}
            onChange={(e) => setNewNickname(e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
            placeholder="새 닉네임 입력"
            aria-label="새 닉네임 입력"
            id="nickname-input"
          />
          <button
            onClick={checkNicknameAvailability}
            className="p-2 text-white bg-gray-300 rounded-md"
          >
            닉네임 중복 확인
          </button>
          <button
            onClick={handleUpdateNickname}
            className="p-2 text-white bg-blue-500 rounded-md"
            disabled={isLoading || isNicknameAvailable === false}
          >
            {isLoading ? '업데이트 중...' : '닉네임 변경'}
          </button>
        </div>
      </Modal>

      {/* 회원탈퇴 모달 */}
      <Modal
        isOpen={showConfirmDelete}
        closeModal={() => setShowConfirmDelete(false)}
      >
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold">계정 삭제 확인</h3>
          <p className="text-base">
            정말로 계정을 <b>삭제</b>하시겠습니까?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={handleDeleteAccount}
              className="px-[10px] py-[5px] text-white bg-red-500 rounded-md bg-red"
              disabled={isLoading}
            >
              탈퇴
            </button>
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="px-[10px] py-[5px] text-white bg-gray-500 rounded-md"
            >
              취소
            </button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

export default MypageSetting;
