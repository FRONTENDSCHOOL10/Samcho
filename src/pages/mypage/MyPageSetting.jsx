import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Modal, TopHeader, ConfirmModal } from '@/components';
import { FaChevronRight } from 'react-icons/fa';
import { pb } from '@/api';
import toast from 'react-hot-toast';
import { authUtils, validateNickname, deleteData, deleteFilter } from '@/utils';
import { useModal, useFetchAllBuddyData, useFetchAllDiaryData } from '@/hooks';
import { Helmet } from 'react-helmet-async';

const MyPageSetting = () => {
  const navigate = useNavigate();
  // 유저 관련 데이터
  const { buddyData } = useFetchAllBuddyData(true);
  const { diaryData } = useFetchAllDiaryData();

  // 유저 상태 관리
  const [name, setName] = useState('');
  const [newNickname, setNewNickname] = useState('');

  // 기능관련
  const [isNicknameAvailable, setIsNicknameAvailable] = useState(null);
  const [isValiable, setIsValiable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // 모달관련
  const { isOpen, openModal, closeModal } = useModal();

  // 모달이 닫힐 때 초기화
  useEffect(() => {
    if (!isOpen('nicknameModal')) {
      setIsDisabled(false);
      setNewNickname('');
      setIsNicknameAvailable(null);
      setIsValiable(false);
    }
  }, [isOpen]);

  // 닉네임 입력이 변경되면 중복확인 상태를 초기화
  useEffect(() => {
    if (newNickname) {
      setIsNicknameAvailable(null);
      setIsDisabled(false);
      setIsValiable(false);
    }
  }, [newNickname]);

  useEffect(() => {
    const { user } = authUtils.getAuth();
    setName(user.name);
  }, []);

  // 로그아웃 기능
  const handleLogout = useCallback(async () => {
    try {
      pb.authStore.clear();
      authUtils.setDefaultAuthData();
      closeModal('logoutModal');
      navigate('/login');
    } catch {
      toast.error('로그아웃 중 오류가 발생했습니다.', {
        duration: 2000,
      });
    }
  }, [navigate, closeModal]);

  // 닉네임 수정
  const handleUpdateNickname = useCallback(async () => {
    toast.remove();

    setIsLoading(true);
    try {
      const userData = authUtils.getAuth();

      const userId = userData.user.id;

      await pb.collection('users').update(userId, { name: newNickname });

      userData.user.name = newNickname;
      authUtils.setUpdateData(userData);

      setName(newNickname);
      toast.success('닉네임이 수정되었어요!', {
        duration: 2000,
      });
      closeModal('nicknameModal');
    } catch (error) {
      toast.error('닉네임 업데이트 중 오류가 발생했습니다.', {
        duration: 2000,
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [newNickname, closeModal]);

  // 닉네임 중복 확인 및 유효성 검사
  const checkNicknameAvailability = useCallback(async () => {
    toast.remove();
    if (!newNickname.trim()) {
      toast.error('닉네임을 입력해주세요!', {
        duration: 1500,
      });
      return;
    }

    toast.remove();

    const isValidation = validateNickname(newNickname);

    if (!isValidation) {
      toast.error('닉네임 형식이 올바르지 않아요!', {
        duration: 1500,
      });
      return;
    }

    setIsValiable(true);

    try {
      await pb.collection('users').getFirstListItem(`name = "${newNickname}"`);
      setIsNicknameAvailable(false);
      toast.error('이미 존재하는 닉네임이에요!', {
        duration: 1500,
      });
    } catch (error) {
      if (error.status === 404) {
        setIsNicknameAvailable(true);
        toast.success('사용 가능한 닉네임이에요!', {
          duration: 1500,
        });
        setIsDisabled(true);
      } else {
        toast.error('닉네임 확인 중 오류가 발생했어요!', {
          duration: 1500,
        });
      }
    }
  }, [newNickname]);

  //회원 탈퇴 기능 관련함수
  const handleDeleteAccount = useCallback(async () => {
    setIsLoading(true);
    setIsDeleting(true);

    const { user } = authUtils.getAuth();
    const userId = user.id;

    toast
      .promise(
        (async () => {
          await deleteData(buddyData, 'buddy');
          await deleteData(diaryData, 'diary');

          await deleteFilter(
            'notification',
            `(recipient = "${userId}" || requester = "${userId}")`
          );
          await deleteFilter(
            'post',
            `(recipient = "${userId}" || requester = "${userId}")`
          );

          await pb.collection('users').delete(userId);

          pb.authStore.clear();
          authUtils.setDefaultAuthData();

          navigate('/login');
        })(),
        {
          loading: '회원탈퇴 처리 중...',
          success: '회원탈퇴가 성공적으로 처리되었습니다.',
          error: '회원탈퇴 처리 중 오류가 발생했습니다.',
        },
        {
          duration: 2000,
        }
      )
      .catch((error) => {
        console.error('회원탈퇴 실패: ', error);
      })
      .finally(() => {
        setIsLoading(false);
        setIsDeleting(false);
      });
  }, [buddyData, diaryData, navigate]);

  return (
    <>
      <Helmet>
        <title>하루몽 - 계정관리</title>
        <meta name="description" content="하루몽 계정관리 페이지 입니다." />
        <meta property="author" content="하루몽" />

        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://harumong.netlify.app/mypage/setting"
        />
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
              className="p-2"
            >
              <FaChevronRight aria-hidden={true} />
            </button>
          </section>
        </main>

        <div className="flex flex-col gap-2">
          <button
            onClick={() => openModal('logoutModal')}
            className="w-full px-5 py-[15px] bg-white rounded-[10px] shadow-light flex justify-center items-center"
            aria-label="로그아웃"
          >
            <span className="text-lg font-bold text-blue-500">로그아웃</span>
          </button>
          <button
            onClick={() => openModal('withdrawalModal')}
            className="w-full px-5 py-[15px] bg-red rounded-[10px] shadow-light flex justify-center items-center"
            aria-label="회원 탈퇴"
          >
            <span className="text-lg font-bold text-white">회원탈퇴</span>
          </button>
        </div>

        {/* 닉네임 변경 모달 */}
        <Modal
          isOpen={isOpen('nicknameModal')}
          closeModal={() => closeModal('nicknameModal')}
        >
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold">닉네임 변경</h3>
            {/* 라벨 추가 */}
            <div className="flex flex-row gap-1">
              <label className="sr-only" htmlFor="nickname-input">
                새 닉네임 입력
              </label>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                className="flex-[2] p-2 border border-gray-300 rounded-md"
                placeholder="새 닉네임 입력"
                aria-label="새 닉네임 입력"
                id="nickname-input"
                style={{ minWidth: '0' }}
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
                isLoading ? 'bg-gray-300' : 'bg-blue-500'
              } rounded-md`}
              disabled={
                isLoading ||
                isNicknameAvailable === false ||
                isValiable === false
              }
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
          disabled={isDeleting}
        >
          정말 회원탈퇴를 하시겠습니까?
        </ConfirmModal>
      </section>
    </>
  );
};

export default MyPageSetting;
