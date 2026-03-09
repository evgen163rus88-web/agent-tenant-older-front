import { defineStore } from "pinia";
import { useI18n } from "@/plugins";
import { omit } from "@/helpers";

export interface Currencies {
  name: string;
  ticker: string;
  symbol: string;
}

export const useCurrencyStore = defineStore({
  id: "currency",
  state: () => ({
    currencies: [
      {
        name: "currencies.thb",
        ticker: "THB",
        symbol: "฿",
      },
      {
        name: "currencies.usd",
        ticker: "USD",
        symbol: "$",
      },
      {
        name: "currencies.eur",
        ticker: "EUR",
        symbol: "€",
      },
      {
        name: "currencies.gbr",
        ticker: "GBP",
        symbol: "£",
      },
      {
        name: "currencies.cny",
        ticker: "CNY",
        symbol: "¥",
      },
      {
        name: "currencies.rub",
        ticker: "RUB",
        symbol: "₽",
      },
    ] as Currencies[],
  }),
  getters: {
    getCurrencies: (state) => {
      const i18n = useI18n();
      return state.currencies.map((cur) => ({
        ...omit(cur, ["name"]),
        name: i18n.t(cur.name),
      })) as Currencies[];
    },
    getSymbolCurrency: (state) => (ticker) =>
      state.currencies.find((c) => c.ticker === ticker)?.symbol,
    getNameCurrency: (state) => (ticker) => {
      const i18n = useI18n();
      return i18n.t(state.currencies.find((c) => c.ticker === ticker)?.name || "");
    },
  },
});
