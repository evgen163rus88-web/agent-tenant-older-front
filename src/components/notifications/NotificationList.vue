<template>
  <dl class="n-list">
    <div class="w-100 mb-2" v-for="noties in notifications" :key="noties.id">
      <div class="n-list__date">
        {{ $t("fromDate") }}
        {{ $dayjs(noties.createdAt).format("L") }}
      </div>

      <dd class="d-flex align-center n-list__info punkt">
        <span>
          {{ $t(`noticeNames.${noties.note}`) }}
          {{ $t(`noticeNames.${noties.name}`) }}
        </span>
        <span>&nbsp;</span>
        <span class="paragraph fwb success-dark--text">
          {{ parseTarget(noties.target).apartment[0].name }}
        </span>

        <el-button class="p-1 ml-auto" text @click="$emit('read-notice', noties.id)">
          <b-icon icon="cross-cancel" size="large" color="error" />
        </el-button>
      </dd>
    </div>
  </dl>
</template>
<script lang="ts">
import { CreateNotificationDto } from "@/api/openapi";
import { defineComponent, PropType } from "vue";
import { useNotification } from "@/components/notifications/NotificationView";

export default defineComponent({
  props: {
    notifications: {
      type: Array as PropType<CreateNotificationDto[]>,
      required: true,
    },
  },
  setup() {
    const { parseTarget } = useNotification();
    return {
      parseTarget,
    };
  },
});
</script>
<style lang="scss">
.n-list {
  overflow: hidden;
  font-size: fontSize(title);

  .punkt {
    padding: space(1);
    color: #4c565c;
    box-sizing: border-box;
    margin-bottom: 0;
    white-space: break-spaces;
    word-break: break-word;
  }

  &__date {
    padding: 4px;
    background-color: color(primary);
    font-size: fontSize(label);
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__info {
    display: flex;
    align-items: center;
    font-size: fontSize(paragraph);
    width: 100%;
    margin-left: 0;
    margin-bottom: 0.3125em;
    border: 1px solid color(gray);
  }
}
</style>
