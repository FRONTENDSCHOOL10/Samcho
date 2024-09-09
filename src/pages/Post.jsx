import { TopHeader, DiaryCard } from '@/components';

const Post = () => {
  return (
    <section className="flex flex-col gap-5 pb-[80px]">
      <TopHeader title="교환일기 우편함" />
      <main className="flex flex-col gap-5">
        <DiaryCard date="2024-08-02" type="date" />
        <DiaryCard date="2024-08-05" type="date" />
        <DiaryCard date="2024-08-11" type="date" />
        <DiaryCard date="2024-08-15" type="date" />
        <DiaryCard date="2024-08-18" type="date" />
        <DiaryCard date="2024-08-21" type="date" />
        <DiaryCard date="2024-08-30" type="date" />
      </main>
    </section>
  );
};

export default Post;
