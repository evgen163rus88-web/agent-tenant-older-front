<template>
  <b-page :state="page" v-loading="loading">
    <template #content>
      <div class="d-flex align-center justify-between">
        <h1 class="mb-2">{{ $t("customers") }}</h1>
        <el-button class="mb-2" type="primary" @click="dialogVisible = true" round>
          <b-icon class="mx-1" color="bg-nav" icon="add" />
          <span>
            {{ $t("btns.createNewClient") }}
          </span>
        </el-button>
      </div>

      <FilterCollaps>
        <FiltersClient @search="toFindCustomers" />
      </FilterCollaps>
      <el-divider />

      <ClientsList v-if="customers.length > 0" :customers="customers" @edit="onEdit" />

      <el-empty v-else :description="$t('notFoundData')"></el-empty>

      <b-paginator v-show="!paginator.hidden.value" :state="paginator" />
    </template>
  </b-page>

  <el-dialog
    v-model="dialogVisible"
    :title="titleModal"
    :width="isMobile ? '100%' : '50%'"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <CreateClient
      :isEdit="showEdit"
      @close="onClose"
      @refresh="toFindCustomers({ isActive: true })"
      :client="customer"
    />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { usePage } from "@/components/_base/page/BPage";
import CreateClient from "./CreateClient.vue";
import FiltersClient from "./FiltersClient.vue";
import ClientsList from "./ClientsList.vue";
import type { FiltersCustomer } from "./FiltersClient.vue";
import { useI18n } from "@/plugins";
import { customersApi, FoundCustomersDTO, UpdateCustomerDto } from "@/api";
import { usePaginator } from "@/components/_base/paginator/BPaginator";
import { useLayoutsStore } from "@/store/layouts.store";
import FilterCollaps from "@/components/FilterCollaps.vue";

export default defineComponent({
  components: { CreateClient, FiltersClient, ClientsList, FilterCollaps },
  setup() {
    const layoutsStore = useLayoutsStore();
    const page = usePage();
    const i18n = useI18n();
    const loading = ref(false);
    const dialogVisible = ref(false);
    const showEdit = ref(false);
    const latestFilters = ref<FiltersCustomer>({
      isActive: true,
    });
    const titleModal = computed(() => i18n.t(showEdit.value ? "editDataCustomer" : "btns.createNewClient"));

    const isMobile = computed(() => layoutsStore.isMobileScreen);

    const customers = ref<FoundCustomersDTO[]>([]);
    const customer = ref<UpdateCustomerDto>();

    const paginator = usePaginator<FoundCustomersDTO>({
      api: (pagination) =>
        customersApi.findCustomers(
          latestFilters.value?.lastName,
          latestFilters.value?.phone,
          latestFilters.value?.isActive,
          latestFilters.value?.passportNumber,
          pagination.limit,
          pagination.offset
        ),
      binding: customers,
    });

    page.load(async () => {
      await paginator.getData();
    });

    const toFindCustomers = async (params?: FiltersCustomer) => {
      latestFilters.value = params ?? {};
      loading.value = true;
      await paginator.getData();
      loading.value = false;
    };

    const onEdit = (client: UpdateCustomerDto) => {
      customer.value = client;
      showEdit.value = true;
      dialogVisible.value = true;
    };

    const onClose = () => {
      showEdit.value = false;
      dialogVisible.value = false;
      customer.value = undefined;
    };

    return {
      page,
      onEdit,
      onClose,
      loading,
      isMobile,
      showEdit,
      customer,
      customers,
      paginator,
      titleModal,
      dialogVisible,
      toFindCustomers,
    };
  },
});
</script>
