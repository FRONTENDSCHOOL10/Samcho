import { useState, useEffect, useCallback } from 'react';
import { BuddyCard, LoadingSpinner, TopHeader } from '@/components';
import { useFetchAllBuddyData } from '@/hooks';
import { formatDate } from 'date-fns';
import { Helmet } from 'react-helmet-async';

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
    <>
      <Helmet>
        <title>하루몽 - 단짝관리</title>
        <meta name="description" content="하루몽 단짝관리 페이지 입니다." />
        <meta property="author" content="하루몽" />

        <meta property="og:locale" content="ko_KR" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://harumong.netlify.app/mypage/buddy-management"
        />
        <meta property="og:site_name" content="하루몽 - 감정일기" />
        <meta property="og:title" content="하루몽 - 감정일기" />
        <meta
          property="og:description"
          content="감정 기반으로 작성하는 일기 어플리케이션 하루몽"
        />
        <meta
          property="og:image"
          content="https://harumong.netlify.app/logo.webp"
        />
      </Helmet>

      <section className="min-h-dvh pb-[80px]">
        <TopHeader title="단짝 관리" isShowIcon={true}></TopHeader>
        <main className="flex flex-col gap-5 mt-5">
          <h2 className="sr-only">단짝 리스트</h2>
          {loading && <LoadingSpinner text="하루몽이 단짝을 불러오고 있어요" />}
          {buddies.length === 0 && !loading && (
            <div className="fixed flex flex-col items-center w-full gap-8 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
              <p className="font-medium text-center text-gray-400">
                아직 단짝이 존재하지 않아요!
              </p>
            </div>
          )}
          {buddies.map(({ buddyName, created, buddyId }) => (
            <BuddyCard
              key={buddyId}
              buddyName={buddyName}
              startDate={formatDate(created, 'yyyy-MM-dd HH:mm:ss')}
              buddyId={buddyId}
              onDelete={handleDelete}
            />
          ))}
        </main>
      </section>
    </>
  );
};

export default BuddyManagement;
