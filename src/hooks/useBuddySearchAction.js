import { useState, useCallback, useEffect } from 'react';
import pb from '@/api/pb';
import toast from 'react-hot-toast';
import { deleteFilter } from '@/utils';

export const useBuddySearchAction = (
  searchBuddy,
  triggerSearch,
  setTriggerSearch,
  closeModal
) => {
  const [userData, setUserData] = useState(null);
  const [relationshipStatus, setRelationshipStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = JSON.parse(localStorage.getItem('auth')).user.id;

  // 검색 로직
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

  // 검색 함수 실행
  useEffect(() => {
    if (triggerSearch && searchBuddy) {
      handleSearch();
    }
  }, [triggerSearch, searchBuddy, handleSearch]);

  // 단짝 신청 및 취소 처리 로직
  const handleBuddySearchAction = async () => {
    toast.remove();

    if (isSubmitting) return;
    setIsSubmitting(true);

    // 본인에게 단짝 신청을 보낸 경우
    if (userId === userData.id) {
      toast.error('자신에게 단짝 요청을 보낼 수 없습니다.', { duration: 2000 });
      setIsSubmitting(false);
      return;
    }

    // 이미 상대방에게서 단짝 요청을 받은 경우
    if (relationshipStatus === 'pending_recipient') {
      toast.error('이미 상대방에게 단짝 요청을 받았습니다.', {
        duration: 2000,
      });
      setIsSubmitting(false);
      return;
    }

    // 이미 상대방에게 단짝 요청을 보낸 경우
    if (relationshipStatus === 'pending_requester') {
      const deletePromise = toast.promise(
        (async () => {
          // 1) buddy 데이터 삭제
          await deleteFilter(
            'buddy',
            `requester = "${userId}" && recipient = "${userData.id}" && status = "pending"`
          );

          // 2) notification 데이터 삭제
          await deleteFilter(
            'notification',
            `requester = "${userId}" && recipient = "${userData.id}" && type = "단짝"`
          );
        })(),
        {
          loading: '단짝 신청 취소 중...',
          success: '단짝 신청이 취소되었습니다!',
          error: '단짝 신청 취소에 실패했습니다.',
        },
        { duration: 2000 }
      );

      deletePromise
        .then(() => {
          closeModal();
        })
        .catch((error) => {
          console.error('[Error] 신청 취소 실패:', error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
      return;
    }

    // 단짝 신청 처리
    try {
      const buddyPromise = pb.collection('buddy').create({
        recipient: userData.id,
        requester: userId,
        status: 'pending',
      });

      toast
        .promise(
          buddyPromise,
          {
            loading: '단짝 신청 중...',
            success: '단짝 신청을 보냈습니다!',
            error: '단짝 신청에 실패했습니다.',
          },
          { duration: 2000 }
        )
        .then(async (buddy) => {
          await pb.collection('notification').create({
            recipient: userData.id,
            requester: userId,
            type: '단짝',
            type_id: buddy.id,
          });
          closeModal();
        })
        .catch((error) => {
          console.error('[Error] 단짝 신청 실패:', error);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    } catch (error) {
      toast.error('단짝 신청에 실패했습니다.', { duration: 2000 });
      setIsSubmitting(false);
      console.error(error);
    }
  };

  return {
    handleBuddySearchAction,
    isSubmitting,
    userData,
    relationshipStatus,
    errorMessage,
    loading,
  };
};

export default useBuddySearchAction;
