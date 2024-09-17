import { DiaryDetail, LoadingSpinner, TopHeader } from '@/components';
import { useFetchDiaryDetail } from '@/hooks';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

export const Component = () => {
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
    <section className="min-h-dvh pb-[110px]">
      <TopHeader isShowIcon={true} title={diaryDate} />
      <DiaryDetail diaryDetail={diaryDetail} exchange={state} />
    </section>
  );
};
