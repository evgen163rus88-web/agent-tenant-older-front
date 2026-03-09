<template>
  <el-card class="edit-user" v-loading="loading">
    <el-form :model="user" ref="validateForm" label-position="top" class="container w-half">
      <div class="d-flex flex-mobile-wrap">
        <el-form-item
          :label="$t('users.firstName')"
          class="w-half mr-2"
          prop="firstName"
          :rules="[{ required: true, message: $t('fieldRequired') }]"
        >
          <el-input :placeholder="$t('users.firstName')" v-model="user.firstName" />
        </el-form-item>

        <el-form-item :label="$t('users.lastName')" class="w-half">
          <el-input :placeholder="$t('users.lastName')" v-model="user.lastName" />
        </el-form-item>
      </div>

      <div class="d-flex flex-mobile-wrap">
        <el-form-item
          :label="$t('email')"
          class="w-half mr-5"
          prop="email"
          :rules="[
            { required: true, message: $t('fieldRequired'), trigger: 'blur' },
            { type: 'email', message: $t('fieldEmailErr'), trigger: ['blur', 'change'] },
          ]"
        >
          <el-input :placeholder="$t('email')" v-model="user.email" />
        </el-form-item>

        <el-form-item :label="$t('users.role')">
          <div class="d-flex">
            <el-select class="mb-3 mr-2" v-model="user.role" value-key="id">
              <!-- <el-select class="mb-3" :model-value="RoleEnum.ADMIN" value-key="id" disabled> -->
              <el-option v-for="(role, i) in RoleEnum" :key="i" :label="$t(role)" :value="role" />
            </el-select>

            <el-tooltip :content="$t('moreAboutRoles')">
              <el-button text bg type="primary" @click="showModal = true">
                <b-icon>personal</b-icon>
              </el-button>
            </el-tooltip>
          </div>
        </el-form-item>
      </div>

      <div class="d-flex flex-mobile-wrap">
        <el-form-item
          prop="login"
          :rules="[{ required: true, message: $t('fieldRequired') }]"
          :label="$t('users.login')"
          class="w-half mr-2"
        >
          <el-input
            :placeholder="$t('users.login')"
            v-model="user.login"
            autocomplete="off"
            :disabled="userId > 0"
          />
        </el-form-item>

        <el-form-item
          :label="$t('users.password')"
          class="w-half"
          prop="password"
          :rules="[{ required: userId === 0, message: $t('fieldRequired') }]"
        >
          <el-input
            :placeholder="$t('users.password')"
            v-model="user.password"
            autocomplete="off"
            type="password"
            show-password
          />
        </el-form-item>
      </div>

      <div class="d-flex align-center">
        <p class="title font-weight-bold mr-3">{{ $t("users.account") }}:</p>

        <p
          class="label font-weight-bold mr-6"
          :class="`${user.isActive ? 'primary' : 'error'}--text`"
        >
          {{ textActivate }}
        </p>

        <el-switch v-model="user.isActive" active-color="#7ed656" inactive-color="#ff4949" />
      </div>

      <div class="d-flex align-center justify-between mt-4">
        <el-button @click.prevent="back">
          {{ $t("btns.cancel") }}
        </el-button>

        <el-button type="primary" @click.prevent="onSave">
          {{ $t("btns.save") }}
        </el-button>
      </div>
    </el-form>
  </el-card>

  <el-dialog
    v-model="showModal"
    :width="isMobile ? '100%' : '70%'"
    :title="$t('moreAboutRoles')"
    destroy-on-close
  >
    <AboutRoles :isMobile="isMobile" />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref, onMounted, toRefs, unref } from "vue";
import { usePage } from "@/components/_base/page/BPage";
import { CreateUserDtoRoleEnum as RoleEnum, usersApi } from "@/api";
import { RouteName } from "@/router/router-utils";
import type { FormInstance } from "element-plus";
import { useUsersStore } from "@/store/users.store";
import { useRouter } from "vue-router";
import { useI18n, useNotice } from "@/plugins";
import { useLayoutsStore } from "@/store/layouts.store";
import AboutRoles from "./AboutRoles.vue";

export default defineComponent({
  components: { AboutRoles },
  props: {
    userId: {
      type: Number,
      required: true,
    },
    isComapny: Boolean,
  },
  setup(props, { emit }) {
    const i18n = useI18n();
    const usersStore = useUsersStore();
    const layoutsStore = useLayoutsStore();
    const validateForm = ref<FormInstance>();
    const $router = useRouter();
    const notice = useNotice();
    const page = usePage();
    const loading = ref(false);
    const showModal = ref(false);
    const { userId, isComapny } = toRefs(props);

    const textActivate = computed(() =>
      user.isActive ? i18n.t("users.active") : i18n.t("users.unActive")
    );
    const isMobile = computed(() => layoutsStore.isMobileScreen);

    const user = reactive({
      firstName: "",
      lastName: undefined,
      email: "",
      login: "",
      password: "",
      role: undefined,
      isActive: false,
    });

    page.title = i18n.t("pages.useredit");
    onMounted(async () => {
      if (unref(userId) > 0) {
        const response = (await usersApi.getOneUser(String(unref(userId)))).data;

        for (const prop in response) {
          if ({}.hasOwnProperty.call(user, prop)) {
            user[prop] = response[prop];
          }
        }
      }
    });

    const back = () => {
      if (unref(isComapny)) {
        emit("close");
        return;
      }

      $router.push({
        name: RouteName.USERS,
      });
    };

    const onSave = () => {
      validateForm.value?.validate(async (isValid) => {
        if (isValid) {
          try {
            loading.value = true;
            if (unref(userId) > 0) {
              await usersApi.updateUserById(String(unref(userId)), {
                ...user,
              });
              emit("updated-user");

              notice.success(i18n.t("editUserSuccess"));
            }

            await usersStore.fetchUsers();
            back();
          } catch (e) {
            notice.error(e as string);
          } finally {
            loading.value = false;
          }
        }
      });
    };

    return {
      isMobile,
      showModal,
      validateForm,
      RoleEnum,
      textActivate,
      loading,
      onSave,
      back,
      page,
      user,
    };
  },
});
</script>
<style lang="scss" scoped>
.edit-user {
  margin: 0 auto;
  width: 70%;

  @media screen and (max-width: 780px) {
    width: 100%;
    .el-form-item {
      margin-right: 0;
    }
  }
}
</style>
