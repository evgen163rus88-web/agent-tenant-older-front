<template>
  <div v-if="!addFromSecurityDeposit" class="d-flex align-center">
    <el-button text @click="$router.push({ name: RouteName.BILLS })">←</el-button>
    <span>&nbsp;&nbsp;</span>
    <h1 class="headline-2">{{ $t("makingIncome") }}</h1>
  </div>
  <el-divider v-if="!addFromSecurityDeposit" />
  <p v-else class="d-flex align-center title mb-3">
    <b-icon color="bg-dark" class="mr-1">info</b-icon>
    <span>
      {{ $t("amoutDeposit", { sum: bookingInfo?.pledge }) }}
    </span>
  </p>

  <el-card
    class="ml-auto mr-auto income-form"
    :class="{ 'w-half': !addFromSecurityDeposit }"
    v-loading="loading"
  >
    <el-form :model="incomeForm" :rules="rules" ref="ruleFormRef" label-position="left">
      <div class="d-flex flex-mobile-wrap">
        <div class="w-half">
          <el-form-item :label="$t('billsIncomeType.title')" prop="type" class="mb-3">
            <el-select-v2
              v-model="incomeForm.type"
              :options="options"
              style="width: 310px"
              @change="changeApartament"
            />
          </el-form-item>

          <el-form-item :label="$t('listObj.name')" prop="name" class="mb-3">
            <el-input v-model="incomeForm.name" />
          </el-form-item>

          <el-form-item :label="$t('fields.sum')" prop="amount" class="mb-3">
            <el-input v-model="incomeForm.amount" :disabled="customerCommunal.length > 0" />
          </el-form-item>

          <el-form-item
            v-show="requiredApartament"
            :label="$t('fields.chooseApartament')"
            prop="apartamentId"
            class="mb-3"
          >
            <el-select
              v-model="incomeForm.apartamentId"
              filterable
              value-key="id"
              @change="searchClient"
              :disabled="addFromSecurityDeposit"
            >
              <el-option-group
                v-for="(group, j) in apartaments"
                :key="`apart${j}`"
                :label="group[0].parent"
              >
                <el-option
                  v-for="item in group"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-option-group>
            </el-select>
          </el-form-item>

          <el-form-item
            v-if="requiredApartament && customer"
            :label="$t('fields.guest')"
            class="mb-3"
            prop="customerId"
          >
            <el-input :model-value="customerValue" disabled />
          </el-form-item>
        </div>

        <el-card v-if="customerCommunal.length" shadow="never" class="income-form__customer">
          <p class="title w-100 text-center mb-2">{{ $t("unpaidCustomerBills") }}</p>
          <el-checkbox-group
            v-model="communalsOfCustomer"
            class="d-flex flex-column"
            @change="setAmount"
          >
            <el-checkbox
              v-for="communal in customerCommunal"
              :key="communal.id"
              :label="communal.id"
              class="mb-2 mr-0 income-form__checkboxes"
              border
            >
              {{ parseLabelCommunal(communal) }}
            </el-checkbox>
          </el-checkbox-group>
        </el-card>
      </div>

      <el-divider />

      <el-form-item class="footer-btns-form">
        <el-button class="title" size="large" @click="resetForm(ruleFormRef)">
          {{ $t(addFromSecurityDeposit ? "btns.back" : "btns.reset") }}
        </el-button>

        <el-button
          class="ml-auto title"
          type="primary"
          size="large"
          @click="submitForm(ruleFormRef)"
          :disabled="requiredApartament && !incomeForm.apartamentId"
        >
          {{ $t("btns.save") }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref, onMounted, PropType } from "vue";
import { RouteName } from "@/router/router-utils";
import { OptionType } from "element-plus/lib/components/select-v2/src/select.types";
import { useI18n } from "@/plugins";
import {
  CreateBillsIncomeDtoTypeEnum as IncomeTypes,
  LatestCustomerCommunal,
  CreateBillsIncomeDto,
  apartamentsApi,
  incomeApi,
  BaseEntityShema,
  ResponseFromBooking,
  FindOneBookingDto,
  communalApi,
} from "@/api";
import type { FormInstance } from "element-plus";
import { ElMessage, ElMessageBox } from "element-plus";
import { useIncomeRules } from "./IncomeFormRules";

export default defineComponent({
  props: {
    addFromSecurityDeposit: Boolean,
    apartamentIdFromDeposit: {
      type: Number,
    },
    bookingInfo: {
      type: Object as PropType<FindOneBookingDto>,
    },
    idNotice: {
      type: Number,
    },
  },
  setup(props, { emit }) {
    const i18n = useI18n();
    const loading = ref(false);
    const ruleFormRef = ref<FormInstance>();
    const apartaments = ref<{ [key: string]: Array<BaseEntityShema> }>();
    const customer = ref<ResponseFromBooking>();
    const customerCommunal = ref<LatestCustomerCommunal[]>([]);
    const customerValue = computed(() =>
      customer.value
        ? `${customer.value.customerId[0].firstName} ${customer.value.customerId[0].lastName}`
        : undefined
    );
    const communalsOfCustomer = ref([]);
    const requiredApartament = computed(() => {
      return incomeForm.type === IncomeTypes.COMMUNAL || incomeForm.type === IncomeTypes.RENT;
    });

    const options = computed(() => {
      const result: OptionType[] = [];

      for (const key in IncomeTypes) {
        result.push({
          label: i18n.t(`billsTypes.${key}`),
          value: key,
        });
      }
      return result;
    });

    const incomeForm = reactive<Partial<CreateBillsIncomeDto>>({
      name: undefined,
      type: undefined,
      amount: undefined,
      apartamentId: undefined,
      customerId: undefined,
    });

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;

      if (props.addFromSecurityDeposit) {
        emit("close");
        return;
      }

      formEl.resetFields();
      customerCommunal.value = [];
      communalsOfCustomer.value = [];
    };

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          loading.value = true;
          try {
            const result = (await incomeApi.setIncome(incomeForm as CreateBillsIncomeDto)).data;

            if (communalsOfCustomer.value.length) {
              for (let i = 0; i < communalsOfCustomer.value.length; i++) {
                await communalApi.updateById(communalsOfCustomer.value[i], {
                  incomeId: result.id,
                  isFullyPayment: true,
                  actualPaymentElectric: customerCommunal.value.find(
                    (c) => c.id === communalsOfCustomer.value[i]
                  )?.total.electricitySum,
                  actualPaymentWater: customerCommunal.value.find(
                    (c) => c.id === communalsOfCustomer.value[i]
                  )?.total.waterSum,
                });
              }
            }

            ElMessage({
              type: "success",
              message: i18n.t("savedSuccess"),
            });

            // Если заносим доход из модального окна (вычет из страхового депозита)
            if (props.addFromSecurityDeposit && props.apartamentIdFromDeposit) {
              ElMessageBox.confirm(`${i18n.t("continuePutIncomeFromDeposit")}`, i18n.t("warning"), {
                confirmButtonText: i18n.t("yes"),
                cancelButtonText: i18n.t("no"),
                type: "warning",
                draggable: true,
                center: true,
              })
                .then(async () => {
                  formEl.resetFields();
                  incomeForm.apartamentId = props.apartamentIdFromDeposit;
                  await searchClient();
                })
                .catch(() => {
                  emit("done", props.idNotice);
                });
              return;
            } else {
              resetForm(formEl);
            }
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

    const changeApartament = async () => {
      if (requiredApartament.value && !apartaments.value) {
        loading.value = true;
        try {
          apartaments.value = (await apartamentsApi.getAllByCompany()).data.data;
        } finally {
          loading.value = false;
        }
      } else {
        incomeForm.apartamentId = props.apartamentIdFromDeposit;
        customerCommunal.value = [];
      }

      if (props.addFromSecurityDeposit && props.apartamentIdFromDeposit) {
        await searchClient();
      }
    };

    const searchClient = async () => {
      loading.value = true;
      try {
        customer.value = (await incomeApi.getCustomer(String(incomeForm.apartamentId))).data;

        if (customer.value.id) {
          incomeForm.customerId = customer.value.customerId[0].id;
        }

        if (incomeForm.type === IncomeTypes.COMMUNAL) {
          customerCommunal.value = (
            await communalApi.findByCustomer(
              String(incomeForm.customerId),
              String(incomeForm.apartamentId)
            )
          ).data;

          if (customerCommunal.value.length && customerCommunal.value[0].customerId?.length === 0) {
            incomeForm.customerId = undefined;
            customer.value = undefined;
          }
        }
      } finally {
        loading.value = false;
      }
    };

    const parseLabelCommunal = (communal: LatestCustomerCommunal) => {
      const text = i18n.t("summaryIncomeCommunal", {
        sumW: communal.total.waterSum,
        sumE: communal.total.electricitySum,
        date: dayjs(communal.updatedAt).format("L"),
      });

      return text;
    };

    const setAmount = () => {
      incomeForm.amount = communalsOfCustomer.value
        .map((id) => {
          return customerCommunal.value.find((com) => com.id === id);
        })
        .reduce((acc, curr) => {
          acc += Number(curr?.total?.electricitySum) + Number(curr?.total?.waterSum) || 0;
          return acc;
        }, 0);
    };

    onMounted(async () => {
      if (props.addFromSecurityDeposit && props.apartamentIdFromDeposit) {
        incomeForm.apartamentId = props.apartamentIdFromDeposit;
        await searchClient();
      }
    });

    return {
      loading,
      customer,
      setAmount,
      resetForm,
      submitForm,
      apartaments,
      customerValue,
      requiredApartament,
      communalsOfCustomer,
      customerCommunal,
      parseLabelCommunal,
      changeApartament,
      searchClient,
      ruleFormRef,
      incomeForm,
      RouteName,
      options,
      ...useIncomeRules(requiredApartament),
    };
  },
});
</script>
<style lang="scss">
.income-form {
  .el-form-item__content,
  .el-select {
    width: 100%;
  }

  &__customer {
    @extend %ml-3;
    width: 50%;

    @media screen and (max-width: 800px) {
      width: 100%;
      margin-left: 0;
      margin-top: space(2);

      .title {
        font-size: fontSize(paragraph);
      }
    }
  }

  &__checkboxes {
    .el-checkbox__label {
      font-size: fontSize(label);
      line-height: 1.2rem;
      white-space: break-spaces;
    }
  }
}
</style>
