import pb from '@/api/pb';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useFetchAllDiaryData = () => {
  const navigate = useNavigate();

  const [diaryData, setDiaryData] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = JSON.parse(localStorage.getItem('auth')).user.id;

  useEffect(() => {
    const getData = async () => {
      try {
        const records = await pb.collection('diary').getFullList({
          filter: `user = "${userId}"`,
          sort: '-date',
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
        if (error.status === 0) return;
        console.error('Data fetch error', error);
        navigate('/error');
      }
      setLoading(false);
    };

    getData();
  }, [navigate, userId]);

  return { diaryData, loading };
};

export default useFetchAllDiaryData;
