<template>
  <b-page :state="page">
    <template v-if="$route.meta.isChild" #content>
      <router-view />
    </template>

    <template v-else #content>
      <div class="d-flex flex-mobile-wrap justify-between">
        <h1 class="mb-2">{{ $t("incomExpenses") }}</h1>

        <div class="d-flex mb-2">
          <el-button type="success" @click="$router.push({ name: RouteName.ADD_INCOME })" round>
            {{ $t("setIncome") }}
          </el-button>

          <el-button type="warning" @click="$router.push({ name: RouteName.ADD_EXPENSES })" round>
            {{ $t("setExpenses") }}
          </el-button>
        </div>
      </div>

      <FilterCollaps>
        <FiltersBill @search="search" />
      </FilterCollaps>
      <el-divider />

      <div class="ml-1 my-2">
        <el-radio-group v-model="table" @change="search(filter, true)">
          <el-radio-button label="fetchExpenses">
            {{ $t("fields.expenses2") }}
          </el-radio-button>
          <el-radio-button label="fetchIncome">
            {{ $t("fields.incomes") }}
          </el-radio-button>
        </el-radio-group>
      </div>

      <PayBillsList
        :key="loading"
        :loading="loading"
        :target="table"
        :values="bills"
        @refresh="search(filter)"
      />

      <!-- <div v-show="loading" class="w-100" style="height: 200px" v-loading="loading" /> -->

      <b-paginator v-show="!paginator.hidden.value" :state="paginator" />
    </template>
  </b-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { usePage } from "@/components/_base/page/BPage";
import { RouteName } from "@/router/router-utils";
import FiltersBill from "./FiltersBill.vue";
import PayBillsList from "./PayBillsList.vue";
import FilterCollaps from "@/components/FilterCollaps.vue";
import { useBillsStore } from "@/store/bills.store";
import { SearchBillsDto } from "@/api";
import { usePaginator } from "@/components/_base/paginator/BPaginator";
import { debounce } from "@/helpers";

export default defineComponent({
  components: { FiltersBill, PayBillsList, FilterCollaps },
  setup() {
    const loading = ref(false);
    const table = ref<"fetchExpenses" | "fetchIncome">("fetchExpenses");
    const billsStore = useBillsStore();
    const filter = ref<SearchBillsDto>({});
    const bills = ref([]);
    const page = usePage();

    page.load(async () => {
      await Promise.resolve();
    });

    const paginator = usePaginator({
      api: (pagination) => billsStore.factoryFetch({ ...filter.value, ...pagination }, table.value),
      binding: bills,
    });

    const search = debounce(async (filters: SearchBillsDto, clear = false) => {
      loading.value = true;
      filter.value = filters;

      if (clear) {
        bills.value = [];
      }

      try {
        await paginator.getData();
      } finally {
        loading.value = false;
      }
    });

    return {
      page,
      bills,
      table,
      search,
      filter,
      loading,
      paginator,
      RouteName,
    };
  },
});
</script>
