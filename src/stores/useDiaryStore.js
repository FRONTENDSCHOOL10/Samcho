import { create } from 'zustand';
import { format } from 'date-fns';
import pb from '@/api/pb';

const useDiaryStore = create((set, get) => ({
  diaryData: [],
  isLoad: false,
  loading: false,
  fetchedMonths: new Set(),
  selectedMonth: format(new Date(), 'yyyy-MM'),
  error: null,

  setLoad: (isLoading) => set({ isLoad: isLoading }),
  setSelectedMonth: (month) => set({ selectedMonth: month }),

  fetchMonthlyDiaryData: async (month) => {
    if (get().fetchedMonths.has(month)) return;

    set({ loading: true, error: null });
    const userId = JSON.parse(localStorage.getItem('auth'))?.user?.id;

    if (!userId) {
      set({ error: new Error('User not authenticated'), loading: false });
      return;
    }

    try {
      const records = await pb.collection('diary').getList(1, 31, {
        filter: `user = "${userId}" && date >= "${month}-01 00:00:00" && date <= "${month}-31 23:59:59"`,
        sort: 'date',
        expand: 'user',
      });

      const formattedData = records.items.map(
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

      set((state) => ({
        diaryData: [...state.diaryData, ...formattedData],
        fetchedMonths: new Set(state.fetchedMonths).add(month),
        loading: false,
      }));
    } catch (error) {
      console.error('Data fetch error', error);
      set({ error, loading: false });
    }
  },

  addDiary: (newDiary) =>
    set((state) => ({
      diaryData: [...state.diaryData, newDiary],
    })),

  updateDiary: (updatedDiary) =>
    set((state) => ({
      diaryData: state.diaryData.map((diary) =>
        diary.id === updatedDiary.id ? updatedDiary : diary
      ),
    })),

  deleteDiary: (id) =>
    set((state) => ({
      diaryData: state.diaryData.filter((diary) => diary.id !== id),
    })),

  getDiariesForMonth: (month) => {
    return get().diaryData.filter((diary) => diary.date.startsWith(month));
  },
}));

export default useDiaryStore;
