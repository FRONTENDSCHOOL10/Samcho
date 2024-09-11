import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@/components';
import pb from '@/api/pb';
import toast from 'react-hot-toast';

const BuddySearch = ({
  isOpen,
  closeModal,
  searchBuddy,
  triggerSearch,
  setTriggerSearch,
}) => {
  const [userData, setUserData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem('auth')).user.id;

  /* user collection에 해당 아이디가 있는지 검색 요청 보내는 함수 */
  const handleSearch = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');
    setUserData(null);

    try {
      const result = await pb
        .collection('users')
        .getFirstListItem(`username="${searchBuddy}" || name="${searchBuddy}"`);

      setUserData({
        id: result.id,
        username: result.username,
        name: result.name, // 닉네임 데이터
      });
    } catch (error) {
      console.error(error);
      setErrorMessage('해당 아이디 혹은 닉네임을 가진 유저가 없습니다.');
    } finally {
      setLoading(false);
      setTriggerSearch(false);
    }
  }, [searchBuddy, setTriggerSearch]);

  // 함수 실행
  useEffect(() => {
    if (triggerSearch && searchBuddy) {
      handleSearch();
    }
  }, [triggerSearch, searchBuddy, handleSearch]);

  /* 단짝 신청하기 함수 */
  const handleBuddyRequest = async () => {
    toast.dismiss(); // 기존의 모든 toast 메시지 제거

    // 본인에게 단짝 신청을 보낸 경우
    if (userId === userData.id) {
      toast.error('자신에게 단짝 요청을 보낼 수 없습니다.');
      return;
    }

    // 중복 신청 방지 : 이미 보낸 상대에게 다시 신청 X
    try {
      const existingRequest = await pb.collection('buddy').getFullList({
        filter: `recipient = "${userData.id}" && requester = "${userId}" || recipient = "${userId}" && requester = "${userData.id}"`, // 이미 신청한 기록이 있는지 확인
      });

      if (existingRequest.length > 0) {
        toast.error('이미 해당 사용자와 단짝 이거나 대기 상태입니다.');
        return;
      }

      const buddy = await pb.collection('buddy').create({
        recipient: userData.id,
        requester: userId,
        status: 'pending',
      });

      await pb.collection('notification').create({
        recipient: userData.id,
        requester: userId,
        type: '단짝',
        type_id: buddy.id,
      });

      toast.success('단짝 신청을 보냈습니다!');
    } catch (error) {
      toast.error('단짝 신청에 실패했습니다.');
      console.error(error);
    }
  };

  /* 모달 닫을 때 초기화하는 함수 */
  const handleCloseModal = () => {
    setUserData(null);
    setErrorMessage('');
    setLoading(false);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={handleCloseModal}>
      {/* 모달 창 */}
      <section className="flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-500">단짝 찾기</h2>

        {loading ? (
          <p>검색 중...</p>
        ) : userData ? (
          <main className="flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <p
                className="text-base font-semibold text-gray-450"
                aria-label="닉네임"
              >
                {userData.name}
              </p>
              <p
                className="text-sm font-medium text-gray-400"
                aria-label="아이디"
              >
                {userData.username}
              </p>
            </div>
            <button
              type="button"
              className="text-white bg-blue-500 px-[10px] rounded-[5px] py-[5px]"
              onClick={handleBuddyRequest}
            >
              신청
            </button>
          </main>
        ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
          <p className="text-gray-500">
            아이디 혹은 닉네임으로 유저를 검색하세요.
          </p>
        )}
      </section>
    </Modal>
  );
};

BuddySearch.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  searchBuddy: PropTypes.string.isRequired, // 검색할 유저 아이디
  triggerSearch: PropTypes.bool.isRequired, // 검색 실행 여부
  setTriggerSearch: PropTypes.func.isRequired, // 검색 실행 여부를 초기화하는 함수
};

export default BuddySearch;
