<template>
  <b-page :state="page">
    <template v-if="$route.meta.isChild" #content>
      <router-view />
    </template>

    <template v-else #content>
      <div class="d-flex justify-between align-center flex-mobile-wrap">
        <h1 class="mb-2">{{ $t("pages.communal") }}</h1>

        <el-button
          class="mb-2"
          type="primary"
          @click="$router.push({ name: RouteName.ADD_COMMUNAL })"
          round
        >
          <b-icon class="mx-1" color="bg-nav" icon="add" />
          <span>{{ $t("createNoteCommunal") }}</span>
        </el-button>
      </div>

      <div class="d-flex flex-wrap align-center">
        <FilterCollaps>
          <b-icon class="mr-3 filters-mobile--icon">filter</b-icon>
          <el-select
            v-model="property"
            filterable
            :placeholder="$t('pages.properties')"
            value-key="id"
            style="width: 250px"
            class="mr-3 mb-1"
            @change="getApartments"
          >
            <el-option
              v-for="item in properties"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            />
          </el-select>

          <el-select
            v-model="filters.apartamentId"
            :placeholder="$t('fields.apartament')"
            :no-data-text="$t('againChooseProperty')"
            filterable
            clearable
            value-key="id"
            style="width: 250px"
            class="mr-3 mb-1"
            @clear="filters.apartamentId = undefined"
          >
            <el-option
              v-for="item in apartaments"
              :key="item.id"
              :label="item.name"
              :value="item.id || ''"
            />
          </el-select>

          <el-select
            v-model="filters.customerId"
            :placeholder="$t('customer')"
            filterable
            value-key="id"
            style="width: 250px"
            clearable
            @clear="filters.customerId = undefined"
            class="mb-1"
          >
            <el-option
              v-for="item in customers"
              :key="item.id"
              :value="item.id || ''"
              :label="`${item.firstName} ${item.lastName}`"
            />
          </el-select>
        </FilterCollaps>
      </div>
      <el-divider />

      <div class="ml-1 my-2">
        <el-radio-group v-model="table">
          <el-radio-button label="Water">
            {{ $t("fields.water") }}
          </el-radio-button>
          <el-radio-button label="Electric">
            {{ $t("electric") }}
          </el-radio-button>
        </el-radio-group>
      </div>

      <CommunalList
        v-if="communalData.length"
        v-loading="loading"
        :unit="table"
        :values="communalData"
        :apartamentId="filters.apartamentId"
        @refresh="paginator.getData"
      />

      <el-empty v-else :description="emptyStateText" />

      <b-paginator v-show="!paginator.hidden.value" :state="paginator" />
    </template>
  </b-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, watch, onMounted } from "vue";
import { usePage } from "@/components/_base/page/BPage";
import { RouteName } from "@/router/router-utils";
import { usePropertiesStore } from "@/store/properties.store";
import {
  FoundCustomersDTO,
  customersApi,
  apartamentsApi,
  FoundApartamentDTO,
  SearchCommunalDTO,
  CreateCommunalDto,
  communalApi,
} from "@/api";
import CommunalList from "./CommunalList.vue";
import { usePaginator } from "@/components/_base/paginator/BPaginator";
import { omit } from "@/helpers";
import { useI18n } from "@/plugins";
import { useCommunalStore } from "@/store/communal.store";
import FilterCollaps from "@/components/FilterCollaps.vue";

export default defineComponent({
  components: { CommunalList, FilterCollaps },
  setup() {
    const page = usePage();
    const loading = ref(false);
    const i18n = useI18n();
    const comStore = useCommunalStore();
    const propertyStore = usePropertiesStore();
    const properties = computed(() => propertyStore.getPropertiesForSelect);
    const beforeFilters = computed(() => comStore.getFilters);
    const apartaments = ref<FoundApartamentDTO[]>([]);
    const customers = ref<FoundCustomersDTO[]>([]);
    const communalData = ref<CreateCommunalDto[]>([]);
    const firstSearch = ref(true);
    const table = ref("Water");
    const property = ref();

    const filters = reactive<SearchCommunalDTO>({
      apartamentId: undefined,
      customerId: undefined,
    });

    const paginator = usePaginator<CreateCommunalDto>({
      api: (pagination) =>
        communalApi.getCommunalData({ ...filters, ...omit(pagination, ["totalCount"]) }),
      binding: communalData,
    });

    const emptyStateText = computed(() =>
      firstSearch.value ? i18n.t("enterSearchParameters") : i18n.t("noResultsFoundForThisRequest")
    );

    const getApartments = async () => {
      loading.value = true;
      try {
        apartaments.value = (
          await apartamentsApi.getApartamentsByParentId(String(property.value), {})
        ).data.flat();

        filters.apartamentId = undefined;
      } finally {
        loading.value = false;
      }
    };

    page.load(async () => {
      if (properties.value.length === 0) {
        await propertyStore.fetchProperties();
      } else if (properties.value.length === 1) {
        property.value = properties.value[0].id;
        await getApartments();
      }

      customers.value = (
        await customersApi.findCustomers(undefined, undefined, true, undefined, 400)
      ).data;
    });

    onMounted(async () => {
      if (beforeFilters.value.propertyChoosen) {
        property.value = beforeFilters.value.propertyChoosen;
        await getApartments();
      }

      for (const key in beforeFilters.value.savedFilters) {
        if (Object.prototype.hasOwnProperty.call(filters, key)) {
          filters[key] = beforeFilters.value.savedFilters[key];
        }
      }
    });

    watch(
      () => filters,
      async () => {
        loading.value = true;
        try {
          if (filters.apartamentId) {
            firstSearch.value = false;
            await paginator.getData();

            comStore.$patch({
              savedFilters: filters,
              propertyChoosen: property.value,
            });
          }
        } finally {
          loading.value = false;
        }
      },
      { deep: true }
    );

    return {
      page,
      table,
      loading,
      property,
      paginator,
      properties,
      communalData,
      getApartments,
      emptyStateText,
      apartaments,
      customers,
      RouteName,
      filters,
    };
  },
});
</script>
