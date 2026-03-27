<template>
  <div class="b-paginator">
    <el-button type="primary" @click="showMore" class="ml-auto">
      {{ showMoreText }}
    </el-button>
    <!-- <div v-if="state.pagination.totalCount" class="label devil--text">
      {{ labelText }}
    </div> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { PaginatorState } from "./BPaginator";
import { useI18n } from "@/plugins";
import { useLoad } from "@/plugins";

export default defineComponent({
  props: {
    state: {
      type: Object as PropType<PaginatorState>,
      required: true,
    },
  },
  setup(props) {
    const i18n = useI18n();
    const $load = useLoad();
    const showMoreText = computed(() => i18n.t("showMore", { count: props.state.pagination.limit }));
    // const labelText = computed(() =>
    //   i18n.t("showingItems", {
    //     count: props.state.binding.value.length,
    //     total: props.state.pagination.totalCount,
    //   })
    // );

    const showMore = () => {
      $load(props.state.showMore);
    };

    return {
      showMoreText,
      // labelText,
      showMore,
    };
  },
});
</script>

<style lang="scss">
.b-paginator {
  display: flex;
  align-items: center;

  @extend %p-2;
}
</style>
