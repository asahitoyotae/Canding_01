import { BloomFilter } from "next/dist/shared/lib/bloom-filter";
import { create } from "zustand";

const paymentStore = create((set, get) => ({
  choosenService: null,
  token: "",
  showPaypal: false,
  showTerms: false,
  valid_text: process.env.NEXT_PUBLIC_AUTH_KEY_VALID,
  setShowTerms: (show) => {
    set({ showTerms: show });
  },
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
