import { defineStore } from "pinia";
import { SearchCommunalDTO } from "@/api";

export const useCommunalStore = defineStore({
  id: "communal",
  state: () => ({
    savedFilters: {} as SearchCommunalDTO,
    propertyChoosen: undefined,
  }),
  getters: {
    getFilters: (state) => ({
      savedFilters: state.savedFilters,
      propertyChoosen: state.propertyChoosen,
    }),
  },
});
