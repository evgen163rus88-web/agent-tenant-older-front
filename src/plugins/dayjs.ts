import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import { Plugin } from "vue";

dayjs.extend(LocalizedFormat);
dayjs.extend(utc);
dayjs.extend(relativeTime);

export const DayJSPlugin: Plugin = {
  install(app) {
    app.config.globalProperties.$dayjs = dayjs;
  },
};
