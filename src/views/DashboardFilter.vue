<template>
  <div class="d-flex justify-between align-center gray-semi p-2">
    <h1 class="bg-dark--text headline-2">{{ $t("dashboard") }}</h1>

    <el-tooltip effect="light" :content="$t('filterHome')">
      <el-dropdown trigger="click" @command="handelPopper">
        <el-button class="p-1" text>
          <b-icon size="large" color="bg-dark">filter</b-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu class="d-flex flex-column">
            <el-dropdown-item command="week">
              {{ $t("btns.lastweek") }}
            </el-dropdown-item>

            <el-dropdown-item command="month">
              {{ $t("btns.lastmonth") }}
            </el-dropdown-item>

            <el-dropdown-item command="year">
              {{ $t("btns.lastyear") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { FilterDashboardDto } from "@/api";
import { ManipulateType } from "dayjs";

export default defineComponent({
  name: "DashboardFilter",
  setup(_, { emit }) {
    const filter = reactive<FilterDashboardDto>({
      periodFrom: undefined,
      periodTo: dayjs(Date.now()).toLocaleString(),
    });

    const handelPopper = (period: ManipulateType) => {
      filter.periodFrom = dayjs(filter.periodTo).add(-1, period).toLocaleString();
      emit("filter", { filter, period });
    };
    return {
      handelPopper,
    };
  },
});
</script>
