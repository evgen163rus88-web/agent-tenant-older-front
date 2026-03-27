<template lang="html">
  <div v-bind="$attrs" class="b-card" :class="computedClass">
    <div v-if="title" class="c-card__title">
      {{ title }}
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
export default defineComponent({
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: false,
    },
    color: {
      type: String as PropType<
        "default" | "white" | "gray" | "gray-semi" | "warning" | "success" | "black" | "error" | "blue-light"
      >,
      default: "default",
      validator: (v: string) =>
        ["default", "white", "gray", "gray-semi", "warning", "success", "black", "error", "blue-light"].includes(v),
    },
    plain: {
      type: Boolean,
      default: false,
    },
    hover: Boolean,
    bordered: {
      type: Boolean,
      default: true,
    },
    selected: Boolean,
    rounded: Boolean,
  },
  setup(props) {
    const computedClass = computed(() => [
      "b-card--" + props.color,
      {
        "b-card--plain": props.plain,
        "b-card--hover": !props.selected && props.hover,
        "b-card--bordered": props.bordered,
        "b-card--selected": props.selected,
        "b-card--rounded": props.rounded,
        // "b-card--clickable": ctx.listeners.click,
      },
    ]);

    return {
      computedClass,
    };
  },
});
</script>

<style lang="scss">
.b-card {
  padding: space(3);

  border-radius: $radius-base;
  box-sizing: border-box;

  &__title {
    font-weight: bold;
    font-size: fontSize(label);

    @extend %mb-3;
  }

  &--plain {
    // @extend %white;
  }

  &--default {
    @include shadow-border(color(gray));
  }

  &--white {
    // @extend %white;

    @include shadow-border(color(gray));
  }

  &--black,
  &--selected {
    @include shadow-border(color(bg-nav));
  }

  &--selected {
    // @extend %gray;
  }

  &--gray {
    // @extend %gray;

    @include shadow-border(color(gray));
  }

  &--warning {
    // @extend %warning;

    @include shadow-border(color(warning));
  }

  &--gray-semi {
    // @extend %gray-semi;

    @include shadow-border(color(gray-semi));
  }

  &--blue-light {
    // @extend %blue-light;

    @include shadow-border(color(blue));
  }

  &--success {
    @include shadow-border(color(success));
  }

  &--error {
    @include shadow-border(color(error));
  }

  &--hover:not(:hover):not(:focus) {
    box-shadow: none;
    // background: transparent;
  }

  &--rounded {
    border-radius: $radius-base;
  }

  &:not(.b-card--bordered) {
    border-radius: 0;
    box-shadow: none;

    &.b-card--rounded {
      border-radius: $radius-base;
    }
  }

  &--clickable {
    cursor: pointer;
    width: 100%;
    user-select: text;
  }
}
</style>
