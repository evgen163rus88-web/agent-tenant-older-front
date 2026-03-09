/* eslint-disable @typescript-eslint/no-explicit-any */
import { reactive } from "vue";
import type { FormRules } from "element-plus";
import i18n from "@/plugins/i18n";

export function useCommunalRules() {
  const validatorElectric = (rule: any, value: any, callback: any) => {
    if (!value || value === "") {
      callback(new Error(i18n.global.t("fieldRequired")));
    } else {
      callback();
    }
  };

  const rules = reactive<FormRules>({
    tariffElectric: [{ required: true, message: i18n.global.t("fieldRequired"), trigger: "blur" }],
    valueElectric: [{ required: true, validator: validatorElectric, trigger: "blur" }],
    tariffWater: [{ required: true, message: i18n.global.t("fieldRequired"), trigger: "blur" }],
    valueWater: [{ required: true, message: i18n.global.t("fieldRequired"), trigger: "blur" }],

    apartamentId: [
      { required: true, message: i18n.global.t("chooseAccommodation"), trigger: "blur" },
    ],
  });
  return {
    rules,
  };
}
