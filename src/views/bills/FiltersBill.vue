<template>
  <div class="d-flex align-center mb-1">
    <b-icon class="mr-2 mb-1 filters-mobile--icon">filter</b-icon>

    <div class="d-flex flex-wrap align-center">
      <el-input
        v-model="filters.name"
        :placeholder="$t('listObj.name')"
        class="filters-mobile--medium-input mb-1"
        clearable
        @clear="filters.name = undefined"
      />

      <el-input
        v-model="filters.amount"
        :placeholder="$t('fields.amount')"
        class="filters-mobile--medium-input mb-1"
        clearable
        @clear="filters.amount = undefined"
      />

      <b-date-range-input
        class="mb-1"
        v-model="datesFilter"
        restrictionEndDate
        autoSetEndTime
        :maxRange="6"
      />

      <el-select
        v-model="filters.apartamentId"
        filterable
        value-key="id"
        :placeholder="$t('fields.apartament')"
        clearable
        @clear="filters.apartamentId = undefined"
        class="mb-1"
      >
        <el-option-group
          v-for="(group, j) in apartaments"
          :key="`apart${j}`"
          :label="group[0].parent"
        >
          <el-option v-for="item in group" :key="item.id" :label="item.name" :value="item.id" />
        </el-option-group>
      </el-select>

      <el-select-v2
        v-model="filters.type"
        :options="optionsType"
        :placeholder="$t('type')"
        multiple
        clearable
        filterable
        collapse-tags
        collapse-tags-tooltip
        style="width: 290px"
        class="mb-1"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, watch, onMounted, onBeforeMount, ref } from "vue";
import { SearchBillsDto, SearchBillTypes, apartamentsApi, BaseEntityShema } from "@/api";
import { OptionType } from "element-plus/lib/components/select-v2/src/select.types";
import { useI18n } from "@/plugins";
import { useBillsStore } from "@/store/bills.store";
import { compareAndRotateDates } from "@/helpers";

export default defineComponent({
  setup(_, { emit }) {
    const i18n = useI18n();
    const billsStore = useBillsStore();
    const filtersFromStore = computed(() => billsStore.getFilters);
    const apartaments = ref<{ [key: string]: Array<BaseEntityShema> }>();
    const filters = reactive<SearchBillsDto>({
      name: undefined,
      type: [],
      amount: undefined,
      dateFrom: undefined,
      dateTo: undefined,
      apartamentId: undefined,
    });

    const datesFilter = computed({
      get: () => {
        return compareAndRotateDates([filters.dateFrom, filters.dateTo]);
      },
      set: (dates) => {
        const dateFrom = dayjs(dates[0]);
        const dateTo = dayjs(dates[1]);

        // eslint-disable-next-line prettier/prettier
        filters.dateFrom = dayjs(dateFrom).isValid() ? dayjs(dateFrom).utc(true).format() : undefined;
        filters.dateTo = dayjs(dateTo).isValid() ? dayjs(dateTo).utc(true).format() : undefined;
      },
    });

    const optionsType = computed(() => {
      const result: OptionType[] = [];

      for (const key in SearchBillTypes) {
        if (Object.prototype.hasOwnProperty.call(SearchBillTypes, key)) {
          result.push({
            label: i18n.t(`billsTypes.${key}`),
            value: key,
          });
        }
      }
      return result;
    });

    onBeforeMount(async () => {
      apartaments.value = (await apartamentsApi.getAllByCompany()).data.data;
    });

    onMounted(() => {
      for (const key in filters) {
        if (Object.prototype.hasOwnProperty.call(filtersFromStore.value, key)) {
          filters[key] = filtersFromStore.value[key];
        }
      }
    });

    watch(
      filters,
      () => {
        billsStore.$patch({
          savedFilters: filters,
        });

        emit("search", filters);
      },
      { immediate: true, deep: true }
    );

    return {
      filters,
      datesFilter,
      optionsType,
      apartaments,
    };
  },
});
</script>
