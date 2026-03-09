<template>
  <div class="w-100">
    <el-card class="w-100 mb-5" shadow="never">
      <div class="d-flex align-center justify-between">
        <div class="d-flex align-center">
          <img src="/img/apple-touch-icon-60x60.png" alt="logo" class="sign-in__logo mr-2" />
          <h2 class="bg-light--text">
            Agent
            <span class="primary-dark--text">Tenant</span>
          </h2>
        </div>

        <LangSetter />
      </div>
    </el-card>

    <div class="container d-flex justify-center align-center">
      <el-form label-position="top" class="sign-in--form" @submit="submit">
        <el-card class="blue-light">
          <template #header>
            <div class="w-100 text-ceneter title">
              <b>{{ $t("entry") }}</b>
            </div>
          </template>
          <el-form-item :label="$t('users.loginOrEmail')">
            <el-input
              class="mb-4"
              :placeholder="$t('users.loginOrEmail')"
              v-model="login"
              ref="loginRef"
              autofocus
            />
          </el-form-item>

          <el-form-item :label="$t('users.password')">
            <el-input
              class="mb-4"
              :placeholder="$t('users.password')"
              v-model="password"
              ref="passwordRef"
              show-password
              autofocus
            />
          </el-form-item>

          <el-button type="primary" @click="submit" class="w-100">
            {{ $t("btns.enter") }}
          </el-button>
        </el-card>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { AttemptRoute, RouteName } from "@/router/router-utils";
import { setAuthHeader } from "@/api/axios";
import { setBearer } from "@/api/bearer";
import { authApi } from "@/api";
import { useRouter, useLoad } from "@/plugins";
import type { InputInstance } from "element-plus";
import { queryInputElementInside } from "@/helpers";
import LangSetter from "@/components/LangSetter.vue";

export default defineComponent({
  components: { LangSetter },
  setup() {
    const login = ref("");
    const password = ref("");
    const router = useRouter();
    const $load = useLoad();
    const loginRef = ref<InputInstance>();
    const passwordRef = ref<InputInstance>();

    const focusLogin = () => {
      queryInputElementInside(loginRef.value?.$el).focus();
    };

    const focusPassword = () => {
      queryInputElementInside(passwordRef.value?.$el).focus();
    };

    const submit = () => {
      if (login.value === "") {
        focusLogin();
      } else if (password.value === "") {
        focusPassword();
      } else {
        $load(async () => {
          try {
            const res = await authApi.login({
              email: /@/.test(login.value) ? login.value : undefined,
              login: !/@/.test(login.value) ? login.value.toLowerCase() : undefined,
              password: password.value,
            });
            await Promise.resolve(setBearer(res.data));
            setAuthHeader(res.data);

            const attemptRoute = AttemptRoute.get();
            if (attemptRoute && attemptRoute.name) {
              AttemptRoute.clear();

              router.push(attemptRoute).catch((e) => {
                // eslint-disable-next-line no-console
                console.error("Error => ", e);
              });
            } else {
              router.push({ name: RouteName.HOME });
            }
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error("SignIn => \n", e);
          }
        });
      }
    };

    return {
      login,
      password,
      loginRef,
      passwordRef,
      submit,
    };
  },
});
</script>
<style lang="scss">
.sign-in {
  box-shadow: 3px 8px 20px 2px color(dark);
  &--form {
    @extend %mt-5;
    width: 100%;
    max-width: 450px;
  }

  &__logo {
    width: 40px;
    height: 40px;
    object-fit: cover;
  }
}
</style>
