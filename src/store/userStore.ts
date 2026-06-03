import { create } from 'zustand';

interface UserState {
  balance: number;
  setBalance: (balance: number) => void;
  incrementBalance: (amount: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  balance: 0,
  setBalance: (balance) => set({ balance }),
  incrementBalance: (amount) => set((state) => ({ balance: state.balance + amount })),
}));
