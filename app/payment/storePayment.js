import { BloomFilter } from "next/dist/shared/lib/bloom-filter";
import { create } from "zustand";

const paymentStore = create((set, get) => ({
  choosenService: null,
  token: "",
  showPaypal: false,
  setShowPaypal: (bool) => {
    set({ showPaypal: bool });
  },
  setToken: (token) => {
    set({ token });
  },
  setService: (serviceDays) => {
    set({ choosenService: serviceDays });
  },
}));

export default paymentStore;
