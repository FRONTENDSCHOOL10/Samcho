import { ToggleTab, TopHeader } from '@/components';

const Post = () => {
  return (
    <div className="flex flex-col gap-5">
      <TopHeader title="우편함" />
      <ToggleTab tab1="알림" tab2="교환일기" />
    </div>
  );
};

export default Post;
