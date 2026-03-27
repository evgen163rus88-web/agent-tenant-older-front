<template>
  <div class="relative" :style="`width: ${size[0]}px; height: ${size[1]}px;`">
    <svg class="diagram" viewBox="0 0 42 42">
      <circle ref="mainDiagram" :class="classCircleBack" :r="radius" cx="50%" cy="50%" />
      <template v-for="(data, i) in dataDasharray">
        <circle
          v-if="!data.disabled"
          :key="`circle-${i}`"
          class="front pointer"
          :class="[classCircleFront, `${data.color}--text`]"
          :stroke-dasharray="setLengthStroke(data)"
          :style="`${rotate(data, i)}; z-index: ${20 - i};`"
          @mouseover="over($event, data.title, data)"
          @mouseout="out()"
          :r="radius"
          cx="50%"
          cy="50%"
        />
      </template>
    </svg>
  </div>

  <div v-show="isActive" class="el-popper is-dark diagram-popper" :style="{ top: pointY + 'px', left: pointX + 'px' }">
    <p class="title mb-05">
      {{ titleTooltip }}
    </p>
    <p class="paragraph">{{ percentOf }} %</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted, computed, unref } from "vue";
import { DataDasharray } from "./Diagram";
import { useLayoutsStore } from "@/store/layouts.store";

export default defineComponent({
  name: "DiagramCircle",
  props: {
    dataDasharray: {
      type: Array as PropType<DataDasharray[]>,
      required: true,
    },
    radius: {
      type: String,
      default: "18",
    },
    // Кастомный css класс для стилизации фоновой фигуры круга
    classCircleBack: {
      type: String,
      default: "",
    },
    // Кастомный css класс для стилизации внешнего круга
    classCircleFront: {
      type: String,
      default: "",
    },
    size: {
      type: Array as PropType<number[]>,
      default: () => [82, 82],
    },
  },
  setup(props) {
    const layoutsStore = useLayoutsStore();
    const isMobile = computed(() => layoutsStore.isMobileScreen);

    const pointX = ref();
    const pointY = ref();
    const titleTooltip = ref("");
    const percentOf = ref("");
    const isActive = ref(false);
    const circumference = ref(0);
    const mainDiagram = ref<SVGCircleElement>();

    const getPercent = (dasharray: DataDasharray): number => {
      return Number(((dasharray.percent * 100) / dasharray.total).toFixed(1));
    };

    const rotate = (dasharray: DataDasharray, index: number) => {
      if (index === 0) {
        return "";
      }

      const { total } = dasharray;

      const percent = props.dataDasharray.reduce((acc, cv, i) => {
        if (i >= index) {
          return acc;
        }

        acc += cv.percent;
        return acc;
      }, 0);

      const degRotate = (360 * (getPercent({ percent, total }) / 100) - 90).toFixed(1);
      return `transform: rotate(${degRotate}deg) scale(0.5)`;
    };

    const setLengthStroke = (dateDasharray: DataDasharray) => {
      const p = getPercent(dateDasharray);
      const offset = circumference.value - (p / 100) * circumference.value;

      return `${circumference.value - offset} ${circumference.value}`;
    };

    onMounted(() => {
      const radiusBaseVal = mainDiagram.value?.r.baseVal.value;
      circumference.value = 2 * Math.PI * (radiusBaseVal || 1);
    });

    const over = (event, title, data) => {
      isActive.value = true;

      pointX.value = event.x - 5;
      pointY.value = event.y - (unref(isMobile) ? 25 : 75);

      titleTooltip.value = title;
      percentOf.value = String(getPercent(data));
    };

    const out = () => {
      isActive.value = false;
      titleTooltip.value = "";
      percentOf.value = "";
    };

    return {
      rotate,
      setLengthStroke,
      mainDiagram,
      over,
      out,
      isActive,
      pointX,
      pointY,
      titleTooltip,
      percentOf,
    };
  },
});
</script>
<style lang="scss" scoped>
.diagram {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: visible;
}

circle {
  fill: transparent;
  stroke: currentColor;
  stroke-width: 86%;
  transform-origin: center;
  transform: rotate(-90deg) scale(0.5);
  transition: stroke-dasharray 0.7s ease;

  &.front {
    stroke: currentColor;
  }
}
</style>
