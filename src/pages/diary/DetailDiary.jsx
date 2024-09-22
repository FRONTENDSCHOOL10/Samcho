import { DiaryDetail, LoadingSpinner, TopHeader } from '@/components';
import { useFetchDiaryDetail } from '@/hooks';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useParams } from 'react-router-dom';

const DetailDiary = () => {
  const { id } = useParams();
  const { diaryDetail, loading } = useFetchDiaryDetail(id);
  const { state } = useLocation();

  const [diaryDate, setDiaryDate] = useState('');

  useEffect(() => {
    if (diaryDetail) {
      setDiaryDate(diaryDetail.date);
    }
  }, [diaryDetail]);

  if (loading) {
    return <LoadingSpinner text="하루몽이 일기를 가져오고 있어요" />;
  }

  if (!diaryDate) return;

  return (
    <>
      <Helmet>
        <title>하루몽 - 상세일기</title>
        <meta name="description" content="하루몽 상세일기 페이지 입니다." />
        <meta property="author" content="하루몽" />

        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://harumong.netlify.app/diary/detail"
        />
        <meta property="og:site_name" content="하루몽 - 감정일기" />
        <meta property="og:title" content="하루몽 - 감정일기" />
        <meta
          property="og:description"
          content="감정 기반으로 작성하는 일기 어플리케이션 하루몽"
        />
        <meta
          property="og:image"
          content="https://harumong.netlify.app/logo.png"
        />
      </Helmet>

      <section className="min-h-dvh pb-[110px]">
        <TopHeader isShowIcon={true} title={diaryDate} />
        <DiaryDetail diaryDetail={diaryDetail} exchange={state} />
      </section>
    </>
  );
};

export default DetailDiary;
