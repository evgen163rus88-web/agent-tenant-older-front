<template>
  <div class="d-flex align-center">
    <el-button text @click="$router.push({ name: RouteName.BILLS })">←</el-button>
    <span>&nbsp;&nbsp;</span>
    <h1 class="headline-2">{{ $t("makingExpense") }}</h1>
  </div>
  <el-divider />

  <el-card class="w-half ml-auto mr-auto" v-loading="loading">
    <el-form :model="expenseForm" :rules="rules" ref="ruleFormRef" label-position="left">
      <el-form-item :label="$t('billsExpensesType.title')" prop="type" class="mb-3 w-half">
        <el-select-v2 v-model="expenseForm.type" :options="options" style="width: 310px" />
      </el-form-item>

      <el-form-item :label="$t('listObj.name')" prop="name" class="mb-3 w-half">
        <el-input v-model="expenseForm.name" />
      </el-form-item>

      <el-form-item :label="$t('fields.sum')" prop="amount" class="mb-3 w-half">
        <el-input v-model="expenseForm.amount" />
      </el-form-item>

      <el-form-item :label="$t('fields.chooseApartament')" prop="apartamentId" class="mb-3">
        <el-select v-model="expenseForm.apartamentId" filterable value-key="id">
          <el-option-group
            v-for="(group, j) in apartaments"
            :key="`apart${j}`"
            :label="group[0].parent"
          >
            <el-option v-for="item in group" :key="item.id" :label="item.name" :value="item.id" />
          </el-option-group>
        </el-select>
      </el-form-item>

      <el-divider />

      <el-form-item class="footer-btns-form">
        <el-button class="title" size="large" @click="resetForm(ruleFormRef)">
          {{ $t("btns.reset") }}
        </el-button>

        <el-button
          class="ml-auto title"
          type="primary"
          size="large"
          @click="submitForm(ruleFormRef)"
        >
          {{ $t("btns.save") }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref, onBeforeMount } from "vue";
import { RouteName } from "@/router/router-utils";
import { OptionType } from "element-plus/lib/components/select-v2/src/select.types";
import { useI18n } from "@/plugins";
import {
  CreateBillsExpenseDtoTypeEnum as ExpensesTypes,
  CreateBillsExpenseDto,
  BaseEntityShema,
  apartamentsApi,
  expensesApi,
} from "@/api";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { useExpensesRules } from "./ExpensesFormRules";

export default defineComponent({
  setup() {
    const i18n = useI18n();
    const loading = ref(false);
    const ruleFormRef = ref<FormInstance>();
    const apartaments = ref<{ [key: string]: Array<BaseEntityShema> }>();
    const options = computed(() => {
      const result: OptionType[] = [];

      for (const key in ExpensesTypes) {
        if (Object.prototype.hasOwnProperty.call(ExpensesTypes, key)) {
          result.push({
            label: i18n.t(`billsTypes.${key}`),
            value: key,
          });
        }
      }
      return result;
    });

    const expenseForm = reactive<Partial<CreateBillsExpenseDto>>({
      name: undefined,
      type: undefined,
      amount: undefined,
      apartamentId: undefined,
    });

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          loading.value = true;
          try {
            await expensesApi.setExpenses(expenseForm as CreateBillsExpenseDto);
            ElMessage({
              type: "success",
              message: i18n.t("savedSuccess"),
            });
            resetForm(formEl);
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

    onBeforeMount(async () => {
      apartaments.value = (await apartamentsApi.getAllByCompany()).data.data;
    });

    return {
      loading,
      resetForm,
      submitForm,
      ruleFormRef,
      apartaments,
      expenseForm,
      RouteName,
      options,
      ...useExpensesRules(),
    };
  },
});
</script>
