import { useState, useEffect, useCallback } from 'react';
import { BuddyCard, TopHeader } from '@/components';
import useFetchBuddyData from '@/hooks/useFetchBuddyData';
import { format } from 'date-fns';

const BuddyManagement = () => {
  const { buddyData, loading } = useFetchBuddyData();
  const [buddies, setBuddies] = useState(buddyData);

  useEffect(() => {
    setBuddies(buddyData);
  }, [buddyData]);

  const handleDelete = useCallback((deletedBuddyId) => {
    setBuddies((prevBuddies) =>
      prevBuddies.filter((buddy) => buddy.buddyId !== deletedBuddyId)
    );
  }, []);

  if (loading) {
    return <p>로딩중...</p>;
  }

  return (
    <section className="min-h-dvh pb-[80px]">
      <TopHeader title="단짝 관리" isShowIcon={true}></TopHeader>
      <main className="flex flex-col gap-5 mt-5">
        <h2 className="sr-only">단짝 리스트</h2>

        {buddies.length > 0 ? (
          buddies.map(({ buddyName, created, buddyId }) => (
            <BuddyCard
              key={buddyId}
              buddyName={buddyName}
              startDate={format(new Date(created), 'yyyy-MM-dd')}
              buddyId={buddyId}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <p>단짝이 없습니다..!</p>
        )}
      </main>
    </section>
  );
};

export default BuddyManagement;
