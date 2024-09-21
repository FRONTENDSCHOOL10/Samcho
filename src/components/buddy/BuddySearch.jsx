import { Modal } from '@/components';
import { useBuddySearchAction } from '@/hooks';
import PropTypes from 'prop-types';

const BuddySearch = ({
  isOpen,
  closeModal,
  searchBuddy,
  triggerSearch,
  setTriggerSearch,
}) => {
  const {
    handleBuddySearchAction,
    isSubmitting,
    userData,
    relationshipStatus,
    errorMessage,
    loading,
  } = useBuddySearchAction(
    searchBuddy,
    triggerSearch,
    setTriggerSearch,
    closeModal
  );

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
  searchBuddy: PropTypes.string.isRequired, // 검색할 유저 아이디
  triggerSearch: PropTypes.bool.isRequired, // 검색 실행 여부
  setTriggerSearch: PropTypes.func.isRequired, // 검색 실행 여부를 초기화하는 함수
};

export default BuddySearch;
