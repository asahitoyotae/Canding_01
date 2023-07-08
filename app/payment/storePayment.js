import { create } from "zustand";

const paymentStore = create((set, get) => ({
  choosenService: null,
  setService: (serviceDays) => {
    set({ choosenService: serviceDays });
  },
}));

export default paymentStore;
