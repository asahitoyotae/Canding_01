import { create } from "zustand";

const chatStore = create((set, get) => ({
  allThreads: [],
  currentThreadId: null,
  animate: false,
  gptVersion: "gpt-3.5-turbo",
  language: "English",
  prime: "sk__wk__TW",
  setLanguage: (lang) => {
    set({ language: lang });
  },
  setGptVersion: (version) => {
    set({ gptVersion: version });
  },
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
