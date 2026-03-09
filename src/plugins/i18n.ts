import messages from "../locale";
import { createI18n } from "vue-i18n";
import { mainInstance } from "@/api/axios";
import { dayjs as elDayjs } from "element-plus";

const locales = {
  // used for element-plus
  ru: require("dayjs/locale/ru"),
  en: require("dayjs/locale/en"),
};

function getChoiceIndexRu(choice: number, choicesLength: number) {
  if (choice === 0) {
    return 0;
  }

  const teen = choice > 10 && choice < 20;
  const endsWithOne = choice % 10 === 1;

  if (!teen && endsWithOne) {
    return 1;
  }

  if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
    return 2;
  }

  return choicesLength < 4 ? 2 : 3;
}

function getChoiceIndexEn(choice: number, choicesLength: number) {
  return choice > choicesLength ? choicesLength - 1 : choice;
}

const clientLang = getClientLang();

const i18n = createI18n({
  fallbackLocale: "ru",
  locale: clientLang,
  messages,
  pluralizationRules: {
    ru: getChoiceIndexRu,
    en: getChoiceIndexEn,
  },
});

setLang(clientLang);

function getClientLang() {
  interface CNavigator extends Navigator {
    browserLanguage: string;
    userLanguage: string;
    systemLanguage: string;
  }

  const cNavigator = navigator as CNavigator;

  let clientLang =
    localStorage.getItem("rentlang") ||
    cNavigator.language ||
    cNavigator.languages[0] ||
    cNavigator.browserLanguage ||
    cNavigator.userLanguage ||
    cNavigator.systemLanguage;

  if (clientLang) {
    clientLang = clientLang.toLowerCase().split("-")[0];
  }

  return clientLang;
}

function setLang(lang: string) {
  i18n.global.locale = lang;
  dayjs.locale(lang);
  // workaround element-plus bug
  elDayjs.locale(locales[lang]);
  localStorage.setItem("rentlang", lang);
  mainInstance.defaults.headers.common["Accept-Language"] = lang;
  document.documentElement.setAttribute("lang", lang);
}

export default i18n;
export { setLang };
