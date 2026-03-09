<template>
  <b-page :state="page">
    <template v-if="$route.meta && $route.meta.isChild" #content>
      <router-view />
    </template>

    <template v-else #content>
      <div class="container">
        <MenuUsers />
        <el-divider />
        <b-grid
          v-loading="loading"
          :headers="headersData"
          :items="users"
          class="mt-1"
          :type="isMobile ? 'expand' : 'linear'"
          hover
        >
          <template #cell-role="{ item }">
            <p>{{ $t(item.role) }}</p>
          </template>

          <template #cell-isActive="{ item }">
            <el-tag :type="getStatus(item.isActive).type" size="medium">
              {{ getStatus(item.isActive).text }}
            </el-tag>
          </template>

          <template #cell-btn="{ item }">
            <el-button type="primary" circle @click="editUser(item)">
              <b-icon icon="edit" />
            </el-button>
          </template>

          <template #default="{ item }">
            <el-descriptions direction="vertical" :column="1" border>
              <el-descriptions-item :label="$t('users.login')">
                <p>{{ item.login }}</p>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('email')">
                <p>{{ item.email }}</p>
              </el-descriptions-item>

              <el-descriptions-item :label="$t('users.lastVisited')">
                <p>{{ $dayjs(item.lastVisited).format("lll") }}</p>
              </el-descriptions-item>
            </el-descriptions>

            <div class="d-flex justify-end w-100 mt-2">
              <el-button type="primary" circle @click="editUser(item)">
                <b-icon icon="edit" />
              </el-button>
            </div>
          </template>
        </b-grid>
      </div>
    </template>
  </b-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref } from "vue";
import { Headers } from "@/components/_base/grid/BGrid";
import { usePage } from "@/components/_base/page/BPage";
import MenuUsers from "./MenuUsers.vue";
import { useUsersStore } from "@/store/users.store";
import { RouteName } from "@/router/router-utils";
import { useRouter } from "vue-router";
import { useI18n } from "@/plugins";
import { useLayoutsStore } from "@/store/layouts.store";

export default defineComponent({
  components: {
    MenuUsers,
  },
  setup() {
    const i18n = useI18n();
    const $router = useRouter();
    const page = usePage();
    const usersStore = useUsersStore();
    const users = computed(() => usersStore.getUsers);
    const layoutsStore = useLayoutsStore();
    const mobileColumns = ["firstName", "lastName", "isActive", "role"];
    const loading = ref(false);

    const isMobile = computed(() => layoutsStore.isMobileScreen);
    const headersData = computed<Headers[]>(() => {
      if (unref(isMobile)) {
        return headers.value.filter((t) => mobileColumns.includes(t.prop));
      }

      return headers.value;
    });

    page.title = i18n.t("pages.users");
    page.load(async () => {
      loading.value = true;
      await usersStore.fetchUsers();
      loading.value = false;
    });

    const headers = computed((): Headers[] => [
      {
        prop: "login",
        label: i18n.t("users.login") as string,
        className: "align-self-center",
      },
      {
        prop: "firstName",
        label: i18n.t("users.firstName") as string,
        className: "align-self-center",
      },
      {
        prop: "lastName",
        label: i18n.t("users.lastName") as string,
        className: "align-self-center",
      },
      {
        prop: "email",
        label: i18n.t("email") as string,
        className: "align-self-center",
      },
      {
        prop: "role",
        label: i18n.t(unref(isMobile) ? "users.roleShort" : "users.role") as string,
        className: "align-self-center",
      },
      {
        prop: "isActive",
        width: "0.5fr",
        label: i18n.t("users.isActive") as string,
        className: "align-self-center",
      },
      {
        prop: "lastVisited",
        width: "0.6fr",
        label: i18n.t("users.lastVisited") as string,
        isDate: true,
        formatDate: "LLL",
        className: "align-self-center",
      },
      {
        prop: "btn",
        width: "50px",
        className: "align-self-center self-end",
      },
    ]);

    const getStatus = (status: boolean) => {
      return {
        type: status ? "success" : "warning",
        text: i18n.t(status ? "yes" : "no"),
      };
    };

    const editUser = ({ id }) => {
      $router.push({
        name: RouteName.EDIT_USER,
        params: {
          userId: id,
        },
      });
    };

    return {
      isMobile,
      headersData,
      getStatus,
      editUser,
      headers,
      loading,
      users,
      page,
    };
  },
});
</script>
