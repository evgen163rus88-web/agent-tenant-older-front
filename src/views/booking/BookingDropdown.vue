<template>
  <el-dropdown
    class="booking-dropdown"
    v-if="line.currentStatus !== StatusEnum.CANCELED && !isJustUser"
    @command="handelPopper"
  >
    <el-button class="h-100 p-0" text>
      <b-icon>menu_vertical</b-icon>
    </el-button>
    <template #dropdown>
      <el-dropdown-menu class="d-flex flex-column">
        <el-dropdown-item :command="`more-${line.id}`">
          {{ $t("btns.more") }}
        </el-dropdown-item>

        <el-dropdown-item v-if="line.currentStatus !== StatusEnum.CHECK_OUT" :command="`edit-${line.id}`">
          {{ $t("btns.edit") }}
        </el-dropdown-item>

        <el-dropdown-item
          v-if="line.currentStatus !== StatusEnum.CHECK_OUT && !restrictRemove"
          :command="`remove-${line.id}`"
        >
          {{ $t("btns.cancel2") }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, unref } from "vue";
import { useI18n } from "@/plugins";
import { FoundBookingData, FoundBookingDataCurrentStatusEnum as StatusEnum, bookingApi } from "@/api";
import { RouteName } from "@/router/router-utils";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/store/user.store";

export default defineComponent({
  name: "BookingDropdown",
  props: {
    line: {
      type: Object as PropType<FoundBookingData>,
      required: true,
    },
  },
  emits: ["refresh"],
  setup(_, { emit }) {
    const $router = useRouter();
    const i18n = useI18n();
    const userStore = useUserStore();

    const isEmployee = computed(() => userStore.isEmployee);
    const isJustUser = computed(() => userStore.isJustUser);
    const restrictRemove = computed(() => unref(isEmployee) || unref(isJustUser));

    const handelPopper = (com: string) => {
      const command = com.split("-");
      const fn = command[0];
      const id = command[1];

      if (fn === "edit") {
        $router.push({
          name: RouteName.MAKE_BOOKING,
          params: {
            bookId: id,
          },
        });
      } else if (fn === "remove" && !unref(restrictRemove)) {
        ElMessageBox.confirm(i18n.t("confirmRemove"), i18n.t("warning"), {
          confirmButtonText: i18n.t("btns.ok"),
          cancelButtonText: i18n.t("btns.cancel"),
          type: "warning",
          draggable: true,
        })
          .then(async () => {
            await bookingApi.removeBookingById(id);
            emit("refresh");
            ElMessage({
              type: "success",
              message: i18n.t("deleteСompletedBooking"),
            });
          })
          .catch(() => {
            ElMessage({
              type: "info",
              message: i18n.t("deleteCancel"),
            });
          });
      } else if (fn === "more") {
        $router.push({
          name: RouteName.MAKE_BOOKING,
          params: {
            bookId: id,
          },
          query: {
            view: "true",
          },
        });
      }

      return;
    };

    return { handelPopper, StatusEnum, restrictRemove, isJustUser };
  },
});
</script>
