<template>
  <h2 class="headline-3 mb-2 black-0--text">{{ $t("users.roleShort") }}&nbsp;{{ $t(RoleEnum.ADMIN) }}:</h2>
  <p class="black-0--text text-wrap" :class="isMobile ? 'paragraph' : 'title'">
    {{ $t("descriptionRoleAdmin") }}
  </p>

  <el-divider />
  <h2 class="headline-3 mb-2 black-0--text">{{ $t("users.roleShort") }}&nbsp;{{ $t(RoleEnum.MANAGER) }}:</h2>
  <p class="black-0--text text-wrap" :class="isMobile ? 'paragraph' : 'title'">
    {{ $t("descriptionRoleManager") }}
  </p>

  <el-divider />
  <h2 class="headline-3 mb-2 black-0--text">{{ $t("users.roleShort") }}&nbsp;{{ $t(RoleEnum.EMPLOYEE) }}:</h2>
  <p class="black-0--text text-wrap" :class="isMobile ? 'paragraph' : 'title'">
    {{ $t("descriptionRoleEmployee") }}
  </p>

  <el-divider />
  <h2 class="headline-3 mb-2 black-0--text">{{ $t("users.roleShort") }}&nbsp;{{ $t(RoleEnum.USER) }}:</h2>
  <p class="black-0--text text-wrap" :class="isMobile ? 'paragraph' : 'title'">
    {{ $t("descriptionRoleUser") }}
  </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { CreateUserDtoRoleEnum as RoleEnum } from "@/api";

export default defineComponent({
  props: {
    isMobile: Boolean,
  },
  setup() {
    return {
      RoleEnum,
    };
  },
});
</script>
