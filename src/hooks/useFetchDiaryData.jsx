import pb from '@/api/pb';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetchDiaryData = () => {
  const [diaryData, setDiaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const records = await pb.collection('diary').getFullList({
          sort: 'date',
          // auto cancellation 기능 비활성화
          requestKey: null,
        });

        const formattedData = records.map(
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
      } catch (error) {
        console.error('Data fetch error', error);
        navigate('/error');
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  return { diaryData, loading, error };
};

export default useFetchDiaryData;
