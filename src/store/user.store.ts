import { defineStore } from "pinia";
import { AuthCurrentUserDto, authApi, CreateUserDtoRoleEnum as RoleEnum } from "@/api";
import { isEmpty } from "@/helpers";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: {} as AuthCurrentUserDto,
    loading: false,
  }),
  getters: {
    getUser: (state) => state.user,
    getLoaded: (state) => !isEmpty(state.user),
    isManager: (state) => state.user.role === RoleEnum.MANAGER,
    isAdmin: (state) => state.user.role === RoleEnum.ADMIN,
    isEmployee: (state) => state.user.role === RoleEnum.EMPLOYEE,
    isJustUser: (state) => state.user.role === RoleEnum.USER,
  },
  actions: {
    async fetch() {
      this.loading = true;
      try {
        this.user = (await authApi.getCurrentUser()).data;
      } finally {
        this.loading = false;
      }
    },
    logOut() {
      this.user = {} as AuthCurrentUserDto;
    },
  },
});
