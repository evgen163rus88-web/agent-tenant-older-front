import { createApp, h } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "@/plugins/i18n";
import { registerComponents } from "@/components/_base";
import { createPinia } from "pinia";
import { DayJSPlugin } from "./plugins/dayjs";
import Element from "element-plus";
import VueTelInput from "vue3-tel-input";
import { LoaderPlugin } from "./plugins/loader";
import { NoticePlugin } from "./plugins/notice";
import { DigitsOnlyDirective } from "./plugins/v-digitsonly";
import { globalCookiesConfig } from "vue3-cookies";
import "@/styles/index.scss";
import "element-plus/dist/index.css";
import "vue3-tel-input/dist/vue3-tel-input.css";

const requirePlugin = require.context("@/plugins", false, /\w+\.(ts|js)$/);
requirePlugin.keys().forEach((pluginName) => {
  requirePlugin(pluginName);
});

const pinia = createPinia();

const app = createApp({
  productionTip: false,
  render: () => h(App),
});

registerComponents(app);

globalCookiesConfig({
  expireTimes: "7d",
});

app
  .use(pinia)
  .use(router)
  .use(i18n)
  .use(DayJSPlugin)
  .use(Element)
  .use(LoaderPlugin)
  .use(NoticePlugin)
  .use(VueTelInput)
  .directive("digitsonly", DigitsOnlyDirective);

app.mount("#app");

export default app;
