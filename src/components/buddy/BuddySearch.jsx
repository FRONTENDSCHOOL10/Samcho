import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '@/components';
import { useBuddySearchAction } from '@/hooks';
import pb from '@/api/pb';

const BuddySearch = ({
  isOpen,
  closeModal,
  searchBuddy,
  triggerSearch,
  setTriggerSearch,
}) => {
  const [userData, setUserData] = useState(null);
  const [relationshipStatus, setRelationshipStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem('auth')).user.id;

  const { handleBuddySearchAction, isSubmitting } = useBuddySearchAction(
    userData,
    relationshipStatus,
    closeModal
  );

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
        name: result.name,
      });

      const relationship = await pb.collection('buddy').getFullList({
        filter: `recipient = "${result.id}" && requester = "${userId}" || recipient = "${userId}" && requester = "${result.id}"`,
      });

      if (relationship.length > 0) {
        const status = relationship[0].status;
        if (status === 'accepted') {
          setRelationshipStatus('accepted');
        } else if (status === 'pending') {
          const isRequester = relationship[0].requester === userId;
          setRelationshipStatus(
            isRequester ? 'pending_requester' : 'pending_recipient'
          );
        }
      } else {
        setRelationshipStatus('none');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('해당 아이디 혹은 닉네임을 가진 유저가 없습니다.');
    }
    setLoading(false);
    setTriggerSearch(false);
  }, [searchBuddy, setTriggerSearch, userId]);

  useEffect(() => {
    if (triggerSearch && searchBuddy) {
      handleSearch();
    }
  }, [triggerSearch, searchBuddy, handleSearch]);

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <section className="flex flex-col gap-5">
        <h2 className="text-lg font-semibold text-gray-500">단짝 찾기</h2>

        {loading ? (
          <p className="w-full font-medium text-center text-gray-400">
            단짝 검색 중...
          </p>
        ) : userData ? (
          <main className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-baseline gap-0.5">
              <p
                className="text-base font-semibold text-gray-450"
                aria-label="닉네임"
              >
                {userData.name}
              </p>
              <p
                className="text-sm font-medium text-gray-300"
                aria-label="아이디"
              >
                ({userData.username})
              </p>
            </div>
            {relationshipStatus === 'accepted' ? (
              <p className="text-sm font-normal text-gray-300">
                이미 단짝 상태입니다
              </p>
            ) : relationshipStatus === 'pending_requester' ? (
              <button
                type="button"
                className="text-red bg-white font-medium px-[5px] py-[5px]"
                onClick={handleBuddySearchAction}
                disabled={isSubmitting}
              >
                신청 취소
              </button>
            ) : (
              <button
                type="button"
                className="text-blue-500 bg-white font-medium px-[10px] py-[5px]"
                onClick={handleBuddySearchAction}
                disabled={isSubmitting}
              >
                신청
              </button>
            )}
          </main>
        ) : errorMessage ? (
          <p className="w-full font-medium text-center text-gray-400">
            {errorMessage}
          </p>
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
  searchBuddy: PropTypes.string.isRequired,
  triggerSearch: PropTypes.bool.isRequired,
  setTriggerSearch: PropTypes.func.isRequired,
};

export default BuddySearch;
