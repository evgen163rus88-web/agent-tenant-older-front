<template>
  <el-form
    ref="ruleFormRef"
    label-position="top"
    :model="propertyForm"
    status-icon
    :rules="rules"
    label-width="120px"
    v-loading="loading"
  >
    <el-form-item :label="$t('listObj.name')" prop="name">
      <el-input size="large" v-model="propertyForm.name" autocomplete="off" />
    </el-form-item>

    <el-form-item :label="$t('fields.typeProp')" prop="type">
      <el-select v-model="propertyForm.type" filterable placeholder="" style="width: 250px">
        <el-option v-for="item in TypeProperty" :key="item" :label="$t(`typeProperty.${item}`)" :value="item" />
      </el-select>
    </el-form-item>

    <el-form-item :label="$t('fields.address')" prop="address">
      <el-input size="large" v-model="propertyForm.address" autocomplete="off" />
    </el-form-item>

    <el-form-item :label="$t('shortDesc')" prop="description" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea">
      <el-input size="large" v-model="propertyForm.description" />
    </el-form-item>

    <el-form-item>
      <el-button @click="resetForm(ruleFormRef)">
        {{ $t("btns.cancel") }}
      </el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        {{ $t("btns.save") }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref, defineEmits, defineProps, PropType } from "vue";
import type { FormInstance } from "element-plus";
import { propertyApi, UpdatePropertyDto, CreatePropertyDto, CreateApartamentDtoTypeEnum as TypeProperty } from "@/api";
import { ElMessage } from "element-plus";
import { useI18n } from "@/plugins";

const ruleFormRef = ref<FormInstance>();
const i18n = useI18n();
const loading = ref(false);
const emit = defineEmits(["close"]);
const props = defineProps({
  property: {
    type: Object as PropType<Partial<UpdatePropertyDto | CreatePropertyDto>>,
  },
  isEdit: Boolean,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateName = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error(i18n.t("enterName")));
  } else {
    if (propertyForm.name !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("name", () => null);
    }
    callback();
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateAddress = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error(i18n.t("enterAddress")));
  } else {
    callback();
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validateType = (rule: any, value: any, callback: any) => {
  if (!value || value === "") {
    callback(new Error(i18n.t("enterTypeProp")));
  } else {
    callback();
  }
};

const propertyForm = reactive({
  name: props.property?.name || "",
  address: props.property?.address || "",
  description: props.property?.description || "",
  type: props.property?.type,
});

const rules = reactive({
  name: [{ validator: validateName, trigger: "blur" }],
  address: [{ validator: validateAddress, trigger: "blur" }],
  type: [{ validator: validateType, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate(async (valid) => {
    if (valid) {
      loading.value = true;

      const action =
        props.isEdit && props.property
          ? (object) => propertyApi.updatePropertyById("" + props.property?.id, object)
          : (object) => propertyApi.createProperty(object);

      try {
        await action({
          name: propertyForm.name,
          address: propertyForm.address,
          description: propertyForm.description,
          type: propertyForm.type,
        });

        ElMessage({
          type: "success",
          message: i18n.t("savedSuccess"),
        });

        resetForm(formEl);
      } catch (error) {
        // error handling
      } finally {
        loading.value = false;
      }
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  emit("close");
};
</script>
