<template>
  <el-card class="w-100" v-loading="loading">
    <el-form ref="ruleFormRef" label-position="top" :model="communalForm" :rules="rules">
      <el-card shadow="never" class="gray-semi">
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
            {{ $t("btns.cancel") }}
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
import { defineComponent, ref, reactive, PropType, onMounted } from "vue";
import { FormInstance } from "element-plus/lib/components/form";
import { UpdateCommunalDto, LatestValuesCommunal, communalApi } from "@/api";
import { useCommunalRules } from "./CommunalAdd";
import { ElMessage } from "element-plus";
import { useI18n } from "@/plugins";

export default defineComponent({
  props: {
    apartamentId: {
      type: String,
      required: true,
    },
    item: {
      type: Object as PropType<UpdateCommunalDto>,
      required: true,
    },
  },
  emits: ["close", "refresh"],
  setup(props, { emit }) {
    const i18n = useI18n();
    const ruleFormRef = ref<FormInstance>();
    const latestValues = ref<Partial<LatestValuesCommunal>>({});
    const propertyId = ref();
    const loading = ref(false);

    const communalForm = reactive<Partial<UpdateCommunalDto>>({
      tariffWater: undefined,
      valueWater: undefined,
      tariffElectric: undefined,
      valueElectric: undefined,
    });

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
      emit("close");
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
            await communalApi.updateById(String(props.item.id), {
              ...communalForm,
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

            emit("refresh");
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
      latestValues.value = (await communalApi.getLatest(props.apartamentId, true)).data;
    };

    onMounted(async () => {
      for (const key in props.item) {
        if (Object.prototype.hasOwnProperty.call(communalForm, key)) {
          communalForm[key] = props.item[key];
        }
      }
      await checkLatest();
    });

    return {
      loading,
      resetForm,
      propertyId,
      submitForm,
      ruleFormRef,
      communalForm,
      latestValues,
      ...useCommunalRules(),
    };
  },
});
</script>
