import Dayjs from "dayjs";
import { notice } from "@/plugins/notice";
import { AxiosError } from "axios";
import { I18nInstance } from "vue-i18n";

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $dayjs: typeof Dayjs;
    $t: typeof I18nInstance;
    $notice: typeof notice;
    $load: (apiMethod: () => Promise<void>) => void;
    $isLoading: boolean;
  }
}

declare global {
  const PRODUCTION: boolean;
  const DEVELOPMENT: boolean;
  const dayjs: typeof Dayjs;
  const $t: typeof I18nInstance;
}

export interface ApiErrorState<T = any> {
  body: T;
  code: number;
  msgValue?: string;
  msgKey?: string;
  msgData?: any[] | { [key: string]: any } | undefined;
}

export type ApiError<T = any> = AxiosError<ApiErrorState<T>>;
