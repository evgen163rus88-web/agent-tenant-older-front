import { computed, ComputedRef } from "vue";
import type { FormRules } from "element-plus";
import i18n from "@/plugins/i18n";

export function useIncomeRules(isRequiredApartament: ComputedRef<boolean>) {
  const rules = computed<FormRules>(() => ({
    name: [{ required: true, message: i18n.global.t("fieldRequired"), trigger: "blur" }],
    type: [{ required: true, message: i18n.global.t("fieldRequired"), trigger: "blur" }],
    amount: [{ required: true, message: i18n.global.t("fieldRequired"), trigger: "blur" }],
    apartamentId: [
      {
        required: isRequiredApartament.value,
        message: i18n.global.t("fieldRequired"),
        trigger: "blur",
      },
    ],
  }));

  return {
    rules,
  };
}
