import PropTypes from 'prop-types';
import { Delete, Edit, Share } from '@/assets/icons/diarylist';
import moods from '@/assets/icons/mood/moods';
import emotions from '@/assets/icons/emotions/emotions';
import weathers from '@/assets/icons/weather/weathers';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '..';
import { useModal } from '@/hooks';
import { pb } from '@/api';
import toast from 'react-hot-toast';

const DiaryCard = ({ diary, type = 'icons', onDelete }) => {
  console.log('다이어리 카드 실행');
  const { id, date, mood, emotion, weather, picture, content, expand } = diary;
  const { isOpen, openModal, closeModal } = useModal();

  const baseImageUrl = `${import.meta.env.VITE_PB_API}/files/diary`;

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const day = format(new Date(date), 'dd E', { locale: ko });

  const handleDiaryDelete = async () => {
    closeModal('deleteModal');

    try {
      await pb.collection('diary').delete(id);
    } catch (error) {
      toast.error('일기 삭제 중 오류가 발생했습니다.');
      console.error('[error] 다이어리 삭제 실패: ', error);
    } finally {
      toast.success('일기 삭제가 완료되었습니다.');
      onDelete(id); // 상태 업데이트
    }
  };

  const formattedDate =
    type === 'date'
      ? format(new Date(date), 'yyyy년 M월 d일 EEEE', { locale: ko })
      : null;

  const dateOrIcons =
    type === 'date' ? (
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-450">
          From.{expand?.user?.name}
        </span>
        <span className="text-sm font-medium text-right text-gray-450">
          {formattedDate}
        </span>
      </div>
    ) : (
      <div
        className="flex flex-row justify-end gap-3"
        role="group"
        aria-label="일기 관리"
      >
        <button type="button" aria-label="일기 공유" title="일기 공유">
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
      </div>
    );

  return (
    <article className="flex flex-col w-full gap-2">
      <h3 className="sr-only">{`${date} 작성한 일기`}</h3>
      {dateOrIcons}
      <Link
        to={`/diary/detail/${id}`}
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
              사진이 없어요...
            </div>
          ) : (
            <>
              {!isImageLoaded && (
                <div className="min-w-[100px] min-h-[100px] rounded-[0.625rem] skeleton"></div>
              )}
              <img
                src={`${baseImageUrl}/${id}/${picture}`}
                alt={`${date} 사진`}
                className={`rounded-[0.625rem] aspect-square ${
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
      <Modal
        isOpen={isOpen('deleteModal')}
        closeModal={() => closeModal('deleteModal')}
      >
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-500">일기삭제</h2>
          <p className="font-medium text-gray-500">
            <strong>{date}</strong> 일기를 삭제 하시겠습니까?
          </p>
          <div className="flex flex-row justify-end w-full gap-2">
            <button
              type="button"
              className="px-3 py-1 text-white rounded-md bg-red"
              onClick={() => closeModal('deleteModal')}
            >
              아니오
            </button>
            <button
              type="button"
              className="px-3 py-1 text-white bg-blue-500 rounded-md"
              onClick={handleDiaryDelete}
            >
              예
            </button>
          </div>
        </div>
      </Modal>
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
  type: PropTypes.oneOf(['icons', 'date']),
  onDelete: PropTypes.func,
};

export default memo(DiaryCard);
