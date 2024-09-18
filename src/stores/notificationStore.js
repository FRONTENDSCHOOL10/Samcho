import { create } from 'zustand';

const useNotificationStore = create((set) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    })),
  setNotifications: (notifications) =>
    set(() => ({
      notifications,
      unreadCount: notifications.filter((item) => !item.read).length,
    })),

  /* 모든 알림 읽음 처리 (추후 알림 상태 전체 처리 시 적용) */
  markAsRead: () =>
    set(() => ({
      unreadCount: 0,
    })),
}));

export default useNotificationStore;
