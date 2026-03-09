<template>
  <el-dropdown trigger="click" @command="setLang">
    <div class="d-flex align-center justify-between mr-3 align-self-center pointer">
      <b class="mr-1 title--text">
        {{ $i18n.locale.toUpperCase() }}
      </b>
      <b-icon :icon="$i18n.locale" color="default" />
    </div>
    <template #dropdown>
      <el-dropdown-menu class="d-flex flex-column">
        <el-dropdown-item command="ru">
          <div class="d-flex align-center justify-between" style="width: 60px">
            <span>RU</span>
            <b-icon icon="ru" color="default" class="mt-1" />
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { setLang as setLng } from "@/plugins/i18n";

export default defineComponent({
  name: "LangSetter",
  setup() {
    const setLang = (lng: string) => {
      setLng(lng);
    };

    return {
      setLang,
    };
  },
});
</script>
