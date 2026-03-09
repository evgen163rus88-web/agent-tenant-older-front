<template>
  <div class="d-flex align-center">
    <b-icon class="mr-2 filters-mobile--icon">filter</b-icon>

    <div>
      <div class="d-flex flex-wrap align-center booking-filters-select">
        <el-select
          v-model="filters.propertyId"
          filterable
          :placeholder="$t('pages.properties')"
          value-key="id"
          style="width: 220px"
          class="mr-3"
          clearable
          @clear="clearField('propertyId')"
        >
          <el-option
            v-for="item in properties"
            :key="item.id"
            :label="item.label"
            :value="item.id || ''"
          />
        </el-select>

        <b-date-range-input v-model="datesFilter" :maxRange="12" />
      </div>

      <div class="d-flex flex-wrap align-center filters-mobile">
        <el-input
          v-model="filters.countGuests"
          v-digitsonly
          autocomplete="off"
          :placeholder="$t('fields.ofGuests')"
          style="width: 100px"
          clearable
          @clear="clearField('countGuests')"
        />

        <el-input
          v-model="filters.countBathroom"
          v-digitsonly
          autocomplete="off"
          :placeholder="$t('listObj.countBathRooms')"
          style="width: 157px"
          clearable
        />

        <el-input
          v-model="filters.countBedroom"
          v-digitsonly
          autocomplete="off"
          :placeholder="$t('listObj.countBedRooms')"
          style="width: 150px"
          clearable
          @clear="clearField('countBedroom')"
        />

        <el-select-v2
          v-model="filters.bookingStatuses"
          :placeholder="$t('listObj.status')"
          style="width: 240px"
          :options="options"
          multiple
          clearable
          collapse-tags
          collapse-tags-tooltip
        />

        <el-button type="danger" size="small" plain round class="ml-auto" @click="resetFilters">
          {{ $t("btns.resetFilters") }}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed, watch } from "vue";
import { usePropertiesStore } from "@/store/properties.store";
import { CreateApartamentDtoBookingStatusEnum as BookingStatuses, SearchBookingDto } from "@/api";
import { OptionType } from "element-plus/lib/components/select-v2/src/select.types";
import { useI18n } from "@/plugins";
import { useBookingsStore } from "@/store/booking.store";

export default defineComponent({
  setup(_, { emit }) {
    const i18n = useI18n();
    const bookingStore = useBookingsStore();
    const filtersFromStore = computed(() => bookingStore.getFilters);
    const propertyStore = usePropertiesStore();
    const properties = computed(() => propertyStore.getPropertiesForSelect);

    const filters = reactive<Partial<SearchBookingDto>>({
      propertyId: filtersFromStore.value.propertyId,
      periodFrom: filtersFromStore.value.periodFrom,
      periodTo: filtersFromStore.value.periodTo,
      countGuests: filtersFromStore.value.countGuests,
      countBathroom: filtersFromStore.value.countBathroom,
      countBedroom: filtersFromStore.value.countBedroom,
      isTrusted: true,
      bookingStatuses: [],
    });

    const datesFilter = computed({
      get: () => {
        return [filters.periodFrom, filters.periodTo];
      },
      set: (dates) => {
        filters.periodFrom = dayjs(dates[0]).utc(true).format();
        filters.periodTo = dayjs(dates[1]).utc(true).format();
      },
    });

    const options = computed(() => {
      const result: OptionType[] = [];

      for (const key in BookingStatuses) {
        if (
          Object.prototype.hasOwnProperty.call(BookingStatuses, key) &&
          key !== BookingStatuses.FREE &&
          key !== BookingStatuses.NOT_AVAILABLE
        ) {
          result.push({
            label: i18n.t(`bookingStatuses.${key}`),
            value: key,
          });
        }
      }
      return result;
    });

    const clearField = (field: string) => {
      if ({}.hasOwnProperty.call(filters, field)) {
        if (Array.isArray(filters[field])) {
          filters[field] = [];
        } else {
          filters[field] = undefined;
        }
      }
    };

    const resetFilters = (): void => {
      for (const key in filters) {
        clearField(key);
      }
    };

    watch(
      filters,
      () => {
        bookingStore.$patch({
          savedFilters: filters,
        });

        emit("search", filters);
      },
      { immediate: true }
    );

    return {
      filters,
      options,
      clearField,
      properties,
      datesFilter,
      resetFilters,
      BookingStatuses,
    };
  },
});
</script>
<style lang="scss">
.booking-filters-select {
  @media screen and (min-width: 780px) {
    .el-input,
    .divider-range {
      margin-bottom: space(2);
    }
  }
}
</style>
