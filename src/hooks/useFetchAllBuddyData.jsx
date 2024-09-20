import { useState, useEffect } from 'react';
import pb from '@/api/pb';
import { useNavigate } from 'react-router-dom';

const useFetchAllBuddyData = (includePending = false) => {
  const [buddyData, setBuddyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem('auth'))?.user?.id;

  useEffect(() => {
    let isMounted = true;

    const fetchBuddyData = async () => {
      try {
        // 상태 필터링: 기본적으로는 accepted만, 옵션에 따라 pending도 포함
        const statusFilter = includePending
          ? `(status = "accepted" || status = "pending")`
          : `status = "accepted"`;

        const records = await pb.collection('buddy').getFullList({
          filter: `(recipient = "${userId}" || requester = "${userId}") && ${statusFilter}`,
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
              id: record.id,
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
  }, [navigate, userId, includePending]);

  return { buddyData, loading };
};

export default useFetchAllBuddyData;
