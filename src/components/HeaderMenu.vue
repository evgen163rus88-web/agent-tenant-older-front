<template>
  <div class="d-flex align-self-center menu-header ml-auto bg-dark--text">
    <LangSetter />

    <NotificationView
      :notifications="notification"
      :tooltip="tooltip"
      @show-change="showConfirmModal = true"
      @show-checkout="showCheckOutConfirmModal = true"
      @show-pay-day="showPayDayConfirmModal = true"
      @clicked="confirmed"
      @discard-notice="discard"
      v-loading="loading"
    />

    <p class="menu-header--user title align-self-center">
      {{ profile.firstName + " " + profile.lastName }}
    </p>

    <ul class="d-flex">
      <li class="ml-2 d-flex align-center justify-center" role="button" :title="$t('exit')" @click="signOut">
        <b-icon icon="exit" size="large" />
      </li>
    </ul>
  </div>

  <el-dialog
    v-model="showConfirmModal"
    :width="isMobile ? '100%' : '50%'"
    :close-on-click-modal="false"
    :title="$t('confirmForChangeStatus')"
    destroy-on-close
    lock-scroll
  >
    <NotificationActionModal :notifications="notification" @close="confirmed" />
  </el-dialog>

  <el-dialog
    v-model="showCheckOutConfirmModal"
    :width="isMobile ? '100%' : '50%'"
    :close-on-click-modal="false"
    :title="$t('desideCheckOutDeposit')"
    destroy-on-close
  >
    <NotificationCheckOutModal :notifications="notification" @close="confirmed" />
  </el-dialog>

  <el-dialog
    v-model="showPayDayConfirmModal"
    :width="isMobile ? '100%' : '50%'"
    :close-on-click-modal="false"
    :title="$t('tittlePayDayConfirmModal')"
    destroy-on-close
  >
    <NotificationRentPayModal :notifications="notification" @close="confirmed" />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onBeforeMount } from "vue";
import { useUserStore } from "@/store/user.store";
import { RouteName } from "@/router/router-utils";
import { clearBearer } from "@/api/bearer";
import { notificationApi, CreateNotificationDto, CreateNotificationDtoNameEnum } from "@/api";
import { clearAuthHeader } from "@/api/axios";
import { useLoad, useI18n } from "@/plugins";
import { useRouter } from "vue-router";
import NotificationView from "@/components/notifications/NotificationView.vue";
import NotificationActionModal from "@/components/notifications/NotificationActionModal.vue";
import NotificationCheckOutModal from "@/components/notifications/NotificationCheckOutModal.vue";
import NotificationRentPayModal from "@/components/notifications/NotificationRentPayModal.vue";
import { useNotification } from "@/components/notifications/NotificationView";
import { useLayoutsStore } from "@/store/layouts.store";
import { usePropertiesStore } from "@/store/properties.store";
import LangSetter from "@/components/LangSetter.vue";

export default defineComponent({
  name: "HeaderMenu",
  components: {
    NotificationView,
    NotificationActionModal,
    NotificationCheckOutModal,
    NotificationRentPayModal,
    LangSetter,
  },
  setup() {
    const layoutsStore = useLayoutsStore();
    const propertyStore = usePropertiesStore();
    const { discardNotice, parseTarget } = useNotification();
    const i18n = useI18n();
    const $load = useLoad();
    const $router = useRouter();
    const userStore = useUserStore();
    const showConfirmModal = ref(false);
    const showCheckOutConfirmModal = ref(false);
    const showPayDayConfirmModal = ref(false);
    const profile = computed(() => userStore.getUser);
    const notification = ref<CreateNotificationDto[]>([]);
    const loading = ref(false);
    const tooltip = computed(() =>
      notification.value.length
        ? i18n.t(notification.value.length > 1 ? "newNoticeFew" : "newNotice", {
            count: notification.value.length,
          })
        : i18n.t("noNotification")
    );

    const isMobile = computed(() => layoutsStore.isMobileScreen);

    const signOut = () => {
      $load(async () => {
        clearBearer();
        clearAuthHeader();
        userStore.logOut();

        propertyStore.clearAll();
        $router.push({ name: RouteName.SIGN_IN });
      });
    };

    const confirmed = async () => {
      showConfirmModal.value = false;
      showCheckOutConfirmModal.value = false;
      showPayDayConfirmModal.value = false;
      notification.value = (await notificationApi.getAllActiveNotifications()).data;
    };

    const discard = (id) => {
      notification.value = notification.value.filter((notice) => notice.id !== id);
      discardNotice(id, loading);
    };

    onBeforeMount(async () => {
      notification.value = (await notificationApi.getAllActiveNotifications()).data;

      showPayDayConfirmModal.value = notification.value.some(
        (note) =>
          note.name === CreateNotificationDtoNameEnum.PAY_DAY && parseTarget(note.target).pd === new Date().getUTCDate()
      );

      showConfirmModal.value = notification.value.some(
        (note) => note.name === CreateNotificationDtoNameEnum.CHANGE_BOOKING_STATUS
      );

      showCheckOutConfirmModal.value = notification.value.some(
        (note) => note.name === CreateNotificationDtoNameEnum.CHECK_OUT
      );
    });

    return {
      isMobile,
      profile,
      signOut,
      tooltip,
      loading,
      discard,
      confirmed,
      notification,
      showConfirmModal,
      showPayDayConfirmModal,
      showCheckOutConfirmModal,
    };
  },
});
</script>
<style lang="scss">
.menu-header {
  padding-right: space(5);

  @media screen and (max-width: 780px) {
    padding-right: 0;

    &--user {
      display: none;
    }
  }
}
</style>
