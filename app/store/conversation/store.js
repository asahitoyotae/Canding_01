import { create } from "zustand";

const chatStore = create((set, get) => ({
  allThreads: [],
  currentThreadId: null,
  animate: false,
  setAnimate: (bool) => {
    set({ animate: bool });
  },
  setAllThreads: (data) => {
    set({ allThreads: data });
  },
  setCurrentThreadId: (id) => {
    set({ currentThreadId: id });
  },
}));

export default chatStore;
