<template>
  <b-grid :headers="headersData" :items="customers" hover type="expand" stub="-">
    <template #cell-icon>
      <div class="d-flex align-center justify-center white client-icon">
        <b-icon size="large">client</b-icon>
      </div>
    </template>
    <template #cell-isActive="{ item }">
      <el-tag :type="item.isActive ? 'success' : 'danger'" class="mx-1" effect="dark">
        {{ $t(item.isActive ? "users.isActive" : "users.unActive2") }}
      </el-tag>
    </template>
    <template #default="{ item }">
      <ClientMoreInfo
        :key="item.id"
        :client="item"
        @edit="$emit('edit', $event)"
        :isMobile="isMobile"
      />
    </template>
  </b-grid>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import { Headers } from "@/components/_base/grid/BGrid";
import { useI18n } from "@/plugins";
import { FoundCustomersDTO } from "@/api";
import { phone } from "@/helpers";
import ClientMoreInfo from "./ClientMoreInfo.vue";
import { useLayoutsStore } from "@/store/layouts.store";

export default defineComponent({
  components: { ClientMoreInfo },
  props: {
    customers: {
      type: Array as PropType<FoundCustomersDTO[]>,
      required: true,
    },
  },
  emits: ["edit"],
  setup() {
    const i18n = useI18n();
    const layoutsStore = useLayoutsStore();
    const mobileColumns = ["firstName", "lastName", "isActive"];

    const isMobile = computed(() => layoutsStore.isMobileScreen);
    const headersData = computed<Headers[]>(() => {
      if (isMobile.value) {
        return headers.value.filter((t) => mobileColumns.includes(t.prop));
      }

      return headers.value;
    });

    const headers = computed((): Headers[] => [
      {
        prop: "icon",
        width: "20px",
      },
      {
        prop: "firstName",
        label: i18n.t("listObj.firstName"),
        width: "0.6fr",
        className: "fwb",
      },
      {
        prop: "lastName",
        width: "0.7fr",
        label: i18n.t("listObj.lastName"),
        className: "fwb",
      },
      {
        prop: "email",
        label: "email",
        width: "0.7fr",
      },
      {
        prop: "passportNumber",
        label: i18n.t("listObj.passportNumber"),
        width: "0.5fr",
      },
      {
        prop: "phone",
        label: i18n.t("listObj.basePhoneNumber"),
        width: "0.7fr",
        formatter: (val) => phone(val.toString().replace(/\+/, "")),
      },
      {
        prop: "isActive",
        label: i18n.t("listObj.status"),
        width: "0.5fr",
      },
      {
        prop: "updatedAt",
        label: i18n.t("listObj.updatedAt"),
        isDate: true,
        formatDate: "LLL",
      },
    ]);

    return { headers, headersData, isMobile };
  },
});
</script>
<style lang="scss">
.client-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}
</style>
