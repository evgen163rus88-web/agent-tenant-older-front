<template>
  <el-select
    v-model="filters.property"
    filterable
    clearable
    :placeholder="$t('pages.properties')"
    value-key="id"
    style="width: 230px"
    class="mr-2 mb-1"
    @change="changeFilter"
  >
    <el-option v-for="item in properties" :key="item.id" :label="item.label" :value="item.id" />
  </el-select>

  <el-select-v2
    v-model="filters.types"
    :options="TypeProperty"
    multiple
    clearable
    collapse-tags
    collapse-tags-tooltip
    style="width: 230px; z-index: 2"
    :placeholder="$t('fields.typeProp')"
    class="mb-1"
    @change="changeFilter"
  />

  <el-select-v2
    v-model="filters.statuses"
    :placeholder="$t('listObj.status')"
    style="width: 230px; z-index: 2"
    :options="options"
    multiple
    clearable
    collapse-tags
    collapse-tags-tooltip
    class="mb-1"
    @change="changeFilter"
  />

  <el-input
    v-model="filters.name"
    :placeholder="$t('listObj.name')"
    autocomplete="off"
    style="width: 220px"
    @input="changeFilter"
    @keyup.self.enter="changeFilter"
    class="mb-1"
    clearable
  />

  <el-input
    v-model="filters.countBathroom"
    v-digitsonly
    autocomplete="off"
    :placeholder="$t('listObj.countBathRooms')"
    class="mb-1"
    style="width: 120px"
    @input="changeFilter"
    @keyup.self.enter="changeFilter"
    clearable
  />

  <el-input
    v-model="filters.countBedroom"
    v-digitsonly
    autocomplete="off"
    :placeholder="$t('listObj.countBedRooms')"
    class="mr-2 mb-1"
    style="width: 120px"
    @input="changeFilter"
    @keyup.self.enter="changeFilter"
    clearable
  />

  <div class="d-flex align-center" :class="{ 'justify-between pr-1 mb-1': isMobile }">
    <el-form-item :label="$t('isHaveKitchen')" class="mb-1 mr-2">
      <el-switch
        v-model="filters.isKitchenAvailable"
        @input="changeFilter"
        inline-prompt
        active-color="#13ce66"
        inactive-color="#d7d3d3"
      />
    </el-form-item>

    <el-form-item :label="$t('isWiFi')" class="mb-1">
      <el-switch
        v-model="filters.isWiFi"
        @input="changeFilter"
        inline-prompt
        active-color="#13ce66"
        inactive-color="#d7d3d3"
      />
    </el-form-item>
  </div>

  <el-form-item label="" class="mb-1">
    <el-button type="danger" size="small" plain round class="ml-auto" @click="resetFilters">
      {{ $t("btns.resetFilters") }}
    </el-button>
  </el-form-item>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, onMounted } from "vue";
import { useI18n } from "@/plugins";
import { usePropertiesStore } from "@/store/properties.store";
import {
  CreateApartamentDtoBookingStatusEnum as BookingStatuses,
  CreateApartamentDtoTypeEnum,
} from "@/api";
import { OptionType } from "element-plus/lib/components/select-v2/src/select.types";
import { debounce } from "@/helpers";

export default defineComponent({
  props: {
    isMobile: Boolean,
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setup(props, { emit }) {
    const i18n = useI18n();
    const propertyStore = usePropertiesStore();
    const properties = computed(() => propertyStore.getPropertiesForSelect);

    const filters = reactive({
      countBathroom: undefined,
      countBedroom: undefined,
      isKitchenAvailable: undefined,
      isWiFi: false,
      property: undefined as number | undefined,
      name: undefined,
      statuses: [],
      types: [],
    });

    const changeFilter = debounce(async () => {
      emit("search", filters);
    });

    const TypeProperty = computed(() => {
      const result: OptionType[] = [];

      for (const key in CreateApartamentDtoTypeEnum) {
        if (Object.prototype.hasOwnProperty.call(CreateApartamentDtoTypeEnum, key)) {
          result.push({
            label: i18n.t(`typeProperty.${key}`),
            value: key,
          });
        }
      }
      return result;
    });

    const options = computed(() => {
      const result: OptionType[] = [];

      for (const key in BookingStatuses) {
        if (Object.prototype.hasOwnProperty.call(BookingStatuses, key)) {
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
      changeFilter();
    };

    onMounted(() => {
      changeFilter();
    });

    return {
      filters,
      properties,
      BookingStatuses,
      TypeProperty,
      resetFilters,
      changeFilter,
      options,
    };
  },
});
</script>
<style lang="scss">
.obj-view-list {
  &.b-grid {
    padding-bottom: 0;

    &:last-child {
      padding-bottom: space(5);
    }
  }
}
</style>
