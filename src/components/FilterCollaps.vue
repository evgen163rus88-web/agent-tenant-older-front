<template>
  <div class="filter-container w-100">
    <div
      v-show="isMobile"
      class="f-head"
      :class="{ 'mb-2': openFilters }"
      @click="openFilters = !openFilters"
      role="button"
    >
      <p class="paragraph devil--text">
        {{ $t(openFilters ? "hideFilters" : "showFilters") }}
      </p>
      <span class="filter-container__icon" :class="{ open: isMobile && openFilters }" />
    </div>

    <div
      class="filter-container__slot filters-mobile"
      :class="{
        open: openFilters || !isMobile,
        mobile: isMobile,
        'no-select': !openFilters && isMobile,
      }"
    >
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useLayoutsStore } from "@/store/layouts.store";

export default defineComponent({
  setup() {
    const openFilters = ref(false);
    const layoutsStore = useLayoutsStore();
    const isMobile = computed(() => layoutsStore.isMobileScreen);

    return { isMobile, openFilters };
  },
});
</script>
<style lang="scss">
.filter-container {
  @media screen and (max-width: 1024px) {
    padding-top: space(2);
    padding-bottom: space(2);
    border-top: 1px dotted #dce7eb;
    border-bottom: 1px dotted #dce7eb;
  }

  .f-head {
    position: relative;
    display: none;

    @media screen and (max-width: 1024px) {
      -webkit-transform: translate3d(0px, 0px, 0px);
      -webkit-transition: margin 0.5s ease-in-out;
      transition: margin 0.5s ease-in-out;
      display: flex;
      align-items: center;
      cursor: pointer;
      z-index: 1;
    }
  }

  &__slot {
    -webkit-transform: translate3d(0px, 0px, 0px);
    -webkit-transition: -webkit-transform 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;

    &.mobile {
      max-height: 0;
      opacity: 0;
      transform: translate(0, 50%);
      animation-delay: 0.5s;
    }

    &.open {
      opacity: 1;
      position: relative;
      max-height: 500px;
      transform: translate(0, 0);
    }
  }

  &__icon {
    position: absolute;
    transform: translate(-6px, 0);
    -webkit-transform: translate3d(0px, 0px, 0px);
    margin-top: space(-1);
    right: space(2);

    &.open {
      will-change: transform;

      &:before {
        transform: translate(-2px, 0) rotate(45deg);
      }
      &:after {
        transform: translate(2px, 0) rotate(-45deg);
      }
    }

    &:before,
    &:after {
      content: "";
      position: absolute;
      background-color: #f54450;
      -webkit-transform: translate3d(0px, 0px, 0px);
      width: 3px;
      height: 9px;
    }
    &:before {
      transform: translate(2px, 0) rotate(45deg);
    }
    &:after {
      transform: translate(-2px, 0) rotate(-45deg);
    }
  }
}
</style>
