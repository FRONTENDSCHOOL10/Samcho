import pb from '@/api/pb';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetchDiaryDetail = (diaryId) => {
  const [diaryDetail, setDiaryDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        if (!diaryId) {
          return;
        }

        const record = await pb.collection('diary').getOne(diaryId);

        setDiaryDetail({
          date: record.date.split(' ')[0],
          id: record.id,
          mood: record.mood,
          emotion: record.emotion,
          weather: record.weather,
          picture: record.picture,
          content: record.content,
        });
      } catch (error) {
        if (error.status === 0) return;
        console.error('Data fetch error', error);
        navigate('/error');
      }
      setLoading(false);
    };

    getData();
  }, [diaryId, navigate]);

  return { diaryDetail, loading };
};

export default useFetchDiaryDetail;
