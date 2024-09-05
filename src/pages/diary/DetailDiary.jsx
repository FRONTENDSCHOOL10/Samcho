import { DiaryDetail } from '@/components';
import { useLocation } from 'react-router-dom';

const DetailDiary = () => {
  const location = useLocation();
  const selectedDate = location.state?.selectedDate;

  return (
    <div>
      <DiaryDetail selectedDate={selectedDate} />
    </div>
  );
};

export default DetailDiary;
