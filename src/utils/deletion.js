import { pb } from '@/api';

// filter 매개변수에는 조건을 넣으면 그 조건에 해당하는 데이터 전부 삭제
export const deleteFilter = async (collectionName, filter) => {
  const items = await pb.collection(collectionName).getFullList({
    filter,
  });

  if (items.length > 0) {
    await Promise.all(
      items.map((item) => pb.collection(collectionName).delete(item.id))
    );
  }
};

// useFetch 훅으로 불러온 데이터 전부 삭제
export const deleteData = async (data, collectionName) => {
  if (data && data.length > 0) {
    await Promise.all(
      data.map((item) => pb.collection(collectionName).delete(item.id))
    );
  }
};
