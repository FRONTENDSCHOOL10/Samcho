import { TopHeader, ToggleTab, PostCard, DiaryCard } from '@/components';
import { useState } from 'react';

const BuddyManagement = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className="flex flex-col gap-10">
      <TopHeader title="단짝 관리" isShowIcon={true}></TopHeader>
      <ToggleTab
        tab1="나의 단짝"
        tab2="단짝 요청"
        activeTab={activeTab}
        onTab1Click={() => setActiveTab('tab1')}
        onTab2Click={() => setActiveTab('tab2')}
      />
      {activeTab === 'tab1' ? (
        <div
          className="flex flex-col gap-[15px]"
          id="panel-buddyList"
          role="tabpanel"
          aria-labelledby="tab-buddyList"
        ></div>
      ) : (
        <div
          className="flex flex-col gap-5"
          id="panel-buddyRequest"
          role="tabpanel"
          aria-labelledby="tab-buddyRequest"
        >
          <PostCard
            type="bestfriendconfirm"
            text="두팔님이 단짝 신청을 하였습니다. 수락하시겠습니까?"
          />
          <PostCard
            type="bestfriendconfirm"
            text="두팔님이 단짝 신청을 하였습니다."
          />
          <PostCard
            type="bestfriendconfirm"
            text="두팔님이 단짝 신청을 하였습니다."
          />
          <PostCard
            type="bestfriendconfirm"
            text="두팔님이 단짝 신청을 하였습니다."
          />
          <PostCard
            type="bestfriendconfirm"
            text="두팔님이 단짝 신청을 하였습니다."
          />
          <PostCard
            type="bestfriendconfirm"
            text="두팔님이 단짝 신청을 하였습니다."
          />
          <PostCard
            type="bestfriendconfirm"
            text="두팔님이 단짝 신청을 하였습니다."
          />
          <PostCard
            type="bestfriendconfirm"
            text="두팔님이 단짝 신청을 하였습니다."
          />
          <PostCard
            type="bestfriendconfirm"
            text="두팔님이 단짝 신청을 하였습니다."
          />
          <PostCard
            type="bestfriendconfirm"
            text="두팔님이 단짝 신청을 하였습니다."
          />
        </div>
      )}
    </div>
  );
};

export default BuddyManagement;
