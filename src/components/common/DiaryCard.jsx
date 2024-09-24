import PropTypes from 'prop-types';
import { Delete, Edit, Share } from '@/assets/icons/diarylist';
import moods from '@/assets/icons/mood/moods';
import emotions from '@/assets/icons/emotions/emotions';
import weathers from '@/assets/icons/weather/weathers';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmModal, BuddyListModal } from '..';
import { useModal, useDiaryActions } from '@/hooks';
const baseImageUrl = `${import.meta.env.VITE_PB_API}/files/diary`;

const DiaryCard = ({
  diary,
  buddyData,
  type = 'icons',
  exchange = false,
  timeAgo,
}) => {
  const { id, date, mood, emotion, weather, picture, content, expand } = diary;

  const day = format(new Date(date), 'dd E', { locale: ko });

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [checkedIndex, setCheckedIndex] = useState(null);
  const [buddy, setBuddy] = useState('');

  const { isOpen, openModal, closeModal } = useModal();
  const { deleteDiary, exchangeDiary } = useDiaryActions(diary);

  const handleChange = (buddyId, index) => {
    setCheckedIndex(index);
    setBuddy(buddyId);
  };

  const formattedDate =
    type === 'date' ? format(new Date(date), 'yyyy.MM.dd') : null;

  const dateOrIcons =
    type === 'date' ? (
      <div className="flex items-end justify-between">
        <span className="text-sm font-medium text-gray-450">
          From.{expand?.user?.name}
        </span>
        <div className="flex flex-col text-sm font-medium text-right text-gray-450">
          <span
            className="text-xs text-gray-300"
            aria-label={timeAgo === '방금 전' ? undefined : `${timeAgo} 경과`}
          >
            {timeAgo}
          </span>
          <span>{formattedDate}</span>
        </div>
      </div>
    ) : (
      <div
        className="flex flex-row justify-end gap-3"
        role="group"
        aria-label="일기 관리"
      >
        <button
          type="button"
          aria-label="일기 교환"
          title="일기 교환"
          onClick={() => openModal('buddyListModal')}
        >
          <Share aria-hidden={true} />
        </button>
        <Link
          to="/diary/new"
          state={{ date, diaryId: id }}
          aria-label="일기 수정"
          title="일기 수정"
        >
          <Edit aria-hidden={true} />
        </Link>
        <button
          type="button"
          aria-label="일기 삭제"
          title="일기 삭제"
          onClick={() => openModal('deleteModal')}
        >
          <Delete aria-hidden={true} />
        </button>
        <BuddyListModal
          isOpen={isOpen('buddyListModal')}
          closeModal={() => closeModal('buddyListModal')}
          buddyData={buddyData}
          checkedIndex={checkedIndex}
          handleChange={handleChange}
          handleExchange={() => exchangeDiary(buddy, closeModal)}
        />
      </div>
    );

  return (
    <article className="flex flex-col w-full gap-2">
      <h3 className="sr-only">{`${date} 작성한 일기`}</h3>
      {dateOrIcons}
      <Link
        to={`/diary/detail/${id}`}
        state={exchange}
        className="flex flex-col w-full p-4 bg-white h-fit rounded-[0.625rem] shadow-light gap-4"
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-3">
            <img
              src={moods[mood]}
              width={30}
              height={30}
              alt={mood}
              title={mood}
              aria-label={`${mood} 기분`}
              loading="lazy"
            />
            <span className="text-nowrap px-2.5 py-0.5 text-xs rounded-md bg-blue-50 text-gray-450 h-fit">
              {day}
            </span>
          </div>
          <div
            className="flex flex-row justify-end gap-1"
            role="group"
            aria-label="기록한 감정 및 날씨"
          >
            {[...emotion, ...weather].map((item, idx) => (
              <img
                key={idx}
                className="inline-block object-contain bg-white rounded-full"
                width={24}
                height={24}
                alt={item}
                title={item}
                src={emotions[item] || weathers[item]}
                loading="lazy"
              />
            ))}
          </div>
        </div>
        <div className="flex flex-row gap-3">
          {!picture ? (
            <div className="min-w-[100px] max-w-[100px] min-h-[100px] rounded-[0.625rem] bg-gray-100 text-xs content-center text-center font-medium text-gray-450">
              등록된
              <br />
              사진이 없어요
            </div>
          ) : (
            <>
              {!isImageLoaded && (
                <div className="min-w-[100px] min-h-[100px] rounded-[0.625rem] skeleton"></div>
              )}
              <img
                src={`${baseImageUrl}/${id}/${picture}`}
                alt={`${date} 사진`}
                className={`rounded-[0.625rem] aspect-square object-cover ${
                  !isImageLoaded ? 'hidden' : 'block'
                }`}
                width={100}
                height={100}
                onLoad={() => setIsImageLoaded(true)}
                aria-label={`${date}일에 기록한 사진`}
              />
            </>
          )}
          <p className="text-sm font-medium text-left custom-line-clamp-5 max-h-[100px]">
            {content}
          </p>
        </div>
      </Link>
      <ConfirmModal
        isOpen={isOpen('deleteModal')}
        closeModal={() => closeModal('deleteModal')}
        title="일기삭제"
        onConfirm={() => deleteDiary(diary, closeModal('deleteModal'))}
      >
        <strong>{date}</strong> 일기를 삭제 하시겠습니까?
      </ConfirmModal>
    </article>
  );
};

DiaryCard.propTypes = {
  diary: PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    mood: PropTypes.string.isRequired,
    emotion: PropTypes.array.isRequired,
    weather: PropTypes.array.isRequired,
    picture: PropTypes.string,
    content: PropTypes.string.isRequired,
    expand: PropTypes.object,
  }).isRequired,
  buddyData: PropTypes.arrayOf(
    PropTypes.shape({
      buddyId: PropTypes.string.isRequired,
      buddyName: PropTypes.string.isRequired,
    })
  ).isRequired,
  type: PropTypes.oneOf(['icons', 'date']),
  exchange: PropTypes.bool,
  timeAgo: PropTypes.string,
};

export default memo(DiaryCard);
