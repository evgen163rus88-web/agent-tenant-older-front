<template>
  <el-form
    :model="billForm"
    :rules="rules"
    ref="ruleFormRef"
    label-position="left"
    v-loading="loading"
  >
    <el-form-item :label="$t('type')" prop="type" class="mb-3 w-half">
      <el-select-v2 v-model="billForm.type" :options="options" style="width: 310px" disabled />
    </el-form-item>

    <el-form-item :label="$t('listObj.name')" prop="name" class="mb-3 w-half">
      <el-input v-model="billForm.name" />
    </el-form-item>

    <el-form-item :label="$t('fields.sum')" prop="amount" class="mb-3 w-half">
      <el-input v-model="billForm.amount" :disabled="item?.type === IncomeTypes.COMMUNAL" />
    </el-form-item>

    <el-divider />

    <el-form-item class="footer-btns-form">
      <el-button class="ml-auto title" type="primary" size="large" @click="submitForm(ruleFormRef)">
        {{ $t("btns.save") }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref, PropType, onMounted } from "vue";
import { OptionType } from "element-plus/lib/components/select-v2/src/select.types";
import { useI18n } from "@/plugins";
import {
  CreateBillsExpenseDtoTypeEnum as ExpensesTypes,
  CreateBillsIncomeDtoTypeEnum as IncomeTypes,
  CreateBillsExpenseDto,
  CreateBillsIncomeDto,
  expensesApi,
  incomeApi,
} from "@/api";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { useExpensesRules } from "./ExpensesFormRules";

export default defineComponent({
  props: {
    target: {
      type: String as PropType<"fetchExpenses" | "fetchIncome">,
      required: true,
    },
    item: {
      type: Object as PropType<CreateBillsExpenseDto | CreateBillsIncomeDto>,
    },
  },
  setup(props, { emit }) {
    const i18n = useI18n();
    const loading = ref(false);
    const ruleFormRef = ref<FormInstance>();
    const types = computed(() => (props.target === "fetchExpenses" ? ExpensesTypes : IncomeTypes));
    const options = computed(() => {
      const result: OptionType[] = [];

      for (const key in types.value) {
        if (Object.prototype.hasOwnProperty.call(types.value, key)) {
          result.push({
            label: i18n.t(`billsTypes.${key}`),
            value: key,
          });
        }
      }
      return result;
    });

    const billForm = reactive<Partial<CreateBillsExpenseDto | CreateBillsIncomeDto>>({
      name: undefined,
      type: undefined,
      amount: undefined,
    });

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          loading.value = true;
          try {
            if (props.target === "fetchIncome") {
              await incomeApi.updateincomeById(String(props.item!.id), billForm);
            } else {
              await expensesApi.updateExpensesById(String(props.item!.id), billForm);
            }
            ElMessage({
              type: "success",
              message: i18n.t("dataSuccessUpdated"),
            });
            emit("close");
          } catch (error) {
            ElMessage({
              type: "error",
              message: error as string,
            });
          } finally {
            loading.value = false;
          }
        } else {
          ElMessage({
            type: "error",
            message: i18n.t("checkCorrectForm"),
          });
        }
      });
    };

    onMounted(() => {
      billForm.name = props.item?.name;
      billForm.type = props.item?.type;
      billForm.amount = props.item?.amount;
    });

    return {
      loading,
      IncomeTypes,
      submitForm,
      ruleFormRef,
      billForm,
      options,
      ...useExpensesRules(),
    };
  },
});
</script>
