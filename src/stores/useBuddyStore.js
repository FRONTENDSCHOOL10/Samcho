import { pb } from '@/api';
import { create } from 'zustand';

const useBuddyStore = create((set, get) => ({
  buddyData: [],
  loading: false,
  setBuddyData: async (pending) => {
    const { buddyData } = get();

    if (buddyData.length === 0) {
      set({ loading: true });
      const userId = JSON.parse(localStorage.getItem('auth')).user.id;
      try {
        const data = await fetchBuddyData(pending, userId);
        set({ buddyData: data, loading: false });
      } catch (error) {
        if (error.status === 0) return;
        console.error('Data fetch error', error);
        set({ loading: false });
      }
    }
  },
}));

const fetchBuddyData = async (pending = false, userId) => {
  const statusFilter = pending
    ? `(status = "accepted" || status = "pending")`
    : `status = "accepted"`;

  const records = await pb.collection('buddy').getFullList({
    filter: `(recipient = "${userId}" || requester = "${userId}") && ${statusFilter}`,
    sort: '-created',
    expand: 'recipient, requester',
  });

  return records.map((record) => {
    const buddy =
      record.recipient === userId
        ? record.expand.requester
        : record.expand.recipient;
    return {
      id: record.id,
      buddyId: buddy.id,
      buddyName: buddy.name,
      created: record.created,
    };
  });
};

export default useBuddyStore;
