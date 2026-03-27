<template>
  <b-card
    v-bind="$attrs"
    :hover="hover && !computedValue"
    :bordered="bordered"
    class="b-collapse"
    :class="computedClass"
  >
    <button class="b-collapse__title" :class="titleClass" @click="toggle">
      <div :style="styleGridTitleCollapse">
        <slot name="title">
          <div class="label">
            {{ title }}
          </div>
        </slot>
      </div>
      <b-icon v-if="!expandedOnly" class="b-collapse__icon ml-2">
        {{ computedValue ? "expand_less" : "expand_more" }}
      </b-icon>
    </button>
    <el-divider v-if="!notDivider" v-show="computedValue" class="b-collapse__divider my-2" />
    <div v-show="computedValue" class="b-collapse__content mt-2">
      <slot />
    </div>
  </b-card>
</template>

<script lang="ts">
import { defineComponent, ref, computed, PropType } from "vue";
export default defineComponent({
  props: {
    modelValue: null,
    title: String,
    hover: Boolean,
    notDivider: Boolean,
    bordered: {
      type: Boolean,
      default: true,
    },
    titleClass: {
      type: String,
      default: "",
    },
    expand: Boolean,
    expandedOnly: Boolean,
    allowTitleTextSelection: Boolean,
    styleGridTitleCollapse: String,
    onClick: Function as PropType<() => void>,
  },
  setup(props, { emit }) {
    const innerValue = ref(props.expandedOnly || props.expand);

    const computedValue = computed(
      () => props.expandedOnly || (props.modelValue !== undefined ? props.modelValue : innerValue.value)
    );
    const computedClass = computed(() => ({
      "b-collapse--expanded-only": props.expandedOnly,
      "b-collapse--title-text-selection": props.allowTitleTextSelection || props.expandedOnly,
    }));

    const toggle = () => {
      if (props.expandedOnly || window.getSelection()?.toString()) return;

      if (props.onClick) {
        props.onClick();
      }

      if (props.modelValue !== undefined) {
        emit("update:modelValue", !props.modelValue);
      } else {
        innerValue.value = !innerValue.value;
      }
    };

    return {
      computedClass,
      computedValue,
      toggle,
    };
  },
});
</script>

<style lang="scss">
.b-collapse {
  .b-collapse__title {
    box-sizing: content-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @extend %m-n2, %p-2;

    .b-collapse__icon {
      border-radius: 50%;
      padding: $space-base / 2;
      margin: -$space-base / 2;
      margin-left: $space-base;
    }

    &:hover,
    &:focus {
      .b-collapse__icon {
        background: color(grey);
      }
    }

    &:active {
      .b-collapse__icon {
        background: color(grey-dark-4);
      }
    }
  }

  &__divider {
    transform: translateY(-1px);
  }

  &--expanded-only {
    .b-collapse__title {
      cursor: default;
    }
  }

  &--title-text-selection {
    .b-collapse__title {
      user-select: text;
    }
  }
}
</style>
