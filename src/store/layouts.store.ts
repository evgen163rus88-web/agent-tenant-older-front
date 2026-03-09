import { defineStore } from "pinia";

export const useLayoutsStore = defineStore({
  id: "layouts",
  state: () => ({
    openMenu: false,
    isSmallScreen: false,
  }),
  getters: {
    getStateMenu: (state) => state.openMenu,
    isMobileScreen: (state) => state.isSmallScreen,
  },
  actions: {
    toggleMenu() {
      this.openMenu = !this.openMenu;
    },
    toggleScreen(val: boolean) {
      this.isSmallScreen = val;
    },
  },
});
