import { useState, useEffect } from 'react';
import pb from '@/api/pb';
import { useNavigate } from 'react-router-dom';

const useFetchAllBuddyData = () => {
  const [buddyData, setBuddyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('auth'))?.user?.id;

  useEffect(() => {
    let isMounted = true;

    const fetchBuddyData = async () => {
      try {
        const records = await pb.collection('buddy').getFullList({
          filter: `(recipient = "${userId}" || requester = "${userId}") && status = "accepted"`,
          sort: '-created',
          expand: 'recipient, requester',
        });

        if (isMounted) {
          const formattedData = records.map((record) => {
            const buddy =
              record.recipient === userId
                ? record.expand.requester
                : record.expand.recipient;
            return {
              buddyId: buddy.id,
              buddyName: buddy.name,
              created: record.created,
            };
          });

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

export default useFetchAllBuddyData;
