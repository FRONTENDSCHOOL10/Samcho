import { useState, useEffect, useCallback } from 'react';
import { BuddyCard, TopHeader } from '@/components';
import { useFetchAllBuddyData } from '@/hooks';
import { format } from 'date-fns';

const BuddyManagement = () => {
  const { buddyData, loading } = useFetchAllBuddyData();
  const [buddies, setBuddies] = useState(buddyData);

  useEffect(() => {
    setBuddies(buddyData);
  }, [buddyData]);

  const handleDelete = useCallback((deletedBuddyId) => {
    setBuddies((prevBuddies) =>
      prevBuddies.filter((buddy) => buddy.buddyId !== deletedBuddyId)
    );
  }, []);

  return (
    <section className="min-h-dvh pb-[80px]">
      <TopHeader title="단짝 관리" isShowIcon={true}></TopHeader>
      <main className="flex flex-col gap-5 mt-5">
        <h2 className="sr-only">단짝 리스트</h2>
        {loading && (
          <p className="font-medium text-center text-gray-300">
            단짝 데이터 불러오는 중...
          </p>
        )}
        {buddies.length === 0 && !loading && (
          <p className="font-medium text-center text-gray-300">
            아직 단짝이 존재하지 않아요!
          </p>
        )}
        {buddies.map(({ buddyName, created, buddyId }) => (
          <BuddyCard
            key={buddyId}
            buddyName={buddyName}
            startDate={format(new Date(created), 'yyyy-MM-dd')}
            buddyId={buddyId}
            onDelete={handleDelete}
          />
        ))}
      </main>
    </section>
  );
};

export default BuddyManagement;
