import { defineStore } from "pinia";
import { ResultDashboard, FilterDashboardDto, dashboardApi } from "@/api";

export const useDashboardStore = defineStore({
  id: "dashboard",
  state: () => ({
    summary: {} as ResultDashboard,
  }),
  getters: {
    getSummary: (state) => state.summary,
    getExpiringLeases: (state) => state.summary.expiringLeases,
  },
  actions: {
    async fetchDashboardData(payload: { filter: FilterDashboardDto }) {
      try {
        this.summary = (await dashboardApi.getDashboardData(payload.filter)).data;
      } catch (e) {
        throw new Error(String(e));
      }
    },
  },
});
