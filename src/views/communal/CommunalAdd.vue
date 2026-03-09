<template>
  <div class="d-flex align-center">
    <el-button text @click="back">←</el-button>
    <span>&nbsp;&nbsp;</span>
    <h1 class="headline-2">{{ $t("createNoteCommunal2") }}</h1>
  </div>
  <el-divider />
  <el-card class="ml-auto w-half mr-auto" v-loading="loading">
    <el-select
      v-model="propertyId"
      filterable
      :placeholder="$t('fields.checkProperties')"
      value-key="id"
      style="width: 250px"
      class="mb-2"
      @change="getApartments"
    >
      <el-option
        v-for="item in properties"
        :key="item.id"
        :label="item.label"
        :value="item.id || ''"
      />
    </el-select>

    <el-form
      v-show="propertyId"
      ref="ruleFormRef"
      label-position="top"
      :model="communalForm"
      :rules="rules"
    >
      <el-card shadow="never" class="gray-semi">
        <div class="d-flex align-center flex-mobile-wrap">
          <el-form-item :label="$t('fields.chooseApartament')" prop="apartamentId" class="mr-4">
            <el-select
              v-model="communalForm.apartamentId"
              filterable
              value-key="id"
              style="width: 250px"
              @change="checkLatest"
            >
              <el-option
                v-for="item in apartaments"
                :key="item.id"
                :label="item.name"
                :value="item.id || ''"
              />
            </el-select>
          </el-form-item>

          <el-form-item :label="$t('fields.chooseClientIf')" prop="customerId">
            <el-select
              v-model="communalForm.customerId"
              filterable
              value-key="id"
              style="width: 250px"
              clearable
            >
              <el-option
                v-for="item in customers"
                :key="item.id"
                :value="item.id || ''"
                :label="`${item.firstName} ${item.lastName}`"
              />
            </el-select>
          </el-form-item>
        </div>

        <el-card class="my-3" shadow="never">
          <template #header>
            <div class="d-flex align-center">
              <p class="title bg-dark--text mr-6">
                {{ $t("electric") }}
              </p>

              <p v-show="latestValues.valueElectric" class="paragraph devil--text">
                {{ $t("previosValue", { last: latestValues.valueElectric }) }}
              </p>
            </div>
          </template>
          <div class="d-flex flex-mobile-wrap">
            <el-form-item
              :label="$t('fields.tariffElectric')"
              prop="tariffElectric"
              class="w-30-desk mr-4"
            >
              <el-input v-model="communalForm.tariffElectric" class="mr-1" />
            </el-form-item>

            <el-form-item
              class="w-30-desk"
              :label="$t('fields.valueElectric')"
              prop="valueElectric"
            >
              <el-input v-model="communalForm.valueElectric" class="mr-1" />
            </el-form-item>
          </div>
        </el-card>

        <el-card shadow="never">
          <template #header>
            <div class="d-flex align-center">
              <p class="title bg-dark--text mr-6">
                {{ $t("fields.water") }}
              </p>

              <p v-show="latestValues.valueWater" class="paragraph devil--text">
                {{ $t("previosValue", { last: latestValues.valueWater }) }}
              </p>
            </div>
          </template>
          <div class="d-flex flex-mobile-wrap">
            <el-form-item
              :label="$t('fields.tariffWater')"
              prop="tariffWater"
              class="w-30-desk mr-4"
            >
              <el-input v-model="communalForm.tariffWater" class="mr-1" />
            </el-form-item>

            <el-form-item class="w-30-desk" :label="$t('fields.valueWater')" prop="valueWater">
              <el-input v-model="communalForm.valueWater" class="mr-1" />
            </el-form-item>
          </div>
        </el-card>

        <el-form-item class="footer-btns-form mt-3">
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
      </el-card>
    </el-form>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeMount, reactive } from "vue";
import { usePropertiesStore } from "@/store/properties.store";
import { FormInstance } from "element-plus/lib/components/form";
import {
  apartamentsApi,
  customersApi,
  FoundApartamentDTO,
  FoundCustomersDTO,
  CreateCommunalFront,
  LatestValuesCommunal,
  communalApi,
} from "@/api";
import { useCommunalRules } from "./CommunalAdd";
import { ElMessage } from "element-plus";
import { useI18n } from "@/plugins";
import { useRouter } from "vue-router";
import { RouteName } from "@/router/router-utils";

export default defineComponent({
  setup() {
    const i18n = useI18n();
    const propertyStore = usePropertiesStore();
    const properties = computed(() => propertyStore.getPropertiesForSelect);
    const ruleFormRef = ref<FormInstance>();
    const apartaments = ref<FoundApartamentDTO[]>([]);
    const customers = ref<FoundCustomersDTO[]>([]);
    const latestValues = ref<Partial<LatestValuesCommunal>>({});
    const $router = useRouter();
    const propertyId = ref();
    const loading = ref(false);

    const communalForm = reactive<Partial<CreateCommunalFront>>({
      tariffWater: undefined,
      valueWater: undefined,
      tariffElectric: undefined,
      valueElectric: undefined,
      apartamentId: undefined as number | undefined,
      customerId: undefined,
    });

    const getApartments = async () => {
      loading.value = true;
      try {
        communalForm.apartamentId = undefined;
        latestValues.value = {};

        apartaments.value = (
          await apartamentsApi.getApartamentsByParentId(propertyId.value, {})
        ).data.flat();
      } finally {
        loading.value = false;
      }
    };

    onBeforeMount(async () => {
      if (properties.value.length === 0) {
        await propertyStore.fetchProperties();
      }
      customers.value = (
        await customersApi.findCustomers(undefined, undefined, true, undefined, 400)
      ).data;
    });

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
    };

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          if (
            latestValues.value.valueElectric &&
            latestValues.value.valueWater &&
            (+communalForm.valueElectric! < latestValues.value.valueElectric ||
              +communalForm.valueWater! < latestValues.value.valueWater)
          ) {
            ElMessage({
              type: "error",
              message: i18n.t("currentValueLessThanPrev"),
            });
            return;
          }

          loading.value = true;

          try {
            await communalApi.createNote({
              ...(communalForm as CreateCommunalFront),
              diffElectric: latestValues.value.valueElectric
                ? communalForm.valueElectric! - latestValues.value.valueElectric
                : +communalForm.valueElectric!,
              diffWater: latestValues.value.valueWater
                ? communalForm.valueWater! - latestValues.value.valueWater
                : +communalForm.valueWater!,
            });
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

    const checkLatest = async () => {
      if (communalForm.apartamentId) {
        latestValues.value = (await communalApi.getLatest("" + communalForm.apartamentId)).data;
      }
    };

    const back = () => {
      $router.push({
        name: RouteName.COMMUNAL,
      });
    };

    return {
      back,
      loading,
      resetForm,
      customers,
      propertyId,
      submitForm,
      properties,
      ruleFormRef,
      apartaments,
      checkLatest,
      communalForm,
      latestValues,
      getApartments,
      ...useCommunalRules(),
    };
  },
});
</script>
