<template>
  <el-tooltip effect="light" :content="tooltip" v-if="notifications.length === 0">
    <b-icon icon="notification" color="primary" :class="{ pointer: notifications.length }" size="large" class="mr-3" />
  </el-tooltip>

  <el-tooltip v-else effect="light" :content="tooltip">
    <el-dropdown ref="dropdownRef" trigger="click" @command="handelPopper">
      <b-icon
        icon="notification-alert"
        color="default"
        :class="{ pointer: notifications.length }"
        size="large"
        class="mr-3"
      />
      <template #dropdown>
        <el-dropdown-menu class="d-flex flex-column">
          <el-dropdown-item
            v-for="noties in shortList"
            :key="noties.id"
            :command="noties"
            class="notification-item relative pb-2"
            :data-date="`${$t('fromDate')} ${$dayjs(noties.createdAt).format('LL')}`"
          >
            <el-button class="p-1 mr-2" text @click.stop="readNotice(noties.id)">
              <b-icon icon="cross-cancel" size="large" color="error" />
            </el-button>
            <p class="title mr-05">
              {{ $t(`noticeNames.${noties.note}`) }}
              {{ $t(`noticeNames.${noties.name}`) }}
            </p>
            <p class="title fwb success-dark--text">
              {{ parseTarget(noties.target).apartment[0].name }}
            </p>
          </el-dropdown-item>
        </el-dropdown-menu>

        <el-dropdown-item v-if="longList.length > shortList.length">
          <el-button class="p-1 mt-1 w-100" type="primary" @click.stop="onOpenAll">
            {{ $t("showAllNotices") }}
          </el-button>
        </el-dropdown-item>
      </template>
    </el-dropdown>
  </el-tooltip>

  <el-dialog
    v-model="showAllNotificationsModal"
    :width="isMobile ? '100%' : '50%'"
    :title="$t('notifications')"
    destroy-on-close
    class="small-padding"
  >
    <NotificationList :notifications="longList" @read-notice="readNotice" />
  </el-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, toRefs, unref, ref } from "vue";
import { RouteName } from "@/router/router-utils";
import { CreateNotificationDto, notificationApi, CreateNotificationDtoNameEnum as NoticeEnum } from "@/api";
import { useRouter } from "vue-router";
import { useNotification } from "@/components/notifications/NotificationView";
import { useLayoutsStore } from "@/store/layouts.store";
import NotificationList from "./NotificationList.vue";

export default defineComponent({
  name: "NotificationView",
  components: {
    NotificationList,
  },
  props: {
    notifications: {
      type: Array as PropType<CreateNotificationDto[]>,
      required: true,
    },
    tooltip: {
      type: String,
      required: true,
    },
  },
  emits: ["discard-notice", "show-checkout", "show-change", "clicked", "show-pay-day"],
  setup(props, { emit }) {
    const $router = useRouter();
    const layoutsStore = useLayoutsStore();
    const { parseTarget } = useNotification();
    const { notifications: longList } = toRefs(props);
    const isMobile = computed(() => layoutsStore.isMobileScreen);
    const shortList = computed(() => longList.value.slice(0, unref(isMobile) ? 5 : 9));

    const dropdownRef = ref();
    const showAllNotificationsModal = ref(false);

    const gotoBooking = (id) => {
      const link = $router.resolve({
        name: RouteName.MAKE_BOOKING,
        params: {
          bookId: id,
        },
        query: {
          view: "true",
        },
      });

      window.open(link.href, "_blank");
    };

    const handelPopper = (notice: CreateNotificationDto) => {
      if (notice.name === NoticeEnum.CHANGE_BOOKING_STATUS) {
        emit("show-change");
        return;
      } else if (notice.name === NoticeEnum.CHECK_OUT) {
        emit("show-checkout");
        return;
      } else if (notice.name === NoticeEnum.PAY_DAY && parseTarget(notice.target).pd === new Date().getUTCDate()) {
        emit("show-pay-day");
        return;
      }

      notificationApi.unpdateNotice(String(notice.id), { hasRead: true });
      gotoBooking(parseTarget(notice.target).id);
      emit("clicked");
    };

    const readNotice = (id) => {
      if (longList.value.length === 0) {
        showAllNotificationsModal.value = false;
      }
      emit("discard-notice", id);
    };

    const onOpenAll = () => {
      dropdownRef.value.handleClose();
      showAllNotificationsModal.value = true;
    };

    return {
      isMobile,
      longList,
      shortList,
      dropdownRef,
      onOpenAll,
      readNotice,
      parseTarget,
      handelPopper,
      showAllNotificationsModal,
    };
  },
});
</script>
<style lang="scss">
.notification-item {
  box-shadow: 0px 3px 4px 3px #cdcdcd;
  margin: 8px;
  border-radius: 4px;

  &:after {
    content: attr(data-date);
    font-size: fontSize(label);
    color: color(bg-light);
    position: absolute;
    bottom: 0;
    right: 3%;
    z-index: 1;
  }
}
</style>
