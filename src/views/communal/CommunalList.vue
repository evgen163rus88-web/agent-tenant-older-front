<template>
  <b-grid :headers="headersData" :items="values" hover stub="-" :type="isMobile ? 'expand' : 'linear'">
    <template #cell-isFullyPayment="{ item }">
      <el-tag :type="item.isFullyPayment ? 'success' : 'danger'" class="mx-1" effect="dark">
        {{ $t(item.isFullyPayment ? "yes" : "no") }}
      </el-tag>
    </template>
    <template #cell-expenses="{ item }">
      {{ sumPayment(item)[1] }}
    </template>
    <template #cell-toPay="{ item }">
      {{ sumPayment(item)[0] }}
    </template>

    <template #cell-btn="{ item }">
      <el-button v-if="item.id === firstLineId && !item.isFullyPayment" type="primary" circle @click="edit(item)">
        <b-icon icon="edit" />
      </el-button>
    </template>

    <template #default="{ item }">
      <MobileMore
        :data="sumPaymentForMobile(item)"
        :labels="headers"
        :mobileColumns="mobileColumns"
        @edit="edit(item)"
        onlyEdit
      />
    </template>
  </b-grid>

  <el-dialog
    v-model="dialogVisible"
    :title="$t('editMaintance')"
    :width="isMobile ? '100%' : '60%'"
    :close-on-click-modal="false"
    destroy-on-close
  >
    <CommunalEdit
      :item="editItem"
      :apartamentId="apartamentId"
      @close="dialogVisible = false"
      @refresh="$emit('refresh')"
    />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, unref } from "vue";
import { Headers } from "@/components/_base/grid/BGrid";
import { useI18n } from "@/plugins";
import { CreateCommunalFront, UpdateCommunalDto } from "@/api";
import CommunalEdit from "./CommunalEdit.vue";
import { useLayoutsStore } from "@/store/layouts.store";
import MobileMore from "@/components/MobileMore.vue";

export default defineComponent({
  components: { CommunalEdit, MobileMore },
  props: {
    values: {
      type: Array as PropType<CreateCommunalFront[]>,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    apartamentId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const i18n = useI18n();
    const dialogVisible = ref(false);
    const layoutsStore = useLayoutsStore();
    const editItem = ref<UpdateCommunalDto>({});
    const mobileColumns = computed(() => ["createdAt", `tariff${props.unit}`, `value${props.unit}`, "isFullyPayment"]);

    const isMobile = computed(() => layoutsStore.isMobileScreen);
    const firstLineId = computed(() => props.values[0].id);
    const headersData = computed<Headers[]>(() => {
      if (isMobile.value) {
        return headers.value.filter((t) => unref(mobileColumns).includes(t.prop));
      }

      return headers.value;
    });

    const headers = computed((): Headers[] => [
      {
        prop: "createdAt",
        label: i18n.t("fields.date"),
        width: "0.6fr",
        isDate: true,
        formatDate: unref(mobileColumns) ? "L" : "LL",
        classNameHeader: "align-self-center",
        className: "align-self-center",
      },
      {
        prop: `tariff${props.unit}`,
        width: "0.7fr",
        label: i18n.t("fields.tariff"),
        classNameHeader: "align-self-center",
        className: "align-self-center",
      },
      {
        prop: `value${props.unit}`,
        label: i18n.t("fields.valueRate"),
        width: "0.8fr",
        classNameHeader: "align-self-center",
        className: "align-self-center",
      },
      {
        prop: "expenses",
        label: i18n.t("fields.expenses"),
        classNameHeader: "align-self-center",
        className: "align-self-center",
      },
      {
        prop: "toPay",
        label: i18n.t("fields.toPay"),
        classNameHeader: "align-self-center",
        className: "align-self-center",
      },
      {
        prop: "isFullyPayment",
        classNameHeader: "align-self-center",
        label: i18n.t("isPaid"),
        width: "0.5fr",
      },
      {
        prop: "btn",
        width: "50px",
        className: "align-self-center self-end",
      },
    ]);

    const sumPaymentForMobile = (item: CreateCommunalFront) => {
      return {
        ...item,
        expenses: item[`diff${props.unit}`],
        toPay: item[`diff${props.unit}`] * item[`tariff${props.unit}`],
      };
    };

    const sumPayment = (item: CreateCommunalFront) => {
      return [item[`diff${props.unit}`] * item[`tariff${props.unit}`], item[`diff${props.unit}`]];
    };

    const edit = (item: CreateCommunalFront) => {
      editItem.value = item;
      dialogVisible.value = true;
    };

    return {
      headers,
      isMobile,
      editItem,
      headersData,
      dialogVisible,
      mobileColumns,
      firstLineId,
      sumPaymentForMobile,
      sumPayment,
      edit,
    };
  },
});
</script>
