<template>
  <b-page :state="page">
    <template #content>
      <DashboardFilter v-if="isAdmin" @filter="getData" />

      <el-row class="my-2">
        <el-card v-if="isShowCard" shadow="hover" class="mb-2 mr-3 mw-30-desk" style="min-width: 15%">
          <template #header>
            <p class="headline-3--text fwb">
              {{ $t("securityDeposits") }}
            </p>
          </template>
          <template v-for="securityDep in summary?.securityDeposits" :key="securityDep.pledgeCurrency">
            <DashedContainer
              v-if="securityDep._sum.pledge"
              :title="getCurrencyName(securityDep.pledgeCurrency)"
              :text="`${securityDep._sum.pledge} ${getCurrencySymbol(securityDep.pledgeCurrency)}`"
              textColor="bg-light"
              class="mb-2"
              bold
            />
          </template>
        </el-card>

        <el-card v-if="isShowCard" shadow="hover" class="mb-2 mr-3 mw-30-desk" style="min-width: 15%">
          <template #header>
            <p class="headline-3--text fwb">{{ $t("earlyDeposits") }}</p>
          </template>

          <template v-for="(earlyDep, i) in summary?.earlyDeposits" :key="`early-${i}`">
            <DashedContainer
              v-if="earlyDep._sum.depositBefore"
              :title="getCurrencyName(earlyDep.depositCurrency)"
              :text="`${earlyDep._sum.depositBefore} ${getCurrencySymbol(earlyDep.depositCurrency)}`"
              textColor="bg-light"
              class="mb-2"
              bold
            />
          </template>
        </el-card>

        <el-card v-if="isAdmin" shadow="hover" class="mb-2 mr-3 mw-30-desk" v-loading="loading">
          <template #header>
            <p class="headline-3--text fwb">{{ $t("fields.incomes") }} {{ $t(`btns.${periodTitle}`).toLowerCase() }}</p>
          </template>

          <div class="d-flex align-center justify-between">
            <div v-for="obj in revenue" :key="`r${obj.key}`" class="mr-2">
              <p v-if="!loading" class="title fwb text-center mb-1 text-no-wrap" :class="obj.color">
                {{ obj.amount }}
              </p>
              <p v-else class="title mb-1 text-center fwb">&mdash;</p>
              <p class="pargraph text-center">{{ obj.txt }}</p>
            </div>
          </div>
        </el-card>

        <el-card shadow="hover" class="mb-2 mr-3 mw-30-desk">
          <template #header>
            <p class="headline-3--text fwb">
              {{ $t("apartmentStat") }}&nbsp;&nbsp;
              <span style="font-weight: normal">{{ $dayjs().format("L") }}</span>
            </p>
          </template>

          <div class="d-flex align-center justify-between">
            <DiagramCircle :dataDasharray="diagram" classCircleBack="gray-semi--text" :size="[150, 150]" />

            <ul class="ml-1">
              <li v-for="d in diagram" :key="d.percent" class="d-flex align-center mb-1">
                <div class="circle-block" :class="d.color" />
                <p class="d-flex justify-between paragraph w-100">
                  <span>{{ d.title }}:&nbsp;</span>
                  <span class="fwb">{{ d.percent }}</span>
                </p>
              </li>
            </ul>
          </div>
        </el-card>

        <el-card shadow="hover" class="mb-2 mr-3 mw-30-desk">
          <template #header>
            <p class="headline-3--text fwb">{{ $t("expiringLaeses") }}</p>
          </template>

          <div
            v-for="(expiring, type) of summary?.expiringLeases"
            :key="`ex-${type}`"
            class="expiring pointer mb-2"
            :class="`expiring__${type}`"
            @click="$router.push({ name: RouteName.EXPIRING_LEASES })"
          >
            <p class="paragraph mr-4">{{ $t("expiringLeasesDays", { days: days[type] }) }}:</p>
            <p class="paragraph fwb">
              {{ expiring.length }}
            </p>
          </div>
        </el-card>
      </el-row>
      <el-row v-if="isAdmin">
        <el-card shadow="never" class="mb-2">
          <template #header>
            <p class="headline-3--text fwb">{{ $t("incomExpenses") }} {{ $t(`btns.${periodTitle}`).toLowerCase() }}</p>
          </template>

          <BarChart :charts="chartData" />
        </el-card>
      </el-row>
    </template>
  </b-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, unref } from "vue";
import { usePage } from "@/components/_base/page/BPage";
import { FilterDashboardDto, GroupedByPeriods, ResultDashboard } from "@/api";
import DiagramCircle from "@/components/dashboard/diagram/DiagramCircle.vue";
import { DataDasharray } from "@/components/dashboard/diagram/Diagram";
import { useI18n } from "@/plugins";
import { useCurrencyStore } from "@/store/currency.store";
import { OpUnitType } from "dayjs";
import DashboardFilter from "./DashboardFilter.vue";
import BarChart from "@/components/dashboard/BarChart";
import { useUserStore } from "@/store/user.store";
import { useDashboardStore } from "@/store/dashboard.store";
import { RouteName } from "@/router/router-utils";

export default defineComponent({
  name: "DashboardView",
  components: { DiagramCircle, DashboardFilter, BarChart },
  setup() {
    const labelsChart = ref<string[]>([]);
    const i18n = useI18n();
    const page = usePage();
    const loading = ref(false);
    const currencyStore = useCurrencyStore();
    const dashboardStore = useDashboardStore();
    const userStore = useUserStore();
    const getCurrencySymbol = computed(() => currencyStore.getSymbolCurrency);
    const getCurrencyName = computed(() => currencyStore.getNameCurrency);
    const summary = computed<ResultDashboard>(() => dashboardStore.getSummary);
    const chartData = computed(() =>
      Object.assign(
        { labels: labelsChart.value.map((l) => i18n.t(l)) },
        { incomePeriod: summary.value?.incomePeriod, expensesPeriod: summary.value?.expensesPeriod }
      )
    );
    const isAdmin = computed(() => userStore.isAdmin);
    const isManager = computed(() => userStore.isManager);
    const isShowCard = computed(() => unref(isAdmin) || unref(isManager));
    const periodTitle = ref("lastYear");

    const revenue = computed(
      () =>
        summary.value?.incomes?.map((income, i) => {
          return {
            key: i,
            amount: income._sum.amount,
            color: `${income.type.toLowerCase()}--text`,
            txt: i18n.t(`billsTypes.${income.type}`),
          };
        }) || []
    );

    const diagram = computed<DataDasharray[]>(
      () =>
        summary.value?.apartamentsStatuses?.map((apartment) => {
          return {
            total: summary.value?.countApartments || 0,
            percent: apartment._count.id,
            color: `${apartment.bookingStatus.toLowerCase()}-d`,
            title: i18n.t(`bookingStatuses.${apartment.bookingStatus}`),
          };
        }) || []
    );

    const setLabels = (period: OpUnitType, response: GroupedByPeriods[]) => {
      switch (period) {
        case "year":
          labelsChart.value = [...(response?.map((obj) => `month.${+obj.period - 1}`) || "")];
          break;
        case "week":
          labelsChart.value = [...(response?.map((obj) => dayjs(obj.sourceDate).format("dddd")) || "")];
          break;
        case "month":
          labelsChart.value = [...(response?.map((obj) => dayjs(obj.sourceDate).format("LL")) || "")];
          break;
        default:
          labelsChart.value = [""];
          break;
      }
    };

    const getData = async (payload: { filter: FilterDashboardDto; period: OpUnitType }) => {
      loading.value = true;
      periodTitle.value = `last${payload.period}`;

      try {
        await dashboardStore.fetchDashboardData(payload);
        setLabels(payload.period, summary.value.expensesPeriod);
      } finally {
        loading.value = false;
      }
    };

    page.load(async () => {
      await getData({
        filter: {
          periodFrom: dayjs(Date.now()).add(-1, "year").toLocaleString(),
          periodTo: dayjs(Date.now()).toLocaleString(),
        },
        period: "year",
      });
    });

    const days = {
      lessOneMonths: "30",
      lessTwoMonths: "31 - 60",
      lessThreeMonths: "61 - 90",
    };

    return {
      page,
      summary,
      revenue,
      diagram,
      isAdmin,
      RouteName,
      isShowCard,
      getCurrencySymbol,
      getCurrencyName,
      periodTitle,
      chartData,
      getData,
      loading,
      days,
    };
  },
});
</script>
<style lang="scss">
.expiring {
  display: flex;
  justify-content: space-between;
  padding: space(2);
  border: 1px solid;
  border-radius: 4px;

  &__lessOneMonths {
    background-color: color(error-light);
    border-color: color(error);
  }

  &__lessTwoMonths {
    background-color: color(warning-light);
    border-color: color(warning-dark);
  }

  &__lessThreeMonths {
    background-color: color(success-light2);
    border-color: color(success);
  }
}

.circle-block {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: space(1);
}
</style>
