/* 데이터를 연/월 기준으로 그룹화하고 최신순으로 정렬하는 함수 */
export const groupByMonth = (data) => {
  return data.reduce((group, item) => {
    const [year, month] = item.date.split('-');
    const dateKey = `${year}년 ${parseInt(month, 10)}월`;

    if (!group[dateKey]) group[dateKey] = [];

    group[dateKey].push(item);
    return group;
  }, {});
};
