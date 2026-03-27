<template>
  <div class="d-flex flex-column menu__box">
    <div class="menu__box--wrapper">
      <template v-for="item in menu">
        <router-link v-if="item.show" :key="item.name" :to="item.to" class="sidebar-link d-flex">
          <b-icon class="mr-1" :icon="item.icon" size="large" />
          <span>{{ item.title }}</span>
        </router-link>
      </template>
    </div>

    <div class="mt-auto p-2 text-center">
      <p class="gray-semi--text">{{ $t("version") }} 1.0</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted, unref } from "vue";
import { useUserStore } from "@/store/user.store";
import { RouteName } from "@/router/router-utils";
import { useI18n } from "@/plugins";
import { useLayoutsStore } from "@/store/layouts.store";

export default defineComponent({
  setup() {
    const layoutsStore = useLayoutsStore();
    const year = new Date().getFullYear();
    const userStore = useUserStore();
    const isAdmin = computed(() => userStore.isAdmin);
    const isManager = computed(() => userStore.isManager);
    const isEmployee = computed(() => userStore.isEmployee);
    const isJustUser = computed(() => userStore.isJustUser);
    const i18n = useI18n();

    const menu = computed(() => [
      {
        title: i18n.t("dashboard"),
        name: RouteName.HOME,
        to: { name: RouteName.HOME },
        icon: "dashboard",
        show: unref(isManager) || unref(isAdmin) || unref(isEmployee),
      },
      {
        title: i18n.t("pages.booking"),
        name: RouteName.BOOKING,
        to: { name: RouteName.BOOKING },
        icon: "calendar",
        show: true,
      },
      {
        title: i18n.t("pages.apartments"),
        name: RouteName.OBJECT,
        to: { name: RouteName.OBJECT },
        icon: "ci_building",
        show: true,
      },
      {
        title: i18n.t("pages.clients"),
        name: RouteName.CLIENTS,
        to: { name: RouteName.CLIENTS },
        icon: "fluent_people",
        show: unref(isManager) || unref(isAdmin),
      },
      {
        title: i18n.t("pages.communal"),
        name: RouteName.COMMUNAL,
        to: { name: RouteName.COMMUNAL },
        icon: "check-mark",
        show: !unref(isJustUser),
      },
      {
        title: i18n.t("pages.bills"),
        name: RouteName.BILLS,
        to: { name: RouteName.BILLS },
        icon: "bills",
        show: unref(isManager) || unref(isAdmin),
      },
      {
        title: i18n.t("pages.properties"),
        name: RouteName.PROPERTIES,
        to: { name: RouteName.PROPERTIES },
        icon: "building",
        show: unref(isAdmin),
      },
      {
        title: i18n.t("pages.users"),
        name: RouteName.USERS,
        to: { name: RouteName.USERS },
        icon: "user",
        show: unref(isAdmin),
      },
    ]);

    const setDataScreen = () => {
      if (window.matchMedia("(max-width: 1024px)").matches) {
        layoutsStore.toggleScreen(true);
      } else {
        layoutsStore.toggleScreen(false);
      }
    };

    onMounted(() => {
      setDataScreen();
      window.addEventListener("resize", setDataScreen);
    });

    return { menu, year };
  },
});
</script>
<style lang="scss">
.sidebar-link {
  align-items: center;

  color: color(gray);
  font-size: fontSize(title);
  padding: space(1) space(2);
  margin-bottom: space(1);
  border-radius: 45px;
  font-weight: bold;

  &:hover,
  &:focus {
    color: color(gray-light);
    background-color: color(bg-light);
  }

  &.router-link-active {
    background: linear-gradient(260.9deg, color(primary-semi-light) -13.01%, color(bg-dark) 119.64%);
    color: color(white);

    &:active {
      background: linear-gradient(260.9deg, color(primary-semi-light) -13.01%, color(bg-dark) 119.64%);
    }
  }

  .b-icon {
    margin-right: space(1);
  }
}
</style>
