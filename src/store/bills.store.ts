import { defineStore } from "pinia";
import { CreateBillsExpenseDto, SearchBillsDto, expensesApi, incomeApi, CreateBillsIncomeDto } from "@/api";

export const useBillsStore = defineStore({
  id: "bills",
  state: () => ({
    savedFilters: {} as SearchBillsDto,
    dataExpenses: [] as CreateBillsExpenseDto[],
    dataIncome: [] as CreateBillsIncomeDto[],
  }),
  getters: {
    getFilters: (state) => state.savedFilters,
  },
  actions: {
    async fetchExpenses(filters: SearchBillsDto) {
      const response = await expensesApi.findExpenses(filters);
      this.dataExpenses = response.data;
      return response;
    },
    async fetchIncome(filters: SearchBillsDto) {
      const response = await incomeApi.findIncomes(filters);
      this.dataIncome = response.data;
      return response;
    },
    async factoryFetch(filters: SearchBillsDto, target: "fetchExpenses" | "fetchIncome") {
      return this[target](filters);
    },
  },
});
