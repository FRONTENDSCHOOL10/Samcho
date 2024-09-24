import { create } from 'zustand';
import { format } from 'date-fns';
import pb from '@/api/pb';

const useMonthlyDateStore = create((set, get) => ({
  viewMode: 'calendar',
  selectedMood: '전체',
  selectedMonth: format(new Date(), 'yyyy-MM'),
  diaryData: [],
  loading: false,

  // viewMode 변경
  setViewMode: (mode) => set({ viewMode: mode }),

  // 필터링 기분 변경
  setSelectedMood: (mood) => set({ selectedMood: mood }),

  // selectedMonth 변경 시 서버 통신
  setSelectedMonth: async (month) => {
    const { selectedMonth } = get();

    // selectedMonth가 변경되었을 때만 서버 통신
    if (selectedMonth !== month) {
      set({ selectedMonth: month, loading: true });
      const userId = JSON.parse(localStorage.getItem('auth')).user.id;

      try {
        const data = await fetchMonthlyDiaryData(month, userId); // 서버에서 데이터 가져오기
        set({ diaryData: data, loading: false });
      } catch (error) {
        if (error.status === 0) return;
        console.error('Data fetch error', error);
        set({ loading: false });
      }
    }
  },

  // 스토어 초기화 시 데이터를 가져옴 (초기 진입 시)
  initialize: async () => {
    const { diaryData, selectedMonth } = get();

    // 데이터가 없으면 서버 통신 (초기 로드)
    if (diaryData.length === 0) {
      const userId = JSON.parse(localStorage.getItem('auth')).user.id;
      set({ loading: true });

      try {
        const data = await fetchMonthlyDiaryData(selectedMonth, userId);
        set({ diaryData: data, loading: false });
      } catch (error) {
        if (error.status === 0) return;
        console.error('Data fetch error', error);
        set({ loading: false });
      }
    }
  },

  setDiaryData: (action, data) =>
    set((state) => {
      const newData = {
        date: data.date.split(' ')[0],
        id: data.id,
        mood: data.mood,
        emotion: data.emotion,
        weather: data.weather,
        picture: data.picture,
        content: data.content,
      };

      let updatedDiaryData;

      switch (action) {
        case 'create':
          // 새 일기 추가
          updatedDiaryData = [...state.diaryData, newData];
          break;

        case 'update':
          // 기존 일기 수정
          updatedDiaryData = state.diaryData.map((item) =>
            item.id === newData.id ? { ...item, ...newData } : item
          );
          break;

        case 'delete':
          // 일기 삭제
          updatedDiaryData = state.diaryData.filter(
            (item) => item.id !== data.id
          );
          break;

        default:
          console.error('action 값 불일치');
          return state; // 상태 변경 없음
      }

      return { diaryData: updatedDiaryData };
    }),
}));

const fetchMonthlyDiaryData = async (selectedMonth, userId) => {
  const records = await pb.collection('diary').getList(1, 31, {
    filter: `user = "${userId}" && date >= "${selectedMonth}-01 00:00:00" && date <= "${selectedMonth}-31 23:59:59"`,
    sort: 'date',
    expand: 'user',
  });

  return records.items.map(
    ({ date, id, mood, emotion, weather, picture, content }) => ({
      date: date.split(' ')[0],
      id,
      mood,
      emotion,
      weather,
      picture,
      content,
    })
  );
};

export default useMonthlyDateStore;
