<script lang="ts" setup>
import { ref, watch } from "@vue/runtime-core";
import { useI18n } from "vue-i18n";

const locales = {
  ru: () => import("element-plus/lib/locale/lang/ru"),
  en: () => import("element-plus/lib/locale/lang/en"),
};

const i18n = useI18n();
const locale = ref();

watch(
  i18n.locale,
  async (l) => {
    locale.value = (await locales[l]()).default;
  },
  { immediate: true }
);
</script>

<template>
  <div id="app-wrapper">
    <el-config-provider :locale="locale">
      <router-view />
    </el-config-provider>
  </div>
</template>
