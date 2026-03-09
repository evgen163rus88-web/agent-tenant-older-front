import { inject } from "vue";
import { notice } from "./notice";

export { useI18n } from "vue-i18n";
export { useCookies } from "vue3-cookies";
export { useRoute, useRouter, useLink } from "vue-router";

export const useLoad = () => inject("loader") as (apiMethod: () => Promise<void>) => Promise<void>;
export const useNotice = () => inject("notice") as typeof notice;
export const useIsLoading = () => inject("isLoading") as boolean;
