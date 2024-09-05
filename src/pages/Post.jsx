import { ToggleTab, TopHeader, PostCard, DiaryCard } from '@/components';
import { useState } from 'react';

const Post = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <div className="flex flex-col gap-5">
      <TopHeader title="우편함" />
      <ToggleTab
        tab1="알림"
        tab2="교환일기"
        activeTab={activeTab}
        onTab1Click={() => setActiveTab('tab1')}
        onTab2Click={() => setActiveTab('tab2')}
      />
      {activeTab === 'tab1' ? (
        <div
          className="flex flex-col gap-[15px]"
          id="panel-notification"
          role="tabpanel"
          aria-labelledby="tab-notification"
        >
          <PostCard
            type="postalert"
            text="두팔님이 단짝 신청을 하였습니다. 수락하시겠습니까?"
          />
          <PostCard type="postalert" text="두팔님이 단짝 신청을 하였습니다." />
          <PostCard type="postalert" text="두팔님이 단짝 신청을 하였습니다." />
          <PostCard type="postalert" text="두팔님이 단짝 신청을 하였습니다." />
          <PostCard type="postalert" text="두팔님이 단짝 신청을 하였습니다." />
          <PostCard type="postalert" text="두팔님이 단짝 신청을 하였습니다." />
          <PostCard type="postalert" text="두팔님이 단짝 신청을 하였습니다." />
          <PostCard type="postalert" text="두팔님이 단짝 신청을 하였습니다." />
          <PostCard type="postalert" text="두팔님이 단짝 신청을 하였습니다." />
        </div>
      ) : (
        <div
          className="flex flex-col gap-5"
          id="panel-exchangeDiaryList"
          role="tabpanel"
          aria-labelledby="tab-exchangeDiaryList"
        >
          <DiaryCard date="2024-08-02" type="date" />
          <DiaryCard date="2024-08-05" type="date" />
          <DiaryCard date="2024-08-11" type="date" />
          <DiaryCard date="2024-08-15" type="date" />
          <DiaryCard date="2024-08-18" type="date" />
          <DiaryCard date="2024-08-21" type="date" />
          <DiaryCard date="2024-08-30" type="date" />
        </div>
      )}
    </div>
  );
};

export default Post;
