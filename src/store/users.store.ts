import { defineStore } from "pinia";
import { usersApi, CreateUserDto } from "@/api";

export const useUsersStore = defineStore({
  id: "users",
  state: () => ({
    users: [] as CreateUserDto[],
    user: {} as CreateUserDto,
  }),
  getters: {
    getUsers: (state) => state.users,
    getUser: (state) => state.user,
  },
  actions: {
    async fetchUsers() {
      this.users = (await usersApi.getAll()).data;
    },
    async fetchOneUser(id) {
      const response = (await usersApi.getOneUser(id)).data;
      this.user = response;
    },
  },
});
