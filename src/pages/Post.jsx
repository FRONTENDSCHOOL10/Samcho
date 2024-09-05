import { ToggleTab, TopHeader, PostCard, DiaryCard } from '@/components';
import { useState } from 'react';

const Post = () => {
  return (
    <div className="flex flex-col gap-10">
      <TopHeader title="교환일기 우편함" />
      <div className="flex flex-col gap-5">
        <DiaryCard date="2024-08-02" type="date" />
        <DiaryCard date="2024-08-05" type="date" />
        <DiaryCard date="2024-08-11" type="date" />
        <DiaryCard date="2024-08-15" type="date" />
        <DiaryCard date="2024-08-18" type="date" />
        <DiaryCard date="2024-08-21" type="date" />
        <DiaryCard date="2024-08-30" type="date" />
      </div>
    </div>
  );
};

export default Post;
