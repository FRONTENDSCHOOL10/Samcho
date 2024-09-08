import { DiaryDetail, TopHeader } from '@/components';
import { useParams } from 'react-router-dom';

const DetailDiary = () => {
  const { date } = useParams();

  return (
    <div>
      <TopHeader isShowIcon={true} title={date} />
      <DiaryDetail selectedDate={date} />
    </div>
  );
};

export default DetailDiary;
