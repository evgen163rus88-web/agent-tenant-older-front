<template>
  <div class="b-page">
    <!-- <breadcrumbs /> -->
    <div class="b-page__error" v-if="state.errorMsg">
      <div class="b-page__error--inner p-4">
        {{ $t("page.errorHasOccurred") }}
      </div>
    </div>
    <b-empty-state v-else-if="state.loading">
      {{ $t("page.loading") }}
    </b-empty-state>

    <slot name="content" />
  </div>
</template>

<script lang="ts">
import { PageState } from "./BPage";
import { defineComponent, PropType, watch } from "vue";

export default defineComponent({
  props: {
    state: {
      type: Object as PropType<PageState>,
      required: true,
    },
  },
  setup(props) {
    watch(
      () => props.state.title,
      (title) => {
        document.title = title + "";
      },
      { immediate: true }
    );
  },
});
</script>

<style lang="scss">
.b-page {
  width: 100%;
  padding: space(2);
  padding-top: space(10);

  .b-page {
    padding-top: space(1);
  }

  @media screen and (max-width: 780px) {
    padding: space(10) space(1.5);
  }

  &__error {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &--inner {
      border: 1px solid color(warning-dark);
      background: color(warning);
    }
  }
}
.ps {
  max-height: 100%;

  &__rail-y {
    z-index: 2;
  }
}
</style>
