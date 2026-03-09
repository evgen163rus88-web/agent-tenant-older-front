import { reactive } from "vue";
import type { FormRules } from "element-plus";
import i18n from "@/plugins/i18n";

export function useObjectRules() {
  const rules = reactive<FormRules>({
    name: [{ required: true, message: i18n.global.t("enterName"), trigger: "blur" }],
    roomArea: [
      { required: true, message: i18n.global.t("fieldRequired"), trigger: "blur" },
      { type: "number", message: i18n.global.t("avaliableOnlyDigits") },
    ],
    countBedroom: [
      { required: true, message: i18n.global.t("fieldRequired"), trigger: "blur" },
      { type: "number", message: i18n.global.t("avaliableOnlyDigits") },
    ],
    countBathroom: [{ type: "number", message: i18n.global.t("avaliableOnlyDigits"), trigger: "blur" }],
    pricePerMounth: [],
    currency: [{ required: true, message: i18n.global.t("fieldRequired"), trigger: "blur" }],
    propertyId: [{ required: true, message: i18n.global.t("enterParentObj"), trigger: "blur" }],
  });
  return {
    rules,
  };
}
