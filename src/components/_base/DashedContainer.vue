<template>
  <div class="dashed-container">
    <div class="mr-1" :class="`${titleColor}--text`">
      <slot name="paragraph">
        <template v-if="title">{{ title }}</template>
      </slot>
    </div>
    <div class="dotted-divider"></div>
    <div class="ml-1" :class="[textColor && `${textColor}--text`, { fwb: bold }]">
      <slot>
        <template v-if="text !== undefined">{{ text }}</template>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    title: String,
    titleColor: {
      type: String,
      default: "dark",
    },
    text: [String, Number],
    textColor: String,
    bold: {
      type: Boolean,
    },
  },
});
</script>

<style lang="scss">
.dashed-container {
  display: flex;
  align-items: baseline;

  .dotted-divider {
    background-image: linear-gradient(to right, #828282 50%, transparent 30%);
    background-size: 8px 1.6px;
    background-repeat: repeat-x;
    background-position: 0 100%;
    flex-grow: 1;
    height: 1.5px;
  }
}
</style>
