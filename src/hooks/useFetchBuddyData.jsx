import { useState, useEffect } from 'react';
import pb from '@/api/pb';
import { useNavigate } from 'react-router-dom';

const useFetchBuddyData = () => {
  const [buddyData, setBuddyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('auth'))?.user?.id;

  useEffect(() => {
    let isMounted = true;

    const fetchBuddyData = async () => {
      try {
        const records = await pb.collection('buddy').getFullList({
          filter: `user = "${userId}"`,
          sort: '-created',
          expand: 'buddy',
        });

        if (isMounted) {
          const formattedData = records.map((record) => ({
            buddyId: record.buddy,
            buddyName: record.expand.buddy?.name || 'Unknown',
            created: record.created,
          }));

          setBuddyData(formattedData);
        }
      } catch (error) {
        if (isMounted) {
          console.error('Data fetch error', error);
          navigate('/error');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchBuddyData();

    return () => {
      isMounted = false;
    };
  }, [navigate, userId]);

  return { buddyData, loading };
};

export default useFetchBuddyData;
