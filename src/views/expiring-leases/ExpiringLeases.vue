<template>
  <b-page :state="page">
    <template #content>
      <h1 class="bg-dark--text headline-2 mb-3">{{ $t("expiringLaeses") }}</h1>

      <el-tabs v-if="canView" v-model="activeName" type="border-card">
        <el-tab-pane
          v-for="(item, type) of expiringLeases"
          :key="`exl${type}`"
          :label="$t('expiringLeasesDays', { days: days[type] })"
          :name="days[type]"
        >
          <ObjectsOfExpiringLeases v-if="activeName === days[type]" :source="item" />
        </el-tab-pane>
      </el-tabs>
    </template>
  </b-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref } from "vue";
import { usePage } from "@/components/_base/page/BPage";
import { useUserStore } from "@/store/user.store";
import { useDashboardStore } from "@/store/dashboard.store";
import ObjectsOfExpiringLeases from "./ObjectsOfExpiringLeases.vue";

enum LocalTabs {
  FIRST = "30",
  SECOND = "31 - 60",
  THIRD = "61 - 90",
}

export default defineComponent({
  name: "ExpiringLeases",
  components: { ObjectsOfExpiringLeases },
  setup() {
    const page = usePage();
    const loading = ref(false);
    const activeName = ref(LocalTabs.FIRST);
    const dashboardStore = useDashboardStore();
    const userStore = useUserStore();
    const expiringLeases = computed(() => dashboardStore.getExpiringLeases);

    const isAdmin = computed(() => userStore.isAdmin);
    const isManager = computed(() => userStore.isManager);
    const isEmployee = computed(() => userStore.isEmployee);
    const canView = computed(() => unref(isManager) || unref(isAdmin) || unref(isEmployee));
    const periodTitle = ref("lastYear");

    page.load(async () => {
      await dashboardStore.fetchDashboardData({
        filter: {
          periodFrom: dayjs(Date.now()).add(-1, "year").toLocaleString(),
          periodTo: dayjs(Date.now()).toLocaleString(),
        },
      });
    });

    const days = {
      lessOneMonths: "30",
      lessTwoMonths: "31 - 60",
      lessThreeMonths: "61 - 90",
    };

    return {
      page,
      LocalTabs,
      activeName,
      expiringLeases,
      canView,
      periodTitle,
      loading,
      days,
    };
  },
});
</script>
