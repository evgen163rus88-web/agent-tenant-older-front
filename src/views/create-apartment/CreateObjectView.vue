<template>
  <div v-if="!isEdit" class="d-flex align-center">
    <el-button text @click="$router.push({ name: RouteName.OBJECT })">←</el-button>
    <span>&nbsp;&nbsp;</span>
    <h1>{{ $t("addObject") }}</h1>
  </div>
  <el-divider v-if="!isEdit" />

  <el-card class="apartment-form--card" v-loading="loading">
    <el-form ref="ruleFormRef" label-position="top" :model="apartamentForm" :rules="rules" status-icon>
      <div class="d-flex flex-wrap">
        <el-form-item :label="$t('building')" prop="propertyId">
          <el-select
            v-model="apartamentForm.propertyId"
            filterable
            :placeholder="$t('chooseProperty')"
            value-key="id"
            style="width: 290px"
            :size="isMobile ? 'default' : 'large'"
            class="mr-8"
          >
            <el-option v-for="item in properties" :key="item.id" :label="item.label" :value="item.id!" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('isAvailableForBooking')" prop="statusAvailable">
          <el-switch
            v-model="apartamentForm.statusAvailable"
            inline-prompt
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="Y"
            inactive-text="N"
          />
        </el-form-item>
      </div>

      <el-form-item :label="$t('listObj.name')" prop="name">
        <el-input :size="isMobile ? 'default' : 'large'" v-model="apartamentForm.name" autocomplete="off" />
      </el-form-item>

      <div class="d-flex apartment-form flex-mobile-wrap">
        <el-form-item :label="$t('fields.square')" prop="roomArea">
          <el-input
            :size="isMobile ? 'default' : 'large'"
            v-model.number="apartamentForm.roomArea"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item :label="$t('fields.countLivingRoom')" prop="countBedroom">
          <el-input
            :size="isMobile ? 'default' : 'large'"
            v-model.number="apartamentForm.countBedroom"
            autocomplete="off"
          />
        </el-form-item>

        <el-form-item :label="$t('listObj.countBathRooms')" prop="countBathroom">
          <el-input
            :size="isMobile ? 'default' : 'large'"
            v-model.number="apartamentForm.countBathroom"
            autocomplete="off"
          />
        </el-form-item>

        <div class="d-flex align-center">
          <el-form-item :label="$t('isHaveKitchen') + '?'" prop="isKitchenAvailable">
            <el-switch
              v-model="apartamentForm.isKitchenAvailable"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Y"
              inactive-text="N"
            />
          </el-form-item>

          <el-form-item :label="$t('isWiFi') + '?'">
            <el-switch
              v-model="apartamentForm.isWiFi"
              inline-prompt
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="Y"
              inactive-text="N"
            />
          </el-form-item>
        </div>
      </div>

      <div class="d-flex flex-mobile-wrap">
        <el-form-item :label="$t('pricerPerMonthRent')" prop="pricePerMounth" class="mr-6">
          <el-input :size="isMobile ? 'default' : 'large'" v-model="apartamentForm.pricePerMounth" autocomplete="off" />
        </el-form-item>

        <el-form-item :label="$t('pricePerDayRent')" prop="pricePerDay" class="mr-6">
          <el-input :size="isMobile ? 'default' : 'large'" v-model="apartamentForm.pricePerDay" autocomplete="off" />
        </el-form-item>

        <el-form-item :label="$t('fields.currency')" prop="currency">
          <el-select
            v-model="apartamentForm.currency"
            filterable
            :placeholder="$t('chooseCurrency')"
            value-key="ticker"
            :style="`width: ${isMobile ? '100%' : '250px'}`"
            :size="isMobile ? 'default' : 'large'"
          >
            <el-option v-for="item in currensies" :key="item.symbol" :value="item.ticker">
              <div class="d-flex align-center justify-between">
                <b>{{ item.name }}</b>
                <span style="color: var(--el-text-color-secondary); font-size: 14px">
                  {{ item.ticker }} &mdash; {{ item.symbol }}
                </span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <el-form-item :label="$t('shortDescApart')" prop="description">
        <el-input
          v-model="apartamentForm.description"
          type="textarea"
          :rows="2"
          :size="isMobile ? 'default' : 'large'"
          autocomplete="off"
          maxlength="250"
          show-word-limit
        />
      </el-form-item>

      <el-form-item class="flex-mobile-wrap w-100" :label="$t('noticeByObj')" prop="note">
        <div class="d-flex align-center apartment-form--note" v-for="(_, index) in apartamentForm.note" :key="index">
          <el-input
            v-model="apartamentForm.note[index]"
            :size="isMobile ? 'default' : 'large'"
            clearable
            autocomplete="off"
          />
          <el-button class="ml-2" text :disabled="apartamentForm.note.length < 2" @click="changeNotes(index)">
            <b-icon>minus</b-icon>
          </el-button>
          <el-button class="ml-2" text @click="changeNotes()">
            <b-icon>plus</b-icon>
          </el-button>
        </div>
      </el-form-item>

      <el-form-item :label="$t('owner')" prop="owner">
        <el-input
          :size="isMobile ? 'default' : 'large'"
          v-model="apartamentForm.owner"
          autocomplete="off"
          :placeholder="$t('fioOwnerIfNeed')"
          class="w-half"
        />
      </el-form-item>
      <el-form-item :label="$t('photos')">
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

      <el-form-item class="footer-btns-form">
        <el-button class="title" :size="isMobile ? 'default' : 'large'" @click="resetForm(ruleFormRef, !isEdit)">
          {{ $t(`btns.${isEdit ? "cancel" : "reset"}`) }}
        </el-button>

        <el-button
          class="ml-auto title"
          type="primary"
          :size="isMobile ? 'default' : 'large'"
          @click="submitForm(ruleFormRef)"
        >
          {{ $t("btns.save") }}
        </el-button>
      </el-form-item>
    </el-form>

    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </el-card>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, computed, PropType, onMounted, unref } from "vue";
import type { FormInstance } from "element-plus";
import { usePropertiesStore } from "@/store/properties.store";
import { useCurrencyStore } from "@/store/currency.store";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile, UploadRequestHandler } from "element-plus";
import { useObjectRules } from "./ObjectValidators";
import {
  apartamentsApi,
  uploadImageApi,
  basePath,
  UpdateApartamentDto,
  FoundApartamentDTO,
  CreateFrontApartamentDTOBookingStatusEnum as BookingStatus,
  FoundApartamentDTOBookingStatusEnum as FoundBookingStatus,
  UpdateApartamentDtoBookingStatusEnum as BookingStatusEdit,
  CreateFrontApartamentDTOTypeEnum,
} from "@/api";
import { ElMessage } from "element-plus";
import { useI18n } from "@/plugins";
import { omit, toNumber } from "@/helpers";
import { useLayoutsStore } from "@/store/layouts.store";
import { RouteName } from "@/router/router-utils";

export default defineComponent({
  components: { Plus },
  props: {
    apartment: {
      type: Object as PropType<Partial<Omit<FoundApartamentDTO, "bookingId" | "createdAt" | "updatedAt">>>,
    },
    isEdit: Boolean,
  },
  setup(props, { emit }) {
    const i18n = useI18n();
    const layoutsStore = useLayoutsStore();
    const ruleFormRef = ref<FormInstance>();
    const currencyStore = useCurrencyStore();
    const propertyStore = usePropertiesStore();

    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);
    const loading = ref(false);

    const fileList = ref<UploadUserFile[]>([]);
    const photoList = ref<{ name: string; oldName?: string }[]>([]);
    const removedPhoto = ref<string[]>([]);

    const isMobile = computed(() => layoutsStore.isMobileScreen);
    const properties = computed(() => propertyStore.getPropertiesForSelect);
    const propertyType = computed(() =>
      apartamentForm.propertyId ? propertyStore.getCurrentParentType(apartamentForm.propertyId) : ""
    );
    const currensies = computed(() => currencyStore.getCurrencies);

    const apartamentForm = reactive({
      name: "",
      roomArea: undefined as number | undefined,
      countBedroom: undefined as number | undefined,
      countBathroom: 0,
      isWiFi: false,
      isKitchenAvailable: false,
      statusAvailable: true,
      description: undefined as string | undefined,
      note: [""],
      owner: undefined,
      pricePerMounth: undefined as string | undefined,
      pricePerDay: undefined as string | undefined,
      currency: "",
      propertyId: undefined as number | undefined,
    });

    const fieldsNotToNumber = ["description", "name", "owner"];

    const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      dialogImageUrl.value = uploadFile.url!;
      dialogVisible.value = true;
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

      if (props.isEdit) {
        emit("close");
      }
    };

    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      await formEl.validate(async (valid) => {
        if (valid) {
          loading.value = true;

          try {
            if (props.isEdit) {
              if (removedPhoto.value.length) {
                for (let i = 0; i < removedPhoto.value.length; i++) {
                  try {
                    await uploadImageApi.removeImage(removedPhoto.value[i]);
                  } catch (e) {
                    console.error(e);
                  }
                }
              }

              // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
              await apartamentsApi.updateApartamentById(String(props.apartment!.id), {
                photos: photoList.value.map((p) => p.name),
                bookingStatus: (() => {
                  if (
                    props.apartment?.bookingStatus === FoundBookingStatus.NOT_AVAILABLE &&
                    apartamentForm.statusAvailable
                  ) {
                    return BookingStatusEdit.FREE;
                  }

                  return apartamentForm.statusAvailable === false ? BookingStatusEdit.NOT_AVAILABLE : undefined;
                })(),
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                ...(omit(apartamentForm, ["id", "propertyId", "statusAvailable"]) as UpdateApartamentDto),
              });
            } else {
              await apartamentsApi.createApartament({
                name: apartamentForm.name,
                roomArea: apartamentForm.roomArea!,
                countBedroom: apartamentForm.countBedroom!,
                countBathroom: apartamentForm.countBathroom,
                isWiFi: apartamentForm.isWiFi,
                isKitchenAvailable: apartamentForm.isKitchenAvailable,
                description: apartamentForm.description,
                note: apartamentForm.note,
                owner: apartamentForm.owner,
                pricePerMounth: parseFloat("" + apartamentForm.pricePerMounth?.replace(" ", "")),
                pricePerDay: parseFloat("" + apartamentForm.pricePerDay?.replace(" ", "")),
                currency: apartamentForm.currency,
                currencySymbol: currensies.value.find((c) => c.ticker === apartamentForm.currency)?.symbol || "",
                propertyId: Number(apartamentForm.propertyId),
                photos: photoList.value.map((p) => p.name),
                bookingStatus: apartamentForm.statusAvailable ? BookingStatus.FREE : BookingStatus.NOT_AVAILABLE,
                type:
                  (unref(propertyType) as unknown as CreateFrontApartamentDTOTypeEnum) ??
                  CreateFrontApartamentDTOTypeEnum.APARTMENT,
              });
            }

            ElMessage({
              type: "success",
              message: i18n.t(props.isEdit ? "editGoodsSuccess" : "createGoodsSuccess"),
            });

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
      if (props.isEdit && props.apartment) {
        for (const key in props.apartment) {
          if (Object.prototype.hasOwnProperty.call(apartamentForm, key)) {
            apartamentForm[key] =
              Array.isArray(props.apartment[key]) || fieldsNotToNumber.includes(key)
                ? props.apartment[key]
                : toNumber(props.apartment[key]);
          }
        }

        apartamentForm.statusAvailable = !(props.apartment.bookingStatus === FoundBookingStatus.NOT_AVAILABLE);

        fileList.value =
          props.apartment.photos?.map((photo) => ({
            name: photo,
            url: `${basePath}/upload-file/get/${photo}`,
          })) || [];

        photoList.value = props.apartment.photos?.map((photo) => ({ name: photo })) || [];
      }
    });

    const uploadFn: UploadRequestHandler = async (payload) => {
      const response = (await uploadImageApi.uploadImageFile(payload.file)).data.filename;
      photoList.value.push({ name: response, oldName: payload.file.name });
    };

    const changeNotes = (index?: number) => {
      if (index !== undefined) {
        apartamentForm.note = apartamentForm.note.filter((_, i) => i !== index);
      } else {
        apartamentForm.note.push("");
      }
    };

    return {
      uploadFn,
      resetForm,
      submitForm,
      changeNotes,
      isMobile,
      loading,
      fileList,
      RouteName,
      currensies,
      properties,
      ruleFormRef,
      dialogVisible,
      dialogImageUrl,
      apartamentForm,
      handleRemove,
      handlePictureCardPreview,
      ...useObjectRules(),
    };
  },
});
</script>
<style lang="scss">
.apartment-form {
  justify-content: space-between;
  flex-wrap: wrap;

  &--card {
    width: 100%;
    max-width: 75%;
    margin: 0 auto;

    @media screen and (max-width: 1440px) {
      max-width: 100%;
    }

    .el-form-item__content {
      @media screen and (max-width: 740px) {
        width: 100%;
      }
    }
  }

  &--note {
    width: 75%;

    @media screen and (max-width: 740px) {
      width: 100%;
    }

    &:not(:nth-child(1)) {
      margin-top: space(2);
    }
  }
}
</style>
