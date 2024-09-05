import { DiaryDetail, TopHeader } from '@/components';
import { useLocation } from 'react-router-dom';

const DetailDiary = () => {
  const location = useLocation();
  const selectedDate = location.state?.selectedDate;

  return (
    <div>
      <TopHeader isShowIcon={true} title={selectedDate} />
      <DiaryDetail selectedDate={selectedDate} />
    </div>
  );
};

export default DetailDiary;
