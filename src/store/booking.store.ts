import { defineStore } from "pinia";
import { SearchBookingDto } from "@/api";

export const useBookingsStore = defineStore({
  id: "bookings",
  state: () => ({
    savedFilters: {
      isTrusted: true,
      periodFrom: dayjs().add(-1, "day").toISOString(),
      periodTo: dayjs().add(1, "month").toISOString(),
    } as SearchBookingDto,
  }),
  getters: {
    getFilters: (state) => state.savedFilters,
  },
});
