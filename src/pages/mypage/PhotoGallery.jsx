import { TopHeader } from '@/components';
import { useFetchAllDiaryData } from '@/hooks';
import { Helmet } from 'react-helmet-async';

const PhotoGallery = () => {
  const { diaryData, loading } = useFetchAllDiaryData();

  const baseImageUrl = `${import.meta.env.VITE_PB_API}/files/diary`;

  if (loading) {
    console.log('로딩 중..');
    {
      /* 추후 로딩 처리 로직을 가져오거나..등 */
    }
  }

  // 1. diary DB에서 사진이 있는 DB만 골라오기
  const PictureWithDiary = diaryData.filter((data) => data.picture !== '');

  // 2. 그 DB들을 같은 년/월 끼리 그룹핑
  const groupByMonth = PictureWithDiary.reduce((group, diary) => {
    let [year, month] = diary.date.split('-');
    month = parseInt(month, 10);
    const DateKey = `${year}년 ${month}월`;

    if (!group[DateKey]) group[DateKey] = [];

    group[DateKey].push(diary);
    return group;
  }, {});

  return (
    <>
      <Helmet>
        <title>하루몽 - 사진 모아보기</title>
        <meta name="description" content="하루몽 사진 모아보기 페이지입니다." />
        <meta property="og:title" content="하루몽 - 사진 모아보기" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://harumong.netlify.app/mypage/photo"
        />
        <meta
          property="og:description"
          content="감정일기의 사진을 모아보는 페이지입니다."
        />
        <meta property="og:image" content="" />
        <meta property="og:site:author" content="하루몽 일동" />
      </Helmet>

      <main className="grid gap-5 min-h-hdv pb-[80px]">
        <TopHeader isShowIcon={true} title="사진 모아보기" />

        {Object.entries(groupByMonth).map(([date, diaries]) => (
          <section key={date} className="grid gap-2 mb-4">
            <h2 className="font-semibold">{date}</h2>
            <div className="grid grid-cols-3 gap-4">
              {diaries.map((diary) => (
                <div key={diary.id} style={{ aspectRatio: '1 / 1' }}>
                  <img
                    src={`${baseImageUrl}/${diary.id}/${diary.picture}`}
                    alt={`${diary.date}의 일기 사진`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

export default PhotoGallery;
