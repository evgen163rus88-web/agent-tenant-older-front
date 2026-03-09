<template>
  <b-page :state="page">
    <template v-if="$route.meta.isChild" #content>
      <router-view />
    </template>

    <template v-else #content>
      <div class="d-flex justify-between mb-2 flex-mobile-wrap align-center">
        <h1>{{ $t("pages.apartments") }}</h1>

        <el-button type="primary" @click="goToCreateObj" round :disabled="!canAddObj">
          <b-icon class="mx-1" color="bg-nav" icon="add" />
          <span>{{ $t("addObject") }}</span>
        </el-button>
      </div>

      <div class="d-flex align-center">
        <b-icon class="mr-2 mb-1 filters-mobile--icon" style="transform: translateY(-50%)"> filter </b-icon>
        <FilterCollaps>
          <ObjectsFilters :isMobile="isMobile" @search="changeFilter" />
        </FilterCollaps>
      </div>
      <el-divider />

      <ObjectList
        v-for="(data, j) in apartaments"
        :key="data[0].id + loadingKey"
        v-loading="loading"
        :apartaments="data"
        :headers="headers"
        :hideHeader="j > 0"
        @refresh="changeFilter"
        class="obj-view-list"
      />
      <b-empty-state v-if="apartaments.length === 0" class="mt-5" />
    </template>
  </b-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref, unref, shallowRef } from "vue";
import { usePage } from "@/components/_base/page/BPage";
import { RouteName } from "@/router/router-utils";
import { useI18n, useRouter } from "@/plugins";
import { usePropertiesStore } from "@/store/properties.store";
import {
  CreateApartamentDtoBookingStatusEnum as BookingStatuses,
  apartamentsApi,
  FoundApartamentDTO,
  QueryApartamentDto,
} from "@/api";
import { OptionType } from "element-plus/lib/components/select-v2/src/select.types";
import ObjectList from "./ObjectList.vue";
import { debounce, omit } from "@/helpers";
import FilterCollaps from "@/components/FilterCollaps.vue";
import ObjectsFilters from "./ObjectsFilters.vue";
import { Headers } from "@/components/_base/grid/BGrid";
import { useLayoutsStore } from "@/store/layouts.store";
import { useUserStore } from "@/store/user.store";

export default defineComponent({
  components: { ObjectList, FilterCollaps, ObjectsFilters },
  setup() {
    const loadingKey = ref(1);
    const loading = ref(false);
    const router = useRouter();
    const i18n = useI18n();
    const apartaments = ref<FoundApartamentDTO[]>([]);
    const propertyStore = usePropertiesStore();
    const layoutsStore = useLayoutsStore();
    const userStore = useUserStore();

    const isAdmin = computed(() => userStore.isAdmin);
    const isManager = computed(() => userStore.isManager);
    const canAddObj = computed(() => unref(isAdmin) || unref(isManager));
    const properties = computed(() => propertyStore.getPropertiesForSelect);

    const isMobile = computed(() => layoutsStore.isMobileScreen);
    const page = usePage();
    const filters = shallowRef<QueryApartamentDto & { property?: number; statuses?: [] }>({});

    page.load(async () => {
      await propertyStore.fetchProperties();

      if (properties.value.length === 1) {
        unref(filters).property = properties.value[0].id;
      }
    });

    const goToCreateObj = () => {
      if (canAddObj.value) {
        router.push({ name: RouteName.CREATEOBJ });
      }
    };

    const changeFilter = debounce(async (localFilter) => {
      filters.value = localFilter;
      loading.value = true;

      try {
        apartaments.value = (
          await apartamentsApi.getApartamentsByParentId(String(unref(filters)?.property || "all"), {
            ...omit(unref(filters), ["bookingStatuses", "property"]),
            bookingStatuses: unref(filters).statuses?.length ? unref(filters).statuses : undefined,
          })
        ).data;

        propertyStore.$patch({
          currentParentId: unref(filters).property,
        });

        loadingKey.value += 1;
      } finally {
        loading.value = false;
      }
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

    const headers = computed((): Headers[] => [
      {
        prop: "name",
        label: i18n.t("listObj.name") as string,
        width: unref(isMobile) ? "30%" : "1fr",
      },
      {
        prop: "roomArea",
        width: "0.5fr",
        label: i18n.t("listObj.roomArea") as string,
      },
      {
        prop: "countBedroom",
        label: i18n.t("listObj.countBedRooms") as string,
        className: unref(isMobile) ? "align-self-center self-center" : "",
        width: unref(isMobile) ? "30%" : "120px",
      },
      {
        prop: "countBathroom",
        label: i18n.t("listObj.countBathRooms") as string,
        width: "0.5fr",
      },
      {
        prop: "pricePerMounth",
        label: i18n.t("listObj.priceMouth") as string,
        width: "0.6fr",
      },
      {
        prop: "pricePerDay",
        label: i18n.t("listObj.priceDay") as string,
        width: "0.6fr",
      },
      {
        prop: "bookingStatus",
        label: i18n.t("listObj.status") as string,
        width: unref(isMobile) ? "30%" : "0.5fr",
      },
      {
        prop: "updatedAt",
        width: "0.7fr",
        label: i18n.t("listObj.updatedAt") as string,
        isDate: true,
        formatDate: "LLL",
      },
    ]);

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

    return {
      page,
      loading,
      isMobile,
      canAddObj,
      goToCreateObj,
      properties,
      loadingKey,
      BookingStatuses,
      resetFilters,
      changeFilter,
      apartaments,
      headers,
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
