<template>
  <div class="d-flex flex-column" v-loading="loading">
    <div v-for="notice in noticeCheckout" :key="notice.id" class="mb-2">
      <p class="title mb-1">
        {{ $t(`noticeNames.${notice.note}`) }}
        {{ $t(`noticeNames.${notice.name}`) }}
        <span class="fwb success--text">
          {{ parseTarget(notice.target).apartment[0].name }}
        </span>
      </p>

      <div class="d-flex align-center flex-wrap mx-1 mb-2">
        <el-tag type="success" effect="dark">
          {{ $t("bookingStatuses.CHECK_IN") }}
        </el-tag>
        <span>&nbsp;&rarr;&nbsp;</span>
        <el-tag type="danger">
          {{ $t("bookingStatuses.CHECK_OUT") }}
        </el-tag>
      </div>

      <div class="d-flex align-center flex-wrap">
        <p class="paragraph fwb mr-3 text-wrap">
          {{ $t("refundAllSecurityDeposit") }}
        </p>

        <div class="d-flex justify-center" :class="{ 'w-100 mt-2': isMobile }">
          <el-button type="primary" @click="confirmRefund(notice.id)" plain round>
            {{ $t("yes") }}
          </el-button>
          <el-button type="info" @click="setIncome(notice)" plain round>
            {{ $t("no") }}
          </el-button>
        </div>
      </div>

      <el-divider v-if="noticeCheckout.length > 1" />
    </div>
  </div>

  <el-dialog
    v-model="showIncomeModal"
    :width="isMobile ? '100%' : '50%'"
    :close-on-click-modal="false"
    :title="$t('makingIncomeFromDeposit')"
    destroy-on-close
  >
    <AddIncome
      addFromSecurityDeposit
      :apartamentIdFromDeposit="apartamentId"
      :bookingInfo="booking"
      :idNotice="selectedNotice"
      @close="showIncomeModal = false"
      @done="depositDone"
    />
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { CreateNotificationDto, CreateNotificationDtoNameEnum as NoticeEnum } from "@/api";
import { useNotification } from "./NotificationView";
import { useI18n, useNotice } from "@/plugins";
import AddIncome from "@/views/bills/AddIncome.vue";
import { useLayoutsStore } from "@/store/layouts.store";

export default defineComponent({
  name: "NotificationActionModal",
  components: { AddIncome },
  props: {
    notifications: {
      type: Array as PropType<CreateNotificationDto[]>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const i18n = useI18n();
    const notice = useNotice();
    const layoutsStore = useLayoutsStore();
    const { parseTarget, discardNotice, loading, booking, fetchBooking } = useNotification();
    const apartamentId = ref();
    const showIncomeModal = ref(false);
    const selectedNotice = ref();

    const isMobile = computed(() => layoutsStore.isMobileScreen);
    const noticeCheckout = computed(() =>
      props.notifications.filter((note) => note.name === NoticeEnum.CHECK_OUT)
    );

    const getTarget = (notice: CreateNotificationDto) => {
      const target = parseTarget(notice.target);

      return { target };
    };

    const confirmRefund = async (id, allGood = true) => {
      await discardNotice(id, loading);
      notice.success(i18n.t(allGood ? "returnedSecurityDeposit" : "partSecurityDeposit"));
      emit("close");
    };

    const depositDone = async (id) => {
      await confirmRefund(id, false);
    };

    const setIncome = async (notice: CreateNotificationDto) => {
      const { target } = getTarget(notice);
      await fetchBooking(target.id);
      apartamentId.value = target.apartment[0].id;
      showIncomeModal.value = true;
      selectedNotice.value = notice.id;
    };

    return {
      isMobile,
      booking,
      apartamentId,
      showIncomeModal,
      noticeCheckout,
      depositDone,
      setIncome,
      parseTarget,
      confirmRefund,
      selectedNotice,
      loading,
    };
  },
});
</script>
