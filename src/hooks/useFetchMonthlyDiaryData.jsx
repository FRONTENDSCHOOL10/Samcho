import pb from '@/api/pb';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetchMonthlyDiaryData = (selectedMonth) => {
  const [diaryData, setDiaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const records = await pb.collection('diary').getList(1, 31, {
          filter: `date >= "${selectedMonth}-01 00:00:00" && date <= "${selectedMonth}-31 23:59:59"`,
          // 현재, pb 서버에 임의의 db를 넣느라 임의로 정렬 설정 해 놓음.
          // 추후 `-created` 등 변경 필요!!
          sort: 'date',
        });

        const formattedData = records.items.map(
          ({ date, id, mood, emotion, weather, picture, content }) => ({
            date: date.split(' ')[0],
            id,
            mood,
            emotion,
            weather,
            picture,
            content,
          })
        );
        setDiaryData(formattedData);
        console.log(formattedData);
      } catch (error) {
        if (error.status === 0) return;
        console.error('Data fetch error', error);
        navigate('/error');
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [selectedMonth, navigate]);

  return { diaryData, loading };
};

useFetchMonthlyDiaryData.propTypes = {
  diaryData: PropTypes.string.isRequired,
};

export default useFetchMonthlyDiaryData;
