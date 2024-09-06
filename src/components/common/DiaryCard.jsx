import PropTypes from 'prop-types';
import { Delete, Edit, Share } from '@/assets/icons/diarylist';
import moods from '@/assets/icons/mood/moods';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';

const DiaryCard = ({ date, type = 'icons' }) => {
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
      <h2 className="sr-only">{`${date} 작성한 일기`}</h2>
      {dateOrIcons}
      <div className="flex flex-col w-full p-4 bg-white h-fit rounded-[0.625rem] shadow-light gap-4">
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-1 w-fit">
            <img
              src={moods['행복']}
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
            <img
              src="/icons/weathers/rainy.png"
              alt="비"
              className="w-6 h-6"
              aria-label="비 아이콘"
            />
            <img
              src="/icons/weathers/rainy.png"
              alt="비"
              className="w-6 h-6"
              aria-label="비 아이콘"
            />
            <img
              src="/icons/weathers/rainy.png"
              alt="비"
              className="w-6 h-6"
              aria-label="비 아이콘"
            />
            <img
              src="/icons/weathers/rainy.png"
              alt="비"
              className="w-6 h-6"
              aria-label="비 아이콘"
            />
            <img
              src="/icons/weathers/rainy.png"
              alt="비"
              className="w-6 h-6"
              aria-label="비 아이콘"
            />
            <img
              src="/icons/weathers/rainy.png"
              alt="비"
              className="w-6 h-6"
              aria-label="비 아이콘"
            />
            <img
              src="/icons/weathers/rainy.png"
              alt="비"
              className="w-6 h-6"
              aria-label="비 아이콘"
            />
          </div>
        </div>
        <div className="flex flex-row gap-3">
          {!isImageLoaded && (
            <div className="min-w-[100px] min-h-[80px] rounded-[0.625rem] skeleton"></div>
          )}
          <img
            src="https://picsum.photos/600/400"
            alt={date}
            className={`max-w-[100px] max-h-[80px] rounded-[0.625rem] ${
              !isImageLoaded ? 'hidden' : 'block'
            }`}
            onLoad={() => setIsImageLoaded(true)}
            aria-label={`${date} 기록한 사진`}
          />
          <p className="text-sm font-medium text-left custom-line-clamp-4">
            한 여름 밤, 도심의 불빛이 반짝이는 고요한 거리에서 나는 산책을 했다.
            가로등 아래에서 비치는 따스한 빛이 나를 감싸 안았다. 거리는
            조용했지만, 마음속에는 소란한 생각들이 가득했다. 이 도시에서의 삶은
            때로는 혼란스럽고 복잡하지만, 이런 순간에는 평온함을 찾을 수 있다.
            길 끝에 다다르면 작은 공원이 있고, 그곳에서 나는 잠시 앉아 별을
            바라보며 미래를 꿈꿨다. 밤하늘의 별빛은 희망을 상징하며, 나는 그
            빛을 따라 나아가기로 결심했다.
          </p>
        </div>
      </div>
    </article>
  );
};

DiaryCard.propTypes = {
  date: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['icons', 'date']),
};

export default DiaryCard;
