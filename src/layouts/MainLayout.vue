<template>
  <div class="main-layout">
    <input v-model="isOpen" id="menu__toggle" type="checkbox" />
    <SidebarSite />
    <label class="menu__btn--mobile" for="menu__toggle" />
    <div class="content-container w-100">
      <HeaderSite />
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import SidebarSite from "@/components/SidebarSite.vue";
import HeaderSite from "@/components/HeaderSite.vue";
import { useLayoutsStore } from "@/store/layouts.store";

export default defineComponent({
  components: {
    HeaderSite,
    SidebarSite,
  },
  setup() {
    const layoutsStore = useLayoutsStore();
    const isOpen = computed({
      get: () => {
        return layoutsStore.getStateMenu;
      },
      set: () => {
        layoutsStore.toggleMenu();
      },
    });
    return { isOpen };
  },
});
</script>

<style lang="scss">
.main-layout {
  @extend %layout;

  .content-container {
    height: max-content;
  }
}
</style>
