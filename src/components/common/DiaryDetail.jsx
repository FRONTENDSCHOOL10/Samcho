import emotions from '@/assets/icons/emotions/emotions';
import { Delete, Edit } from '@/assets/icons/menu';
import moods from '@/assets/icons/mood/moods';
import weathers from '@/assets/icons/weather/weathers';
import PropTypes from 'prop-types';
import { Button, BuddyListModal } from '..';
import { useModal, useFetchAllBuddyData, useDiaryActions } from '@/hooks';
import { useState, memo } from 'react';

const baseImageUrl = `${import.meta.env.VITE_PB_API}/files/diary`;
const WEEK_DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const DiaryDetail = ({ diaryDetail }) => {
  console.log('다이어리 디테일');
  const dateObj = new Date(diaryDetail.date);
  const day = dateObj.getDate();
  const weekday = WEEK_DAYS[dateObj.getDay()];
  const dateFormatted = `${day} ${weekday}`;

  const combinedIcons = [...diaryDetail.emotion, ...diaryDetail.weather].slice(
    0,
    7
  );

  const [checkedIndex, setCheckedIndex] = useState(null);
  const [buddy, setBuddy] = useState('');
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const { isOpen, openModal, closeModal } = useModal();
  const { buddyData } = useFetchAllBuddyData();
  const { exchangeDiary } = useDiaryActions(diaryDetail);

  if (!diaryDetail) return;

  const handleChange = (buddyId, index) => {
    setCheckedIndex(index);
    setBuddy(buddyId);
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <>
      <article className="w-full bg-white rounded-[10px] shadow-light p-[0.9375rem] mt-[30px] ">
        <h2 className="sr-only">{`${weekday}요일 감정 일기`}</h2>
        <div className="flex justify-end gap-[15px]">
          <button type="button" aria-label="일기 수정" title="일기 수정">
            <Edit className="w-5 h-5 fill-gray-400" aria-hidden="true" />
          </button>
          <button type="button" aria-label="일기 삭제" title="일기 삭제">
            <Delete className="w-5 h-5 fill-gray-400" aria-hidden="true" />
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
              {!isImageLoaded && (
                <div className="w-full rounded-lg aspect-square skeleton" />
              )}
              <img
                src={`${baseImageUrl}/${diaryDetail.id}/${diaryDetail.picture}`}
                className={`object-cover w-full rounded-lg aspect-square ${
                  isImageLoaded ? 'block' : 'hidden'
                }`}
                alt={`${diaryDetail.date}일에 기록된 사진`}
                onLoad={handleImageLoad}
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
      <BuddyListModal
        isOpen={isOpen('buddyListModal')}
        closeModal={() => closeModal('buddyListModal')}
        buddyData={buddyData}
        checkedIndex={checkedIndex}
        handleChange={handleChange}
        handleExchange={() => exchangeDiary(buddy, closeModal)}
      />
    </>
  );
};

DiaryDetail.propTypes = {
  diaryDetail: PropTypes.object.isRequired,
};

export default memo(DiaryDetail);
