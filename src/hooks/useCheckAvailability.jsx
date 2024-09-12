import { useState } from 'react';
import pb from '@/api/pb';
import toast from 'react-hot-toast';
import { validateUsername, validateNickname } from '@/utils';

export const useCheckAvailability = () => {
  const [duplicate, setDuplicate] = useState({ username: false, name: false });

  // 중복 확인 함수
  const checkAvailability = async (field, value) => {
    toast.dismiss();

    switch (field) {
      case 'username':
        if (!validateUsername(value)) {
          toast.error('아이디 형식이 올바르지 않습니다.');
          return;
        }

        try {
          const existingUser = await pb
            .collection('users')
            .getFirstListItem(`username="${value}"`);
          if (existingUser) {
            toast.error('이미 존재하는 아이디 입니다.');
            setDuplicate((prev) => ({ ...prev, username: false }));
          }
        } catch (error) {
          if (error.status === 404) {
            toast.success('사용 가능한 아이디 입니다!');
            setDuplicate((prev) => ({ ...prev, username: true }));
          } else {
            throw error;
          }
        }
        break;

      case 'name':
        if (!validateNickname(value)) {
          toast.error('닉네임 형식이 올바르지 않습니다.');
          return;
        }

        try {
          const existingUser = await pb
            .collection('users')
            .getFirstListItem(`name="${value}"`);
          if (existingUser) {
            toast.error('이미 존재하는 닉네임 입니다!');
            setDuplicate((prev) => ({ ...prev, name: false }));
          }
        } catch (error) {
          if (error.status === 404) {
            toast.success('사용 가능한 닉네임 입니다!');
            setDuplicate((prev) => ({ ...prev, name: true }));
          } else {
            throw error;
          }
        }
        break;

      default:
        toast.error('알 수 없는 필드입니다.');
        break;
    }
  };

  // 중복 상태 초기화 함수
  const resetDuplicate = (field) => {
    setDuplicate((prev) => ({ ...prev, [field]: false }));
  };

  return { duplicate, checkAvailability, resetDuplicate };
};

export default useCheckAvailability;
