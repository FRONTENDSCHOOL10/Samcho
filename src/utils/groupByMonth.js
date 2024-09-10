/* 데이터를 연/월 기준으로 그룹화하고 최신순으로 정렬하는 함수 */
export const groupByMonth = (data) => {
  const groupedData = data.reduce((group, item) => {
    const [year, month] = item.date.split('-');
    const dateKey = `${year}년 ${parseInt(month, 10)}월`;

    if (!group[dateKey]) group[dateKey] = [];

    group[dateKey].push(item);
    return group;
  }, {});

  // 그룹화된 데이터를 최신순으로 정렬하여 반환
  return Object.keys(groupedData)
    .sort(
      (a, b) =>
        new Date(`${b.replace('년 ', '-').replace('월', '')}-01`) -
        new Date(`${a.replace('년 ', '-').replace('월', '')}-01`)
    )
    .reduce((acc, key) => {
      acc[key] = groupedData[key].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      return acc;
    }, {});
};
