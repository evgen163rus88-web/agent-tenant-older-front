<template>
  <div class="d-flex align-center w-100">
    <h1 class="mr-1">{{ $t("users.title") }}</h1>
    <el-button type="primary" class="ml-auto" @click="createUser" round>
      <b-icon class="mx-1" color="bg-nav" icon="add" />
      <span>&nbsp;{{ $t("btns.addUser") }}</span>
    </el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouteName } from "@/router/router-utils";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const $router = useRouter();
    const createUser = () => {
      $router.push({
        name: RouteName.EDIT_USER,
        params: {
          userId: "0",
        },
      });
    };

    return {
      createUser,
    };
  },
});
</script>
