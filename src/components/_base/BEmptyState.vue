<template>
  <div class="b-empty-state">
    <slot>{{ $t("noData") }}</slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="scss">
.b-empty-state {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: fontSize(title);
  font-weight: bold;
  color: color(black);
}
</style>
