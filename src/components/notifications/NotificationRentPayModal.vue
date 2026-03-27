<template>
  <div class="d-flex flex-column" v-loading="loading">
    <div v-for="notice in noticePayment" :key="notice.id" class="mb-2">
      <p class="title mb-1">
        {{ $t(`noticeNames.${notice.note}`) }}
        {{ $t(`noticeNames.${notice.name}`) }}
        <span class="fwb success--text">
          {{ notice.targets.apartment[0].name }}
        </span>
      </p>

      <div class="d-flex align-center flex-wrap mb-2">
        <el-tag type="success" size="large" class="fwb paragraph">
          {{ notice.targets.amountMounth }}
        </el-tag>
        <span class="mx-2">
          {{ notice.targets.currency }}
        </span>
      </div>

      <div class="d-flex align-center flex-wrap">
        <p class="paragraph fwb mr-3 text-wrap">
          {{ $t("doYouConfirmPay") }}
        </p>

        <div class="d-flex justify-center" :class="{ 'w-100 mt-2': isMobile }">
          <el-button type="primary" @click="confirmPayment(notice)" plain round>
            {{ $t("btns.approve") }}
          </el-button>
          <el-button type="info" @click="cancelPay(notice.id!)" plain round>
            {{ $t("btns.cancel2") }}
          </el-button>
        </div>
      </div>

      <el-divider v-if="noticePayment.length > 1" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, unref } from "vue";
import {
  incomeApi,
  CreateNotificationDto,
  CreateNotificationDtoNameEnum as NoticeEnum,
  CreateBillsIncomeDtoTypeEnum as BillsIncomeEnum,
} from "@/api";
import { useNotification } from "./NotificationView";
import type { ParsedNotice } from "./NotificationView";
import { useLayoutsStore } from "@/store/layouts.store";
import { useI18n, useNotice } from "@/plugins";
import { omit } from "@/helpers";

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
    const { parseTarget, discardNotice, fetchBooking, loading, booking } = useNotification();

    const noticePayment = computed(
      () =>
        props.notifications
          .filter((note) => note.name === NoticeEnum.PAY_DAY && parseTarget(note.target).pd === new Date().getUTCDate())
          .map((note) => {
            return {
              ...omit(note, ["target"]),
              targets: parseTarget(note.target),
            };
          }) as ParsedNotice[]
    );

    const isMobile = computed(() => layoutsStore.isMobileScreen);

    const getTarget = (notice: ParsedNotice) => {
      const target = notice.targets;
      const bookId = target.id;

      return { target, bookId };
    };

    const confirmPayment = async (notice: ParsedNotice) => {
      const { target, bookId } = getTarget(notice);

      await fetchBooking(bookId);

      loading.value = true;

      try {
        await incomeApi.setIncome({
          name: i18n.t("automaticSetRentPayment"),
          type: BillsIncomeEnum.RENT,
          amount: unref(booking)?.pricePerMounth as number,
          currency: target.currency,
          customerId: unref(booking)?.customerId[0].id,
          apartamentId: target.apartment[0].id,
        });
      } finally {
        loading.value = false;
      }

      $notice.success(i18n.t("confirmedRentPay"));

      await discardNotice(notice.id, loading);
      emit("close");
    };

    const cancelPay = async (id: number) => {
      await discardNotice(id, loading);

      $notice.warning(i18n.t("discardRentPay"));
      emit("close");
    };

    return {
      noticePayment,
      confirmPayment,
      parseTarget,
      discardNotice,
      cancelPay,
      isMobile,
      loading,
    };
  },
});
</script>
