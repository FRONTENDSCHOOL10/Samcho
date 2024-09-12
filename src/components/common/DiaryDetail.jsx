import emotions from '@/assets/icons/emotions/emotions';
import { Delete, Edit } from '@/assets/icons/menu';
import moods from '@/assets/icons/mood/moods';
import weathers from '@/assets/icons/weather/weathers';
import PropTypes from 'prop-types';
import { Button, CheckBox, Modal } from '..';
import { useModal, useFetchAllBuddyData } from '@/hooks';
import { useState, memo } from 'react';
import toast from 'react-hot-toast';
import { pb } from '@/api';

const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const DiaryDetail = ({ diaryDetail }) => {
  const baseImageUrl = `${import.meta.env.VITE_PB_API}/files/diary`;
  const userId = JSON.parse(localStorage.getItem('auth'))?.user?.id;

  const dateObj = new Date(diaryDetail.date);
  const day = dateObj.getDate();
  const weekday = WEEK_DAYS[dateObj.getDay()];
  const dateFormatted = `${day} ${weekday}`;

  // 감정 아이콘 최대 5개,  날씨 아이콘 최대 5개
  const combinedIcons = [...diaryDetail.emotion, ...diaryDetail.weather].slice(
    0.7
  );

  const [checkedIndex, setCheckedIndex] = useState(null);
  const [buddy, setBuddy] = useState('');

  const { isOpen, openModal, closeModal } = useModal();
  const { buddyData } = useFetchAllBuddyData();

  if (!diaryDetail) return;

  const handleChange = (buddyId, index) => {
    setCheckedIndex(index);
    setBuddy(buddyId);
  };

  const handleExchange = async () => {
    try {
      const existingRequest = await pb.collection('notification').getFullList({
        filter: `recipient = "${buddy}" && requester = "${userId}" && type = "교환일기"`,
      });

      if (existingRequest.length > 0) {
        toast.error('이미 해당 사용자와 교환중인 일기가 있습니다.');
        return;
      }

      const post = await pb.collection('post').create({
        recipient: buddy,
        requester: userId,
        requester_diary: diaryDetail.id,
        status: 'pending',
      });

      await pb.collection('notification').create({
        recipient: buddy,
        requester: userId,
        type: '교환일기',
        type_id: post.id,
      });

      toast.success('일기 교환 신청을 보냈습니다!');
    } catch (error) {
      toast.error('일기 교환 신청에 실패했습니다.');
      console.error(error);
    }
  };

  return (
    <>
      <article className="w-full bg-white rounded-[10px] shadow-light p-[0.9375rem] mt-[30px] ">
        <h2 className="sr-only">{`${weekday}요일 감정 일기`}</h2>
        <div className="flex justify-end gap-[15px]">
          <button type="button" aria-label="일기 수정">
            <Edit className="w-5 h-5 fill-gray-400" />
          </button>
          <button type="button" aria-label="일기 삭제">
            <Delete className="w-5 h-5 fill-gray-400" />
          </button>
        </div>

        <div className="flex flex-col gap-y-5">
          <div className="flex flex-col items-center gap-2">
            <img
              key={diaryDetail.date}
              src={moods[diaryDetail.mood]}
              alt={`${diaryDetail.mood} 아이콘`}
              className="w-[44px] h-[44px]"
            />
            <span className="text-base font-semibold text-gray-450">
              {dateFormatted}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center w-full gap-2 align-center">
            {combinedIcons.map((item, idx) => (
              <img
                key={idx}
                className="inline-block object-contain w-10 h-10 bg-white rounded-full"
                alt={item}
                src={emotions[item] || weathers[item]}
                loading="lazy"
              />
            ))}
          </div>

          {diaryDetail.picture ? (
            <>
              <img
                src={`${baseImageUrl}/${diaryDetail.id}/${diaryDetail.picture}`}
                className="object-cover w-full rounded-lg bg-blue-50 aspect-square"
                alt={`${diaryDetail.date}일에 기록된 사진`}
                loading="lazy"
              />
              <p className="text-sm font-medium leading-normal text-blue-500">
                {diaryDetail.content}
              </p>
            </>
          ) : (
            <p className="text-sm font-medium leading-relaxed text-blue-500">
              {diaryDetail.content}
            </p>
          )}
        </div>
      </article>
      <footer className="fixed bottom-0 w-full max-w-[27.5rem] bg-white py-4 z-50 shadow-top -mx-5 px-5">
        <Button
          text="교환하기"
          size="large"
          onClick={() => openModal('buddyListModal')}
        />
      </footer>
      <Modal
        isOpen={isOpen('buddyListModal')}
        closeModal={() => closeModal('buddyListModal')}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-500">단짝 리스트</h2>
          {buddyData.map((buddy, idx) => (
            <CheckBox
              key={buddy.buddyId}
              label={buddy.buddyName}
              checked={checkedIndex === idx}
              onChange={() => handleChange(buddy.buddyId, idx)}
            />
          ))}
          <button
            type="button"
            className="py-2 font-medium text-white rounded-md bg-blue"
            onClick={handleExchange}
          >
            교환신청
          </button>
        </div>
      </Modal>
    </>
  );
};

DiaryDetail.propTypes = {
  diaryDetail: PropTypes.object.isRequired,
};

export default memo(DiaryDetail);
