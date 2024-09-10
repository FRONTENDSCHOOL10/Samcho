import PropTypes from 'prop-types';
import { Delete, Edit, Share } from '@/assets/icons/diarylist';
import moods from '@/assets/icons/mood/moods';
import emotions from '@/assets/icons/emotions/emotions';
import weathers from '@/assets/icons/weather/weathers';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';

const DiaryCard = ({ diary, type = 'icons' }) => {
  const { id, date, mood, emotion, weather, picture, content } = diary;
  const baseImageUrl = `${import.meta.env.VITE_PB_API}/files/diary`;

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const day = format(new Date(date), 'dd E', { locale: ko });

  const formattedDate =
    type === 'date'
      ? format(new Date(date), 'yyyy년 M월 d일 EEEE', { locale: ko })
      : null;

  const dateOrIcons =
    type === 'date' ? (
      <span className="text-sm font-medium text-right text-gray-700">
        {formattedDate}
      </span>
    ) : (
      <div
        className="flex flex-row justify-end gap-3"
        role="group"
        aria-label="일기 관리"
      >
        <button type="button" aria-label="일기 삭제" title="일기 삭제">
          <Delete aria-hidden={true} />
        </button>
        <button type="button" aria-label="일기 수정" title="일기 수정">
          <Edit aria-hidden={true} />
        </button>
        <button type="button" aria-label="일기 공유" title="일기 공유">
          <Share aria-hidden={true} />
        </button>
      </div>
    );

  return (
    <article className="flex flex-col w-full gap-2">
      <h3 className="sr-only">{`${date} 작성한 일기`}</h3>
      {dateOrIcons}
      <div className="flex flex-col w-full p-4 bg-white h-fit rounded-[0.625rem] shadow-light gap-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-3">
            <img
              src={moods[mood]}
              width={30}
              height={30}
              alt="행복"
              aria-label="행복 아이콘"
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
                className={`min-w-[100px] min-h-[80px] rounded-[0.625rem] ${
                  !isImageLoaded ? 'hidden' : 'block'
                }`}
                width={100}
                height={100}
                onLoad={() => setIsImageLoaded(true)}
                aria-label={`${date}일에 기록한 사진`}
              />
            </>
          )}
          <p className="text-sm font-medium text-left custom-line-clamp-4">
            {content}
          </p>
        </div>
      </div>
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
  }).isRequired,
  type: PropTypes.oneOf(['icons', 'date']),
};

export default DiaryCard;
