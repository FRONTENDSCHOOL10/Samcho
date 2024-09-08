import emotions from '@/assets/icons/emotions/emotions';
import { Delete, Edit } from '@/assets/icons/menu';
import moods from '@/assets/icons/mood/moods';
import weathers from '@/assets/icons/weather/weathers';
import PropTypes from 'prop-types';

const DiaryDetail = ({ diaryDetail }) => {
  console.log(diaryDetail);
  const baseImageUrl = `${import.meta.env.VITE_PB_API}/files/diary`;

  if (!diaryDetail) return;

  const dateObj = new Date(diaryDetail.date);
  const day = dateObj.getDate();
  const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
  const weekday = weekDays[dateObj.getDay()];
  const dateFormatted = `${day} ${weekday}`;

  // 감정 아이콘 최대 5개,  날씨 아이콘 최대 5개
  const combinedIcons = [...diaryDetail.emotion, ...diaryDetail.weather].slice(
    0.7
  );

  return (
    <article className="w-full bg-white rounded-[10px] shadow-light px-[25px] py-5 mt-[30px] ">
      <h2 className="sr-only">{`${weekday}요일 감정 일기`}</h2>
      <div className="flex justify-end gap-[15px]">
        <button type="button" aria-label="일기 수정">
          <Edit className="w-5 h-5 fill-gray-400 " />
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

        <div className="flex items-center justify-center w-full gap-2 align-center">
          {combinedIcons.map((item, idx) => (
            <img
              key={idx}
              className="inline-block object-contain w-10 h-10 bg-white rounded-full"
              alt={item}
              src={emotions[item] || weathers[item]}
            ></img>
          ))}
        </div>

        {diaryDetail.picture ? (
          <>
            <img
              src={`${baseImageUrl}/${diaryDetail.id}/${diaryDetail.picture}`}
              className="w-full rounded-xl bg-blue-50"
              alt={`${diaryDetail.date}의 사진`}
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
  );
};

DiaryDetail.propTypes = {
  diaryDetail: PropTypes.object.isRequired,
};

export default DiaryDetail;
