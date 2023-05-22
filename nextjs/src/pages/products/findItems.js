import create from "zustand";

const useStore = create((set) => ({
  data: [],
  addData: (newItems) => set((state) => ({ data: [...state.data, newItems] })),
}));

export default useStore;
