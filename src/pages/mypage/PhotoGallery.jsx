import { LoadingSpinner, TopHeader } from '@/components';
import { useFetchAllDiaryData } from '@/hooks';
import { groupByMonth } from '@/utils';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

const PhotoGallery = () => {
  const [loadedImages, setLoadedImages] = useState({});

  const { diaryData, loading } = useFetchAllDiaryData();

  const baseImageUrl = `${import.meta.env.VITE_PB_API}/files/diary`;

  // 1. diary DB에서 사진이 있는 DB만 골라오기
  const PictureWithDiary = diaryData.filter((data) => data.picture !== '');

  // 2. 그 DB들을 같은 년/월 끼리 그룹핑
  const photoGroupByMonth = groupByMonth(PictureWithDiary);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  if (loading) {
    return <LoadingSpinner text="하루몽이 사진을 불러오고 있어요" />;
  }
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

        {Object.keys(photoGroupByMonth).length === 0 ? (
          <div className="fixed flex flex-col items-center w-full gap-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <p className="mt-5 font-semibold text-center text-gray-300">
              아직 기록된 사진이 없어요
            </p>
          </div>
        ) : (
          Object.entries(photoGroupByMonth).map(([date, diaries]) => (
            <section key={date} className="grid gap-2 mb-4">
              <h2 className="font-semibold">{date}</h2>
              <div className="grid grid-cols-3 gap-4">
                {diaries.map((diary) => (
                  <div key={diary.id} className="relative">
                    {!loadedImages[diary.id] && (
                      <div className="min-w-[100px] min-h-[100px] rounded-[0.625rem] skeleton absolute inset-0"></div>
                    )}
                    <img
                      src={`${baseImageUrl}/${diary.id}/${diary.picture}`}
                      alt={`${diary.date}의 일기 사진`}
                      className={`object-cover w-full h-full aspect-square rounded-[0.625rem] ${
                        loadedImages[diary.id] ? '' : 'invisible'
                      }`}
                      onLoad={() => handleImageLoad(diary.id)}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </main>
    </>
  );
};

export default PhotoGallery;
