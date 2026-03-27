<template>
  <div class="d-flex flex-column" v-loading="loading">
    <div v-for="notice in noticeWithChange" :key="notice.id" class="mb-2">
      <p class="title mb-1">
        {{ $t(`noticeNames.${notice.note}`) }}
        {{ $t(`noticeNames.${notice.name}`) }}
        <span class="fwb success--text">
          {{ parseTarget(notice.target).apartment[0].name }}
        </span>
      </p>

      <div class="d-flex align-center flex-wrap mx-1 mb-2">
        <el-tag type="warning" effect="dark">
          {{ $t("bookingStatuses.RESERVED") }}
        </el-tag>
        <span>&nbsp;&rarr;&nbsp;</span>
        <el-tag effect="dark">
          {{ $t("bookingStatuses.CHECK_IN") }}
        </el-tag>
      </div>

      <div class="d-flex align-center flex-wrap">
        <p class="paragraph fwb mr-3 text-wrap">
          {{ $t("confirmCheckInGuest") }}
        </p>

        <div class="d-flex justify-center" :class="{ 'w-100 mt-2': isMobile }">
          <el-button type="primary" @click="confirmCheckIn(notice)" plain round>
            {{ $t("btns.approve") }}
          </el-button>
          <el-button type="info" @click="guestNotCheckIn(notice)" plain round>
            {{ $t("btns.guestNotCheckin") }}
          </el-button>
        </div>
      </div>

      <el-divider v-if="noticeWithChange.length > 1" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import {
  incomeApi,
  bookingApi,
  CreateNotificationDto,
  CreateNotificationDtoNameEnum as NoticeEnum,
  CreateBillsIncomeDtoTypeEnum as BillsIncomeEnum,
} from "@/api";
import { useNotification } from "./NotificationView";
import { useLayoutsStore } from "@/store/layouts.store";
import { useI18n, useNotice } from "@/plugins";

export default defineComponent({
  name: "NotificationActionModal",
  props: {
    notifications: {
      type: Array as PropType<CreateNotificationDto[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const i18n = useI18n();
    const $notice = useNotice();
    const layoutsStore = useLayoutsStore();
    const { parseTarget, discardNotice, loading, booking, fetchBooking } = useNotification();

    const noticeWithChange = computed(() =>
      props.notifications.filter((note) => note.name === NoticeEnum.CHANGE_BOOKING_STATUS)
    );

    const isMobile = computed(() => layoutsStore.isMobileScreen);

    const getTarget = (notice: CreateNotificationDto) => {
      const target = parseTarget(notice.target);
      const bookId = target.id;

      return { target, bookId };
    };

    const cancelBooking = async (id) => {
      loading.value = true;
      try {
        await bookingApi.removeBookingById(id);
      } finally {
        loading.value = false;
      }
    };

    const confirmCheckIn = async (notice: CreateNotificationDto) => {
      loading.value = true;
      const { target, bookId } = getTarget(notice);

      await fetchBooking(bookId);

      if (target.earlyBefore && parseInt("" + target.earlyBefore) > 0) {
        try {
          await incomeApi.setIncome({
            name: i18n.t("automaticSetRentPayment"),
            type: BillsIncomeEnum.RENT,
            amount: target.earlyBefore as number,
            customerId: booking.value?.customerId[0].id,
            apartamentId: target.apartment[0].id,
          });
        } finally {
          loading.value = false;
        }
      }

      $notice.success(i18n.t("confirmedCheckIn"));

      if (!booking.value?.pledge || booking.value?.pledge === undefined) {
        setTimeout(() => {
          $notice.warning(i18n.t("dontForgotTakeSecurityDeposit", { where: target.apartment[0].name }));
        }, 2000);
      }
      await discardNotice(notice.id, loading);
      emit("close");
    };

    const guestNotCheckIn = async (notice: CreateNotificationDto) => {
      const { target, bookId } = getTarget(notice);
      const hasDeposit = target.earlyBefore && parseInt("" + target.earlyBefore) > 0;

      await fetchBooking(bookId);

      loading.value = true;
      if (hasDeposit) {
        try {
          await incomeApi.setIncome({
            name: i18n.t("automaticSetOtherPayment"),
            type: BillsIncomeEnum.OTHER,
            amount: target.earlyBefore as number,
          });
        } finally {
          loading.value = false;
        }
      }

      await cancelBooking(bookId);
      $notice.success(i18n.t(hasDeposit ? "notConfirmedCheckIn" : "notConfirmedCheckInWithoutDeposit"));
      await discardNotice(notice.id, loading);
      emit("close");
    };

    return {
      noticeWithChange,
      guestNotCheckIn,
      confirmCheckIn,
      parseTarget,
      discardNotice,
      isMobile,
      loading,
    };
  },
});
</script>
