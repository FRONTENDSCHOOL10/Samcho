import { create } from 'zustand';

const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,

  // 새 알림 추가
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
      unreadCount: !notification.read
        ? state.unreadCount + 1
        : state.unreadCount,
    })),

  // 알림 목록 설정
  setNotifications: (notifications) =>
    set(() => ({
      notifications,
      unreadCount:
        notifications.length > 0
          ? notifications.filter((item) => !item.read).length
          : 0,
    })),

  // 모든 알림 읽음 처리
  markAsRead: () =>
    set(() => ({
      unreadCount: 0,
    })),

  // 알림 가져오기 (메모리에서)
  getNotifications: () => get().notifications,
}));

export default useNotificationStore;
