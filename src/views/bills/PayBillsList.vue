<template>
  <b-grid
    v-if="values.length > 0"
    :headers="headersData"
    :items="values"
    stub="-"
    hover
    :type="isMobile ? 'expand' : 'linear'"
  >
    <template #cell-type="{ item }">
      <el-tag effect="plain" round>
        {{ $t(`billsTypes.${item.type}`) }}
      </el-tag>
    </template>

    <template #cell-btn="{ item }">
      <div class="d-flex">
        <el-button type="primary" circle @click="edit(item)">
          <b-icon icon="edit" />
        </el-button>
        <el-button type="danger" circle @click="confirm(item)">
          <b-icon icon="delete" />
        </el-button>
      </div>
    </template>
    <template #default="{ item }">
      <MobileMore
        :data="item"
        :labels="headers"
        :mobileColumns="mobileColumns"
        @remove="confirm(item)"
        @edit="edit(item)"
      />
    </template>
  </b-grid>

  <el-empty v-else v-loading="loading" :description="$t('notFoundData')"></el-empty>

  <el-dialog
    v-model="dialogVisible"
    :width="isMobile ? '100%' : '60%'"
    :close-on-click-modal="false"
    :title="$t('editing')"
    destroy-on-close
  >
    <EditBillsModal :item="editItem" :target="target" @close="updated" />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, unref } from "vue";
import { Headers } from "@/components/_base/grid/BGrid";
import { useI18n } from "@/plugins";
import { CreateBillsExpenseDto, CreateBillsIncomeDto, expensesApi, incomeApi } from "@/api";
import { ElMessage, ElMessageBox } from "element-plus";
import EditBillsModal from "./EditBillsModal.vue";
import MobileMore from "@/components/MobileMore.vue";
import { useLayoutsStore } from "@/store/layouts.store";

export default defineComponent({
  components: { EditBillsModal, MobileMore },
  props: {
    target: {
      type: String as PropType<"fetchExpenses" | "fetchIncome">,
      required: true,
    },
    values: {
      type: Array as PropType<CreateBillsExpenseDto[] | CreateBillsIncomeDto[]>,
      required: true,
    },
    loading: Boolean,
  },
  setup(props, { emit }) {
    const layoutsStore = useLayoutsStore();
    const i18n = useI18n();
    const dialogVisible = ref(false);
    const editItem = ref<CreateBillsExpenseDto | CreateBillsIncomeDto>();
    const mobileColumns = ["name", "type", "amount"];

    const isMobile = computed(() => layoutsStore.isMobileScreen);
    const headersData = computed<Headers[]>(() => {
      if (isMobile.value) {
        return headers.value.filter((t) => mobileColumns.includes(t.prop));
      }

      return headers.value;
    });

    const headers = computed((): Headers[] => {
      let table = [
        {
          prop: "name",
          label: i18n.t("listObj.name"),
          className: "align-self-center",
          width: unref(isMobile) ? "30%" : "1fr",
        },
        {
          prop: "type",
          label: i18n.t("type"),
          className: "align-self-center",
          width: unref(isMobile) ? "38%" : "0.7fr",
        },
        {
          prop: "apartamentId",
          width: "0.8fr",
          label: i18n.t("fields.apartament"),
          className: "align-self-center",
          formatter: (val) => val[0] && val[0].name,
        },
        {
          prop: "amount",
          label: i18n.t("fields.amount"),
          classNameHeader: unref(isMobile) ? "self-end pr-1" : "self-center",
          className: unref(isMobile)
            ? "align-self-center self-end pr-1"
            : "align-self-center self-center",
          width: unref(isMobile) ? "20%" : "0.8fr",
        },
        {
          prop: "updatedAt",
          label: i18n.t("fields.date"),
          width: "0.5fr",
          isDate: true,
          formatDate: "LL",
          className: "align-self-center",
        },
        {
          prop: "btn",
          width: "90px",
          className: "align-self-center self-end",
        },
      ];

      if (props.target === "fetchIncome") {
        const customerColumn = {
          prop: "customerId",
          width: "0.8fr",
          label: i18n.t("customer"),
          className: "align-self-center",
          formatter: (val) => val[0] && val[0].firstName + " " + val[0].lastName,
        };

        table.splice(3, 0, customerColumn);
      }

      return table;
    });

    const edit = (item: CreateBillsExpenseDto | CreateBillsIncomeDto) => {
      editItem.value = item;
      dialogVisible.value = true;
    };

    const updated = () => {
      dialogVisible.value = false;
      emit("refresh");
    };

    const confirm = ({ id, name }) => {
      ElMessageBox.confirm(`${i18n.t("confirmRemoveSub", { subject: name })}`, i18n.t("warning"), {
        confirmButtonText: i18n.t("btns.ok"),
        cancelButtonText: i18n.t("btns.cancel"),
        type: "warning",
        draggable: true,
      })
        .then(async () => {
          if (props.target === "fetchIncome") {
            await incomeApi.removeIncomeById(id);
          } else {
            await expensesApi.removeExpensesById(id);
          }

          emit("refresh");

          ElMessage({
            type: "success",
            message: i18n.t("deleteCompleted"),
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: i18n.t("deleteCancel"),
          });
        });
    };

    return {
      headers,
      dialogVisible,
      mobileColumns,
      headersData,
      isMobile,
      editItem,
      confirm,
      updated,
      edit,
    };
  },
});
</script>
