import { Plugin, VNode } from "vue";
import { ElNotification, NotificationOptions } from "element-plus";
import { TranslateResult } from "vue-i18n";
import i18n from "@/plugins/i18n";

type CNotificationOptions = {
  message: string | VNode | TranslateResult;
} & Omit<NotificationOptions, "message">;

type NoticeOptions = Partial<CNotificationOptions>;

function noticeRoot(options: NoticeOptions) {
  const defaultOptions = {
    message: "",
    type: "success",
    duration: (DEVELOPMENT ? 3 : 10) * 1000,
    showClose: false,
    position: "bottom-left",
  };

  ElNotification(Object.assign(defaultOptions, options) as NotificationOptions);
}

function noticeSuccess(msg: string | TranslateResult, options?: NoticeOptions) {
  const defaultOptions: NoticeOptions = {
    type: "success",
    title: msg as string,
  };
  const payload = options ? Object.assign(defaultOptions, options) : defaultOptions;

  noticeRoot(payload);
}

function noticeError(msg: string | TranslateResult, options?: NoticeOptions) {
  const defaultOptions: NoticeOptions = {
    type: "error",
    title: i18n.global.t("error"),
    message: msg as string,
  };
  const payload = options ? Object.assign(defaultOptions, options) : defaultOptions;

  noticeRoot(payload);
}

function noticeWarning(msg: string | TranslateResult, options?: NoticeOptions) {
  const defaultOptions: NoticeOptions = {
    type: "warning",
    title: i18n.global.t("warning"),
    message: msg as string,
  };
  const payload = options ? Object.assign(defaultOptions, options) : defaultOptions;

  noticeRoot(payload);
}

export function notice(options: NoticeOptions) {
  noticeRoot(options);
}

notice.success = noticeSuccess;
notice.warning = noticeWarning;
notice.error = noticeError;

export const NoticePlugin: Plugin = {
  install(app) {
    app.config.globalProperties.$notice = notice;
    app.provide("notice", notice);
  },
};
