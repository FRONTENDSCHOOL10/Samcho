import { DiaryDetail, TopHeader } from '@/components';

export const Component = () => {
  return (
    <div>
      <TopHeader title="2024-08-31" isShowIcon={true} />
      <DiaryDetail selectedDate="2024-08-31" />
    </div>
  );
};
