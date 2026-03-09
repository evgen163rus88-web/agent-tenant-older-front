import router from "@/router";
import { _RouteLocationBase } from "vue-router";
import { RouteName, AccessDeniedRoute, AttemptRoute } from "@/router/router-utils";
import { clearBearer } from "@/api/bearer";
import { clearAuthHeader } from "@/api/axios";
import { AxiosError } from "axios";
import { ApiError } from "@/types/lib";
import i18n from "@/plugins/i18n";

function isAxiosError(err: Error): err is AxiosError {
  return (err as AxiosError).isAxiosError === true;
}

export function handleError(error: Error, cb: (msg: string) => void) {
  if (!isAxiosError(error)) {
    const msg = i18n.global.t("unknownError");
    cb(msg);
    throw error;
  }

  if (error.response) {
    if (error.response.status === 401) {
      clearBearer();
      clearAuthHeader();

      if (router.currentRoute.value.name !== RouteName.SIGN_IN) {
        AttemptRoute.set(router.currentRoute as unknown as _RouteLocationBase);
        router.push({ name: RouteName.SIGN_IN });
        return;
      }
    }

    if (error.response.status === 403) {
      router.push(AccessDeniedRoute);
      return;
    }

    const msg = (error.response.data as ApiError).message;

    cb(msg);
    // if (msg) {
    //   cb(msg);
    // } else {
    //   const key = error.response.data.msgKey ?? "";
    //   const keyExist = i18n.te(key, i18n.locale);
    //   const msg = keyExist ? i18n.global.t(key, error.response.data.msgData) : i18n.global.t("unknownError");

    //   cb(msg);

    //   if (!keyExist) {
    //     console.warn(`Message key "${key}" does not exist`);
    //   }
    // }
  } else {
    const msg = i18n.global.t("networkError");
    cb(msg);
  }
}
