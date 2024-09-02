import { TextArea, TopHeader } from '@/components';

export const Component = () => {
  return (
    <div>
      <TopHeader title={'일기작성'} isShowIcon={true} />
      <TextArea />
    </div>
  );
};
