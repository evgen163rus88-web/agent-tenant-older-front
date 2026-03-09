<template>
  <div class="auth-layout">
    <div class="content-container">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style lang="scss">
.auth-layout {
  @extend %layout;

  background: #c4c4c4;
  background-repeat: no-repeat;
  background-size: cover;
  background-blend-mode: overlay;
  min-height: 100vh;

  .content-container {
    display: flex;
    flex-grow: 1;
    width: 100%;
  }

  .el-card__header {
    background-color: color(primary);
  }
}
</style>
