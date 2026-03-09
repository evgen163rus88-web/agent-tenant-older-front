import ru from "./ru.yaml";
import ruElement from "element-plus/es/locale/lang/ru";
import ruD from "dayjs/locale/ru";

import en from "./en.yaml";
import enElement from "element-plus/es/locale/lang/en";
import enD from "dayjs/locale/en";

export default {
  en: { ...en, ...enElement, ...enD },
  ru: { ...ru, ...ruElement, ...ruD },
};
