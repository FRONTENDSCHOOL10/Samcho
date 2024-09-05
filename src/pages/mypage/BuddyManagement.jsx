import { TopHeader, ToggleTab, PostCard, BuddyCard } from '@/components';
import { useState } from 'react';

const BuddyManagement = () => {
  return (
    <div className="flex flex-col gap-[38px]">
      <TopHeader title="단짝 관리" isShowIcon={true}></TopHeader>
      <div className="flex flex-col gap-5">
        <BuddyCard buddyName="두팔" startDate="2023-10-04"></BuddyCard>
        <BuddyCard buddyName="치히로" startDate="2023-09-07"></BuddyCard>
        <BuddyCard buddyName="소피" startDate="2022-06-16"></BuddyCard>
        <BuddyCard buddyName="하울" startDate="2024-06-18"></BuddyCard>
        <BuddyCard buddyName="미츠미" startDate="2023-10-04"></BuddyCard>
        <BuddyCard buddyName="하쿠" startDate="2023-7-06"></BuddyCard>
      </div>
    </div>
  );
};

export default BuddyManagement;
