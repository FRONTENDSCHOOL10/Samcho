import { DiaryDetail, TopHeader } from '@/components';
import { useFetchDiaryDetail } from '@/hooks';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetailDiary = () => {
  const { id } = useParams();
  const { diaryDetail, loading } = useFetchDiaryDetail(id);
  const [diaryDate, setDiaryDate] = useState('');

  useEffect(() => {
    if (diaryDetail) {
      setDiaryDate(diaryDetail.date);
    }
  }, [diaryDetail]);

  if (loading) {
    console.log('로딩 중..');
    {
      /* 추후 로딩 처리 로직을 가져오거나..등 */
    }
  }

  if (!diaryDate) return;

  return (
    <section className="min-h-dvh pb-[110px]">
      <TopHeader isShowIcon={true} title={diaryDate} />
      <DiaryDetail diaryDetail={diaryDetail} />
    </section>
  );
};

export default DetailDiary;
