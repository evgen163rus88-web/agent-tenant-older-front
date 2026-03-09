<template>
  <el-form
    ref="ruleFormRef"
    label-position="top"
    :model="clientForm"
    :rules="rules"
    status-icon
    v-loading="loading"
  >
    <div class="d-flex justify-around flex-wrap">
      <el-form-item :label="$t('listObj.firstName')" prop="firstName" class="mr-2 w-100 mw-30-desk">
        <el-input v-model="clientForm.firstName" autocomplete="off" size="large" />
      </el-form-item>
      <el-form-item :label="$t('listObj.lastName')" prop="lastName" class="mr-2 w-100 mw-30-desk">
        <el-input v-model="clientForm.lastName" autocomplete="off" size="large" />
      </el-form-item>
      <el-form-item label="E-mail" prop="email" class="w-100 mw-30-desk">
        <el-input type="email" v-model="clientForm.email" autocomplete="off" size="large" />
      </el-form-item>
    </div>

    <el-form-item :label="$t('fields.passportNumber')" prop="passportNumber" class="w-100">
      <el-input v-model="clientForm.passportNumber" autocomplete="off" size="large" />
    </el-form-item>

    <div class="d-flex justify-between flex-wrap">
      <!-- phones -->
      <el-form-item
        :label="$t('fields.mainPhoneNumber')"
        prop="phone"
        class="w-100 mw-30-desk mr-2"
      >
        <b-phone-input
          v-model="clientForm.phone"
          @validate="isValidPhone = !!$event.valid"
          :emitInputAfter="emitInputAfter"
        />
        <div v-if="!isValidPhone" class="el-form-item__error">
          {{ $t("invalidatePhone") }}
        </div>
      </el-form-item>

      <el-form-item :label="$t('clientFormValid.activeClient')" prop="isActive">
        <el-switch
          v-model="clientForm.isActive"
          inline-prompt
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="Y"
          inactive-text="N"
        />
      </el-form-item>
    </div>

    <el-form-item :label="$t('fields.agentClient')" prop="agent" class="my-2 w-100">
      <el-input
        v-model="clientForm.agent"
        autocomplete="off"
        size="large"
        maxlength="200"
        show-word-limit
      />
    </el-form-item>

    <el-form-item :label="$t('photosDocs')">
      <el-upload
        action="#"
        list-type="picture-card"
        :http-request="uploadFn"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        accept="image/jpeg,image/png"
        :file-list="fileList"
      >
        <el-icon><Plus /></el-icon>
      </el-upload>
    </el-form-item>
    <el-divider />

    <el-form-item class="ml-auto">
      <el-button class="title" size="large" @click="resetForm(ruleFormRef, !isEdit)">
        {{ $t("btns.cancel") }}
      </el-button>

      <el-button class="ml-auto title" type="primary" size="large" @click="submitForm(ruleFormRef)">
        {{ $t("btns.save") }}
      </el-button>
    </el-form-item>
  </el-form>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, reactive, ref } from "vue";
import type { FormInstance, UploadProps, UploadRequestHandler, UploadUserFile } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { uploadImageApi, customersApi, CreateCustomerDto, basePath } from "@/api";
import { useClientRules } from "./ClientValidatorForm";
import { ElMessage } from "element-plus";
import { useI18n } from "@/plugins";
import { omit } from "@/helpers";
import { computed } from "@vue/reactivity";

export default defineComponent({
  components: { Plus },
  props: {
    client: {
      type: Object as PropType<Partial<CreateCustomerDto>>,
    },
    isEdit: Boolean,
  },
  setup(props, { emit }) {
    const i18n = useI18n();
    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);
    const loading = ref(false);
    const { rules, isValidPhone, isValidSecondaryPhone } = useClientRules();
    const emitInputAfter = computed(() => (props.isEdit ? 1 : 2));

    const ruleFormRef = ref<FormInstance>();
    const clientForm = reactive({
      firstName: "",
      lastName: "",
      email: undefined as string | undefined,
      passportNumber: "",
      phone: "",
      agent: undefined,
      isActive: true,
    });

    const fileList = ref<UploadUserFile[]>([]);
    const photoList = ref<{ name: string; oldName?: string }[]>([]);
    const removedPhoto = ref<string[]>([]);

    const resetForm = async (formEl: FormInstance | undefined, clearPhoto = true) => {
      if (!formEl) return;

      if (photoList.value.length && clearPhoto) {
        for (let i = 0; i < photoList.value.length; i++) {
          await uploadImageApi.removeImage(photoList.value[i].name);
        }
      }

      formEl.resetFields();
      fileList.value = [];
      photoList.value = [];

      emit("close");
    };

    const handleRemove: UploadProps["onRemove"] = async (uploadFile) => {
      const fileToRemove = photoList.value.find((photo) => photo.oldName === uploadFile.name);

      if (fileToRemove) {
        await uploadImageApi.removeImage(fileToRemove.name);
        photoList.value = photoList.value.filter((photo) => photo.name !== fileToRemove.name);
      } else {
        photoList.value = photoList.value.filter((photo) => photo.name !== uploadFile.name);
        removedPhoto.value.push(uploadFile.name);
      }
    };

    const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      dialogImageUrl.value = uploadFile.url!;
      dialogVisible.value = true;
    };

    const uploadFn: UploadRequestHandler = async (payload) => {
      const response = (await uploadImageApi.uploadImageFile(payload.file)).data.filename;
      photoList.value.push({ name: response, oldName: payload.file.name });
    };

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate(async (valid) => {
        if (valid && isValidPhone && isValidSecondaryPhone) {
          loading.value = true;

          try {
            if (props.isEdit && props.client?.id) {
              if (removedPhoto.value.length) {
                for (let i = 0; i < removedPhoto.value.length; i++) {
                  try {
                    await uploadImageApi.removeImage(removedPhoto.value[i]);
                  } catch (e) {
                    console.error(e);
                  }
                }
              }

              clientForm.phone = clientForm.phone.replace(/\s/g, "");

              await customersApi.updateCustomerById(String(props.client.id), {
                docsPhoto: photoList.value.map((p) => p.name),
                ...omit(clientForm, ["id"]),
              });
            } else {
              await customersApi.createCustomer({
                firstName: clientForm.firstName,
                lastName: clientForm.lastName,
                email: clientForm.email,
                phone: clientForm.phone.replace(/\s/g, ""),
                isActive: clientForm.isActive,
                passportNumber: clientForm.passportNumber,
                docsPhoto: photoList.value.map((p) => p.name),
                agent: clientForm.agent,
              });
            }

            ElMessage({
              type: "success",
              message: i18n.t(props.isEdit ? "editClientSuccess" : "createClientSuccess"),
            });

            emit("refresh");
            resetForm(formEl, false);
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
      if (props.isEdit && props.client) {
        for (const key in props.client) {
          if (Object.prototype.hasOwnProperty.call(clientForm, key)) {
            clientForm[key] = props.client[key];
          }
        }

        fileList.value =
          props.client.docsPhoto?.map((photo) => ({
            name: photo,
            url: `${basePath}/upload-file/get/${photo}`,
          })) || [];

        photoList.value = props.client.docsPhoto?.map((photo) => ({ name: photo })) || [];
      }
    });

    return {
      rules,
      loading,
      fileList,
      uploadFn,
      resetForm,
      submitForm,
      clientForm,
      ruleFormRef,
      handleRemove,
      isValidPhone,
      dialogVisible,
      dialogImageUrl,
      emitInputAfter,
      isValidSecondaryPhone,
      handlePictureCardPreview,
    };
  },
});
</script>
