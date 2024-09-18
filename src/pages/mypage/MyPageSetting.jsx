import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Modal, TopHeader, ConfirmModal } from '@/components';
import { DirectionRight } from '@/assets/icons/direction';
import { pb } from '@/api';
import toast from 'react-hot-toast';
import useModal from '@/hooks/useModal';
import { authUtils } from '@/utils';

const MypageSetting = () => {
  const navigate = useNavigate();

  // 유저 상태 관리
  const [name, setName] = useState('');
  const [newNickname, setNewNickname] = useState('');

  // 기능관련
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  // 모달관련
  const { isOpen, openModal, closeModal } = useModal();

  // 모달이 닫힐 때 setIsDisabled 초기화
  useEffect(() => {
    if (!isOpen('nicknameModal')) {
      setIsDisabled(false);
      setNewNickname('');
      setIsNicknameAvailable(null);
    }
  }, [isOpen('nicknameModal')]);

  // 닉네임 입력이 변경되면 중복확인 상태를 초기화
  useEffect(() => {
    if (newNickname) {
      setIsNicknameAvailable(null);
      setIsDisabled(false);
    }
  }, [newNickname]);

  // 위치 상태에서 닉네임을 설정합니다.
  useEffect(() => {
    const { user } = authUtils.getAuth();
    setName(user.name);
  }, []);

  // 로그아웃 기능
  const handleLogout = useCallback(async () => {
    setIsLoading(true);
    try {
      pb.authStore.clear();
      authUtils.setDefaultAuthData();
      navigate('/login');
    } catch {
      toast.error('로그아웃 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  // 닉네임 수정
  const handleUpdateNickname = useCallback(async () => {
    toast.dismiss();
    if (!isNicknameAvailable) {
      toast.error('닉네임 중복 확인을 먼저 해주세요!');
      return;
    }

    setIsLoading(true);
    try {
      // localStorage auth에도 nickname 값 세팅시키기
      const userData = authUtils.getAuth();

      const userId = userData.user.id;

      await pb.collection('users').update(userId, { name: newNickname });

      userData.user.name = newNickname;
      authUtils.setUpdateData(userData);

      setName(newNickname);
      toast.success('닉네임이 수정되었어요!');
      closeModal('nicknameModal');
    } catch (error) {
      toast.error('닉네임 업데이트 중 오류가 발생했습니다.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [newNickname, isNicknameAvailable, closeModal]);

  // 닉네임 중복 확인
  const checkNicknameAvailability = useCallback(async () => {
    toast.dismiss();
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
        setIsDisabled(true);
      } else {
        toast.error('닉네임 확인 중 오류가 발생했어요!');
      }
    }
  }, [newNickname]);

  //회원 탈퇴 기능 관련함수
  const handleDeleteAccount = useCallback(async () => {
    setIsLoading(true);

    const { user } = authUtils.getAuth();

    await pb.collection('users').delete(user.id);

    pb.authStore.clear();
    authUtils.setDefaultAuthData();

    navigate('/login');

    toast.success('회원탈퇴가 성공적으로 처리되었습니다.');
  }, [navigate]);

  return (
    <section className="flex flex-col justify-between min-h-dvh pb-[80px]">
      <TopHeader title="계정 관리" isShowIcon={true} />

      <main className="flex flex-col items-center flex-1 gap-10 mt-5">
        <section
          className="w-full p-[0.9375rem] bg-white rounded-[10px] shadow-light flex justify-between items-center"
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
            aria-label="닉네임 변경"
            onClick={() => openModal('nicknameModal')}
          >
            <DirectionRight className="w-5 h-5 fill-gray-600" aria-hidden />
          </button>
        </section>
      </main>

      <div className="flex flex-col gap-2">
        <button
          onClick={() => openModal('logoutModal')}
          className="w-full px-5 py-[15px] bg-white rounded-[10px] shadow-light flex justify-center items-center"
          aria-label="로그아웃"
          disabled={isLoading}
        >
          <span className="text-lg font-bold text-blue-500">로그아웃</span>
        </button>
        <button
          onClick={() => openModal('withdrawalModal')}
          className="w-full px-5 py-[15px] bg-red rounded-[10px] shadow-light flex justify-center items-center"
          aria-label="회원 탈퇴"
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
        <div className="flex flex-col w-full gap-3">
          <h3 className="text-lg font-semibold">닉네임 변경</h3>
          {/* 라벨 추가 */}
          <div className="flex flex-row justify-between gap-1">
            <label className="sr-only" htmlFor="nickname-input">
              새 닉네임 입력
            </label>
            <input
              type="text"
              value={newNickname}
              onChange={(e) => setNewNickname(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-md"
              placeholder="새 닉네임 입력"
              aria-label="새 닉네임 입력"
              id="nickname-input"
            />
            <button
              onClick={checkNicknameAvailability}
              className={`flex-1 p-1 text-white ${
                isDisabled ? 'bg-gray-300' : 'bg-blue-500'
              } rounded-md`}
              disabled={isDisabled}
            >
              중복 확인
            </button>
          </div>
          <button
            onClick={handleUpdateNickname}
            className={`p-2 text-white ${
              isLoading || isNicknameAvailable === false
                ? 'bg-gray-300'
                : 'bg-blue-500'
            } rounded-md`}
            disabled={isLoading || isNicknameAvailable === false}
          >
            {isLoading ? '업데이트 중...' : '닉네임 변경'}
          </button>
        </div>
      </Modal>

      <ConfirmModal
        isOpen={isOpen('logoutModal')}
        closeModal={() => closeModal('logoutModal')}
        title="로그아웃"
        onConfirm={() => handleLogout()}
      >
        정말 로그아웃을 하시겠습니까?
      </ConfirmModal>

      <ConfirmModal
        isOpen={isOpen('withdrawalModal')}
        closeModal={() => closeModal('withdrawalModal')}
        title="회원탈퇴"
        onConfirm={() => handleDeleteAccount()}
      >
        정말 회원탈퇴를 하시겠습니까?
      </ConfirmModal>
    </section>
  );
};

export default MypageSetting;
