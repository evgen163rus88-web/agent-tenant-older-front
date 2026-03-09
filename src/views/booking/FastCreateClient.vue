<template>
  <el-form label-position="top" :model="clientForm" status-icon v-loading="loading">
    <div class="d-flex justify-around flex-wrap">
      <el-form-item :label="$t('listObj.firstName')" prop="firstName" class="mr-2 w-100 mw-30-desk">
        <el-input v-model="clientForm.firstName" autocomplete="off" size="large" />
      </el-form-item>
      <el-form-item :label="$t('listObj.lastName')" prop="lastName" class="mr-2 w-100 mw-30-desk">
        <el-input v-model="clientForm.lastName" autocomplete="off" size="large" />
      </el-form-item>
    </div>
    <el-divider />

    <el-form-item class="ml-auto">
      <el-button class="title" size="large" @click="$emit('close')">
        {{ $t("btns.cancel") }}
      </el-button>

      <el-button
        class="ml-auto title"
        type="primary"
        size="large"
        @click="submitForm"
        :disabled="isDisabled"
      >
        {{ $t("btns.save") }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from "vue";
import { customersApi, CreateFrontCustomerDTO } from "@/api";
import { ElMessage } from "element-plus";
import { useI18n } from "@/plugins";

export default defineComponent({
  setup(_, { emit }) {
    const i18n = useI18n();
    const loading = ref(false);

    const clientForm = reactive<CreateFrontCustomerDTO>({
      firstName: "",
      lastName: "",
      passportNumber: "no data",
      phone: String(Math.ceil(Math.random() * 100000)),
      isActive: true,
    });

    const isDisabled = computed(
      () => clientForm.firstName.length < 2 || clientForm.lastName.length < 2
    );

    const submitForm = async () => {
      loading.value = true;
      try {
        await customersApi.createCustomer(clientForm);

        ElMessage({
          type: "success",
          message: i18n.t("createClientSuccess"),
        });
        emit("done");
        emit("close");
      } finally {
        loading.value = false;
      }
    };

    return {
      loading,
      submitForm,
      clientForm,
      isDisabled,
    };
  },
});
</script>
