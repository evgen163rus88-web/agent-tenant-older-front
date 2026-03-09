<template>
  <div class="d-flex align-center">
    <el-button text @click="$router.go(-1)">←</el-button>
    <span>&nbsp;&nbsp;</span>
    <h1 class="headline-2">
      {{ $t(!bookId ? "makeBooking" : isView ? "viewBooking" : "editBooking") }}
    </h1>
  </div>
  <el-divider />

  <el-select
    v-show="!propertyId && bookId === 0"
    v-model="propertyId"
    filterable
    :placeholder="$t('fields.checkProperties')"
    value-key="id"
    style="width: 250px"
    class="mr-3"
    v-loading="loading"
  >
    <el-option
      v-for="item in properties"
      :key="item.id"
      :label="item.label"
      :value="item.id || ''"
    />
  </el-select>

  <el-card
    v-show="propertyId || bookId !== 0"
    :class="{ 'w-half ml-auto mr-auto': !isMobile }"
    :body-style="{ padding: isMobile ? '8px' : '16px' }"
    class="make-booking"
    v-loading="loading"
  >
    <el-form
      ref="ruleFormRef"
      label-position="top"
      :model="bookingForm"
      :rules="isView ? {} : rules"
    >
      <el-form-item :label="$t('fields.periodBooking')" prop="periodTo" class="mb-3">
        <b-date-range-input
          v-model="datesBooking"
          :maxRange="12"
          :forceRangeRestriction="rangeDates"
          :disabled="isView"
        />
      </el-form-item>

      <div class="d-flex align-center mb-1 flex-mobile-wrap">
        <el-form-item
          :label="$t(isView ? 'fields.apartament' : 'fields.chooseApartament')"
          prop="apartamentId"
          class="mr-2 w-100 mw-30-desk"
        >
          <el-tooltip
            :disabled="!!(bookingForm.periodFrom && bookingForm.periodTo && !bookId) || isView"
            :content="$t(bookId ? 'editBookingOnlyCancel' : 'beforeChooseDate')"
          >
            <el-select
              v-model="bookingForm.apartamentId"
              filterable
              value-key="id"
              style="width: 250px"
              :disabled="!bookingForm.periodFrom || !bookingForm.periodTo || !!bookId || isView"
              :no-data-text="$t('inThisRangeAvailableApartaments')"
            >
              <el-option
                v-for="item in apartaments"
                :key="item.id"
                :label="item.name"
                :value="item.id || ''"
              />
            </el-select>
          </el-tooltip>
        </el-form-item>

        <el-form-item
          :label="$t(isView ? 'customer' : 'fields.chooseClient')"
          prop="customerId"
          class="mr-2 w-100 mw-30-desk"
        >
          <el-select
            v-model="bookingForm.customerId"
            filterable
            value-key="id"
            style="width: 250px"
            :disabled="isView"
          >
            <el-option
              v-for="item in customers"
              :key="item.id"
              :value="item.id || ''"
              :label="`${item.firstName} ${item.lastName}`"
            />
          </el-select>
        </el-form-item>

        <el-form-item v-show="!isView" :label="$t('fastCreateClient')" class="w-100 mw-30-desk">
          <el-button
            class="paragraph"
            size="small"
            type="primary"
            @click="showFastCreateClient = true"
          >
            {{ $t("btns.createNewClient") }}
          </el-button>
        </el-form-item>
      </div>

      <div class="my-2">
        <el-radio-group v-model="typePrice">
          <el-radio-button :label="Diapozon.PER_MOUNTH" :disabled="isView">
            {{ $t("fields.setPriceForMounth") }}
          </el-radio-button>
          <el-radio-button :label="Diapozon.PER_PERIOD" :disabled="isView">
            {{ $t("fields.setPriceForPeriod") }}
          </el-radio-button>
        </el-radio-group>
      </div>

      <BookingPricePerMounth
        v-if="typePrice === Diapozon.PER_MOUNTH"
        v-model:pricePerMounth="bookingForm.pricePerMounth"
        v-model:pricePerDay="bookingForm.pricePerDay"
        v-model:currency="bookingForm.currency"
        :currensies="currensies"
        :isView="isView"
      />

      <BookingPricePerPeriod
        v-else-if="typePrice === Diapozon.PER_PERIOD"
        v-model:priceAllPeriod="bookingForm.priceAllPeriod"
        v-model:pricePerMounth="bookingForm.pricePerMounth"
        v-model:currency="bookingForm.currency"
        :countDays="countDays"
        :currensies="currensies"
        :isView="isView"
      />

      <div class="d-flex flex-column">
        <p class="paragraph mb-2" style="color: var(--el-text-color-regular)">
          {{ $t("includeInRent") }}:
        </p>
        <el-form-item
          :label="$t('fields.includeWater')"
          prop="includeWater"
          class="make-booking--half mb-1"
        >
          <el-switch
            v-model="bookingForm.includeWater"
            inline-prompt
            active-color="#45db00"
            inactive-color="#ff5656"
            active-text="Y"
            inactive-text="N"
            :disabled="isView"
          />
        </el-form-item>

        <el-form-item
          :label="$t('fields.includeElectricity')"
          prop="includeWater"
          class="make-booking--half mb-1"
        >
          <el-switch
            v-model="bookingForm.includeElectricity"
            inline-prompt
            active-color="#45db00"
            inactive-color="#ff5656"
            active-text="Y"
            inactive-text="N"
            :disabled="isView"
          />
        </el-form-item>

        <el-form-item
          :label="$t('fields.includeHousekeeping')"
          prop="includeWater"
          class="make-booking--half mb-1"
        >
          <el-switch
            v-model="bookingForm.includeHousekeeping"
            inline-prompt
            active-color="#45db00"
            inactive-color="#ff5656"
            active-text="Y"
            inactive-text="N"
            :disabled="isView"
          />
        </el-form-item>
      </div>

      <div class="d-flex align-center mb-1 flex-mobile-wrap">
        <el-form-item :label="$t('fields.pledgeCurrency')" prop="depositCurrency" class="mr-5">
          <el-select
            v-model="bookingForm.depositCurrency"
            filterable
            :placeholder="$t('chooseCurrency')"
            value-key="ticker"
            style="width: 250px"
            :disabled="isView || disabledEarlyDeposit"
          >
            <el-option v-for="item in currensies" :key="item.symbol" :value="item.ticker">
              <div class="d-flex justify-between">
                <b>{{ item.name }}</b>
                <span style="color: var(--el-text-color-secondary); font-size: 14px">
                  {{ item.ticker }} &mdash; {{ item.symbol }}
                </span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('depositBefore')" prop="depositBefore">
          <el-input
            v-model="bookingForm.depositBefore"
            :disabled="isView || disabledEarlyDeposit"
          />
        </el-form-item>
      </div>

      <div class="d-flex align-center mb-1 flex-mobile-wrap">
        <el-form-item :label="$t('fields.pledgeCurrency')" prop="pledgeCurrency" class="mr-5">
          <el-select
            v-model="bookingForm.pledgeCurrency"
            filterable
            :placeholder="$t('chooseCurrency')"
            value-key="ticker"
            style="width: 250px"
            :disabled="isView"
          >
            <el-option v-for="item in currensies" :key="item.symbol" :value="item.ticker">
              <div class="d-flex justify-between">
                <b>{{ item.name }}</b>
                <span style="color: var(--el-text-color-secondary); font-size: 14px">
                  {{ item.ticker }} &mdash; {{ item.symbol }}
                </span>
              </div>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('fields.pledge')" prop="pledge">
          <el-input v-model="bookingForm.pledge" :disabled="isView" />
        </el-form-item>
      </div>

      <div class="d-flex align-center mb-1 flex-mobile-wrap">
        <el-form-item :label="$t('fields.countGuests')" prop="countGuests" class="mr-6">
          <el-input-number
            v-model="bookingForm.countGuests"
            :min="1"
            :max="10"
            controls-position="right"
            :disabled="isView"
          />
        </el-form-item>

        <el-form-item :label="$t('fields.payDayForLease')" prop="payDayForLease">
          <el-input-number
            v-model="bookingForm.payDayForLease"
            :min="1"
            :max="31"
            controls-position="right"
            :disabled="isView"
          />
        </el-form-item>
      </div>

      <div class="d-flex">
        <el-form-item
          :label="$t('fields.agencyCommission')"
          prop="agencyCommission"
          class="w-30-desk mr-3 make-booking--half"
        >
          <div class="d-flex">
            <el-input v-model="bookingForm.agencyCommission" class="mr-1" :disabled="isView" />
            <span class="mr-1">&mdash;</span>
            <span>{{ typePledge }}</span>
          </div>
        </el-form-item>

        <el-form-item
          :label="$t(inPercent ? 'fields.percent' : 'fields.sum')"
          prop="statusAvailable"
          class="make-booking--half"
        >
          <el-switch
            v-model="inPercent"
            inline-prompt
            active-color="#8faeeb"
            inactive-color="#7acd9f"
            :disabled="isView"
          />
        </el-form-item>
      </div>

      <el-divider v-show="!isView" />

      <el-form-item v-show="!isView" class="footer-btns-form">
        <el-button class="title" size="large" @click="resetForm(ruleFormRef)">
          {{ $t(`btns.${bookId ? "cancel" : "reset"}`) }}
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

  <el-dialog
    v-model="showFastCreateClient"
    :width="isMobile ? '100%' : '40%'"
    :close-on-click-modal="false"
    :title="$t('fastCreateClient')"
    destroy-on-close
  >
    <FastCreateClient @close="showFastCreateClient = false" @done="getCustomers" />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref, onMounted, unref } from "vue";
import { usePropertiesStore } from "@/store/properties.store";
import type { FormInstance } from "element-plus";
import {
  customersApi,
  apartamentsApi,
  BaseEntityShema,
  CreateCustomerDto,
  bookingApi,
  CreateBookingDtoTypeCommissionEnum as CommissionEnum,
  FindOneBookingDtoTypeCommissionEnum as FoundCommissionEnum,
} from "@/api";
import { useCurrencyStore } from "@/store/currency.store";
import { useBookingRules } from "./BokingValidators";
import { useBookingPrices, Diapozon } from "./useBookingPrices";
import { ElMessage } from "element-plus";
import { useI18n } from "@/plugins";
import { toNumber, compareAndRotateDates } from "@/helpers";
import { RouteName } from "@/router/router-utils";
import { useRouter, useRoute } from "vue-router";
import type { Range } from "@/components/_base/form/BDateRangeInput.vue";
import { useLayoutsStore } from "@/store/layouts.store";
import BookingPricePerMounth from "@/views/booking/prices-fields/BookingPricePerMounth.vue";
import BookingPricePerPeriod from "@/views/booking/prices-fields/BookingPricePerPeriod.vue";
import FastCreateClient from "./FastCreateClient.vue";

export default defineComponent({
  components: { FastCreateClient, BookingPricePerMounth, BookingPricePerPeriod },
  props: {
    bookId: {
      type: Number,
      required: true,
    },
  },
  setup(props, { emit }) {
    const i18n = useI18n();
    const layoutsStore = useLayoutsStore();
    const isMobile = computed(() => layoutsStore.isMobileScreen);
    const propertyStore = usePropertiesStore();
    const currencyStore = useCurrencyStore();
    const currensies = computed(() => currencyStore.getCurrencies);
    const properties = computed(() => propertyStore.getPropertiesForSelect);
    const propertyId = ref();
    const showFastCreateClient = ref(false);
    const rangeDates = reactive<Partial<Range>>({});
    const apartaments = ref<BaseEntityShema[]>([]);
    const customers = ref<CreateCustomerDto[]>([]);
    const ruleFormRef = ref<FormInstance>();
    const $router = useRouter();
    const $route = useRoute();

    const isView = computed(() => !!($route.query.view && $route.query.view === "true"));

    const bookingForm = reactive({
      periodFrom: undefined as Date | string | undefined,
      periodTo: undefined as Date | string | undefined,
      currency: undefined,
      pledge: undefined,
      pledgeCurrency: undefined,
      depositBefore: undefined,
      depositCurrency: undefined,
      pricePerDay: undefined,
      pricePerMounth: undefined,
      priceAllPeriod: undefined as number | undefined,
      countGuests: 1,
      payDayForLease: 1 as number | undefined,
      agencyCommission: undefined,
      apartamentId: undefined,
      customerId: undefined,
      typeCommission: undefined,
      includeWater: false,
      includeHousekeeping: false,
      includeElectricity: false,
      hasPriceAllPeriod: false,
    });

    const { disabledEarlyDeposit, loading, typePrice, inPercent, typePledge, countDays } =
      useBookingPrices(bookingForm);

    const datesBooking = computed({
      get: () => {
        return compareAndRotateDates([bookingForm.periodFrom, bookingForm.periodTo]);
      },
      set: (dates) => {
        bookingForm.periodFrom = dayjs(dates[0]).isValid()
          ? dayjs(dates[0]).utc(true).format()
          : undefined;
        bookingForm.periodTo = dayjs(dates[1]).isValid()
          ? dayjs(dates[1]).utc(true).format()
          : undefined;

        const comparedDates = compareAndRotateDates([bookingForm.periodFrom, bookingForm.periodTo]);

        bookingForm.periodFrom = comparedDates[0];
        bookingForm.periodTo = comparedDates[1];

        bookingForm.payDayForLease = parseInt(dayjs(dates[0]).format("DD"));

        if (bookingForm.periodFrom && bookingForm.periodTo) {
          getApartaments();
        }
      },
    });

    onMounted(async () => {
      if (!props.bookId) {
        await propertyStore.fetchProperties();
      } else {
        const result = (await bookingApi.findOne("" + props.bookId)).data;
        const checkedDates = (
          await bookingApi.checkFreeDates(
            String(result.apartamentId[0].id),
            result.periodFrom,
            result.periodTo
          )
        ).data;

        apartaments.value = result.apartamentId; /// Set array apartments for select

        rangeDates.start = checkedDates.find((book) =>
          dayjs(book.periodTo).isBefore(dayjs(result.periodFrom))
        )?.periodTo;

        rangeDates.end = checkedDates.find((book) =>
          dayjs(book.periodFrom).isAfter(dayjs(result.periodTo))
        )?.periodFrom;

        inPercent.value = result.typeCommission === FoundCommissionEnum.PERCENT;

        for (const key in result) {
          if (Object.prototype.hasOwnProperty.call(bookingForm, key)) {
            bookingForm[key] = Array.isArray(result[key]) ? result[key][0].id : result[key];
          }
        }
      }

      await getCustomers();
    });

    const getCustomers = async () => {
      customers.value = (
        await customersApi.findCustomers(undefined, undefined, true, undefined, 400)
      ).data;
    };

    const getApartaments = async () => {
      if (props.bookId) {
        return;
      }

      loading.value = true;
      bookingForm.apartamentId = undefined;

      try {
        apartaments.value = (
          await apartamentsApi.getForBooking(propertyId.value, [
            bookingForm.periodFrom,
            bookingForm.periodTo,
          ] as string[])
        ).data;
      } finally {
        loading.value = false;
      }
    };

    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.resetFields();
      if (props.bookId) {
        emit("refresh");
        $router.push({
          name: RouteName.BOOKING,
        });
      }
    };

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return;
      formEl.validate(async (valid) => {
        if (valid) {
          loading.value = true;
          bookingForm.hasPriceAllPeriod = unref(typePrice) === Diapozon.PER_PERIOD;
          // Если клиент решил снять на месяц, то уберём цену за период
          bookingForm.priceAllPeriod = bookingForm.hasPriceAllPeriod
            ? bookingForm.priceAllPeriod
            : 0;

          const action = props.bookId
            ? (object) => bookingApi.unpdateBooking("" + props.bookId, object)
            : (object) => bookingApi.makeBooking(object);

          try {
            await action({
              ...Object.keys(bookingForm).reduce((acc, curr) => {
                if (bookingForm[curr] && !dayjs(bookingForm[curr]).isValid()) {
                  acc[curr] = toNumber(String(bookingForm[curr]).replace(/\s/, ""));
                } else {
                  acc[curr] = bookingForm[curr] ?? undefined;
                }

                return acc;
              }, {}),
              typeCommission: inPercent.value ? CommissionEnum.PERCENT : CommissionEnum.SUM,
            });
            ElMessage({
              type: "success",
              message: props.bookId ? i18n.t("changedSuccess") : i18n.t("savedSuccess"),
            });
            resetForm(formEl);
            propertyId.value = undefined;
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

    return {
      isView,
      loading,
      Diapozon,
      countDays,
      typePrice,
      bookingForm,
      ruleFormRef,
      properties,
      propertyId,
      inPercent,
      typePledge,
      datesBooking,
      getApartaments,
      ...useBookingRules(bookingForm),
      showFastCreateClient,
      disabledEarlyDeposit,
      getCustomers,
      submitForm,
      resetForm,
      apartaments,
      currensies,
      rangeDates,
      customers,
      isMobile,
    };
  },
});
</script>
<style lang="scss">
.make-booking {
  .el-input.is-disabled .el-input__inner {
    color: color(bg-dark);
    -webkit-text-fill-color: color(bg-dark);
  }

  @media screen and (max-width: 1024px) {
    .d-date-range-input {
      display: block;
    }

    .el-select {
      width: 100% !important;
    }

    .el-form-item:not(.make-booking--half),
    .el-form-item__content {
      margin-right: 0;
      width: 100%;
    }
  }
}
</style>
