<template>
  <div class="b-grid pb-4" :class="$attrs.class">
    <b-card
      v-if="!hideHeader"
      class="b-grid--grid sticky"
      :style="`${styleGridColumns};top: ${stickyElementsHeight}px;`"
      :bordered="false"
    >
      <div
        v-for="(caption, i) in headers"
        :key="`label-${i}`"
        class="label fwb"
        :class="caption.classNameHeader || 'devil--text'"
      >
        <slot :name="`header-${caption.prop}`" :caption="caption.label">
          {{ caption.label }}
        </slot>
      </div>
    </b-card>

    <div
      v-if="subheaderContent"
      class="w-100 d-flex primary dark--text p-1"
      :class="[`text-${subheaderContent.textPosition}`, subheaderContent.className || '']"
    >
      <p class="paragraph w-100">
        {{ subheaderContent.title }}
      </p>
    </div>

    <component
      v-for="(item, i) in items"
      :key="`body-${i}`"
      :hover="hover"
      :is="options.component"
      v-bind="getLineAttrs(item, i)"
    >
      <template #[options.slot]>
        <div v-for="(header, j) in headers" :key="`innerItem${j}`" class="b-grid--cell" :class="header.className">
          <slot :name="`cell-${header.prop}`" :item="item" :index="i">
            {{ parseString(item[header.prop], header, item) }}
          </slot>
        </div>
      </template>

      <template v-if="type === 'expand'" #default>
        <slot :item="item" />
      </template>
    </component>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, watch, onMounted } from "vue";
import { Headers, DataGridItem, SubheaderContent } from "./BGrid";

export default defineComponent({
  inheritAttrs: false,
  props: {
    headers: {
      type: Array as PropType<Headers[]>,
      required: true,
    },
    items: {
      type: Array as PropType<DataGridItem[]>,
      default: () => [],
    },
    stub: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    type: {
      type: String as PropType<"linear" | "expand">,
      default: "linear",
      validator: (v: string) => ["linear", "expand"].includes(v),
    },
    subheaderContent: {
      type: Object as PropType<SubheaderContent>,
      default: undefined,
    },
    onClickLine: Function as PropType<(e: any) => void>,
    hover: Boolean,
    hideHeader: Boolean,
    notDivider: Boolean,
  },
  setup(props) {
    const stickyElementsHeight = ref(0);
    const styleGridColumns = computed(() => {
      let cols = "grid-template-columns:";

      props.headers.forEach((v) => {
        if (v.minmax) {
          cols += ` minmax(${v.minmax[0]}, ${v.minmax[1]})`;
        } else {
          cols += v.width ? ` ${v.width}` : " 1fr";
        }
      });
      return cols;
    });

    const accordionModel = ref<boolean[]>([]);

    const options = computed(() => {
      if (props.type === "expand") {
        return {
          component: "b-collapse",
          slot: "title",
          props: (...args) => {
            return {
              styleGridTitleCollapse: `${styleGridColumns.value};width: 100%;`,
              notDivider: props.notDivider,
              modelValue: accordionModel.value[args[0]],
              class: `b-grid ${args[0] % 2 === 0 ? "gray-blue" : "gray-light"}`,
            };
          },
        };
      }

      return {
        component: "b-card",
        slot: "default",
        props: (...args) => ({
          class: `b-grid--grid ${args[0] % 2 === 0 ? "gray-blue" : "gray-light"}`,
          style: styleGridColumns.value,
          shadow: "never",
        }),
      };
    });

    const handleLineClick = (objectLine, payload) => {
      if (props.type === "expand") {
        const indexLine = payload.isShow ? payload.index : null;
        objectLine.indexLine = indexLine;
      }

      props.onClickLine?.(objectLine);
    };

    // eslint-disable-next-line no-undef
    const parseDate = (date, format) => dayjs(date).format(`${format}`);

    const switchLines = ({ index: currentIndex, payload }) => {
      accordionModel.value = accordionModel.value.map((val, index) => (currentIndex === index ? payload : false));
    };

    const getLineListeners = (item: DataGridItem, index: number) => {
      const events = {};

      if (props.type === "expand") {
        Object.assign(events, {
          "onUpdate:modelValue": (payload) => {
            switchLines({ index, payload });
          },
        });
      }

      if (props.onClickLine) {
        Object.assign(events, {
          onClick: () => {
            handleLineClick(item, { index, isShow: !accordionModel.value[index] });
          },
        });
      }

      return events;
    };

    const getLineAttrs = (item: DataGridItem, index: number) => ({
      ...options.value.props(index),
      ...getLineListeners(item, index),
    });

    const parseString = (val: any, header: Headers, item: DataGridItem) => {
      if (header.isDate) {
        return val ? parseDate(val, header.formatDate || "L") : props.stub;
      } else if (header.formatter && typeof header.formatter === "function") {
        return val ? header.formatter(val, item) : props.stub;
      }

      return typeof val === "string" || typeof val === "number" ? val : props.stub;
    };

    watch(
      () => props.items,
      () => {
        if (props.type === "expand" && props.items?.length) {
          const iterator = props.items.length - accordionModel.value.length;
          accordionModel.value = accordionModel.value.map(() => false);

          if (iterator > 0) {
            for (let i = 0; i < iterator; i++) {
              accordionModel.value.push(false);
            }
          } else {
            for (let i = 0; i < Math.abs(iterator); i++) {
              accordionModel.value.shift();
            }
          }
        }
      },
      { immediate: true }
    );

    onMounted(() => {
      stickyElementsHeight.value = [...document.body.querySelectorAll("*")]
        .filter((n) => ["sticky", "fixed"].indexOf(window.getComputedStyle(n).position) > -1)
        .filter((n) => !n.className.includes("b-grid--grid"))
        .filter((n) => !n.className.includes("menu__box"))
        .filter((n) => !n.className.includes("overlay"))
        .reduce((acc, curr) => acc + curr.clientHeight, 0);
    });

    return {
      stickyElementsHeight,
      styleGridColumns,
      parseString,
      options,
      switchLines,
      getLineAttrs,
    };
  },
});
</script>
<style lang="scss">
.b-grid {
  border-radius: $radius-base;
  position: relative;

  &.no-sticky {
    .sticky {
      position: static;
    }
  }

  @media screen and (max-width: 780px) {
    .b-card.sticky {
      padding-left: space(1);
    }

    .b-card {
      padding: space(2);
    }
  }

  &--grid {
    display: grid;
    grid-gap: space(2);

    @media screen and (max-width: 780px) {
      grid-gap: space(1);
    }

    @extend %py-1;

    &.sticky {
      will-change: transform;
      background-color: color(white);
      position: sticky;
      z-index: 1;
      border-top: 2px solid color(primary);
      border-bottom: 2px solid color(primary);
    }
  }

  &--cell :not(.self-end, .self-center) {
    justify-self: start;
  }

  &--cell {
    @media screen and (max-width: 780px) {
      .el-tag {
        white-space: inherit;
        height: max-content;
        text-align: center;
        padding: 5px;
      }
    }
  }

  .align-self-center {
    align-self: center;
  }

  .self-end {
    justify-self: end;
  }

  .self-center {
    justify-self: center;
  }

  &.b-collapse {
    &:last-child {
      margin-bottom: 0;
    }
  }

  .b-collapse {
    &__title {
      position: relative;

      @extend %py-1;
      @extend %px-2;

      @media screen and (max-width: 780px) {
        padding-left: space(1);
        padding-right: space(1);
      }

      & > div {
        display: grid;
        grid-gap: space(2);

        @media screen and (max-width: 780px) {
          grid-gap: space(1);
        }
      }
    }

    &__icon {
      position: absolute;
      right: space(2);
      bottom: 55%;
      transform: translateY(50%);

      @media screen and (max-width: 780px) {
        bottom: 60%;
        right: space(-1);
      }
    }
  }
}
</style>
