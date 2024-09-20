import { useState } from 'react';
import pb from '@/api/pb';
import toast from 'react-hot-toast';

export const useCheckAvailability = () => {
  const [duplicate, setDuplicate] = useState({
    username: false,
    name: false,
    email: false,
  });

  // 중복 확인 함수
  const checkAvailability = async (field, value) => {
    toast.remove();
    switch (field) {
      case 'username':
        toast
          .promise(
            pb.collection('users').getFullList({
              filter: `username = "${value}"`,
            }),
            {
              loading: '아이디 중복 여부 확인중...',
              success: (result) => {
                if (result.length === 0) {
                  setDuplicate((prev) => ({ ...prev, username: true }));
                  return '사용 가능한 아이디 입니다.';
                } else {
                  setDuplicate((prev) => ({ ...prev, username: false }));
                  throw new Error('중복된 아이디 입니다.');
                }
              },
              error: '중복된 아이디 입니다.',
            },
            {
              id: 'usernameDuplicateToast',
            }
          )
          .catch((error) => {
            setDuplicate((prev) => ({ ...prev, username: false }));
            console.error('[Error] 아이디 중복 체크: ', error);
          });
        break;

      case 'name':
        toast
          .promise(
            pb.collection('users').getFullList({
              filter: `name = "${value}"`,
            }),
            {
              loading: '닉네임 중복 여부 확인중...',
              success: (result) => {
                if (result.length === 0) {
                  setDuplicate((prev) => ({ ...prev, name: true }));
                  return '사용 가능한 닉네임 입니다.';
                } else {
                  setDuplicate((prev) => ({ ...prev, name: false }));
                  throw new Error('중복된 닉네임 입니다.');
                }
              },
              error: '중복된 닉네임 입니다.',
            },
            {
              id: 'nameDuplicateToast',
            }
          )
          .catch((error) => {
            setDuplicate((prev) => ({ ...prev, name: false }));
            console.error('[Error] 닉네임 중복 체크: ', error);
          });
        break;

      case 'email':
        toast
          .promise(
            pb.collection('users').getFullList({
              filter: `email = "${value}"`,
            }),
            {
              loading: '이메일 중복 여부 확인중...',
              success: (result) => {
                if (result.length === 0) {
                  setDuplicate((prev) => ({ ...prev, email: true }));
                  return '사용 가능한 이메일 입니다.';
                } else {
                  setDuplicate((prev) => ({ ...prev, email: false }));
                  throw new Error('중복된 이메일 입니다.');
                }
              },
              error: '중복된 이메일 입니다.',
            },
            {
              id: 'emailDuplicateToast',
            }
          )
          .catch((error) => {
            setDuplicate((prev) => ({ ...prev, name: false }));
            console.error('[Error] 이메일 중복 체크: ', error);
          });
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
