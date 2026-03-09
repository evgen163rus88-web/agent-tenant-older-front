import { reactive, ref } from "vue";
import type { FormRules } from "element-plus";
import i18n from "@/plugins/i18n";

export function useClientRules() {
  const isValidPhone = ref(true);
  const isValidSecondaryPhone = ref(true);

  const rules = reactive<FormRules>({
    firstName: [
      { required: true, message: i18n.global.t("clientFormValid.enterFirstName"), trigger: "blur" },
    ],
    lastName: [
      { required: true, message: i18n.global.t("clientFormValid.enterLastName"), trigger: "blur" },
    ],
    passportNumber: [{ required: true, message: i18n.global.t("fieldRequired"), trigger: "blur" }],
    email: [
      {
        type: "email",
        message: i18n.global.t("clientFormValid.incorrectEmailFormat"),
        trigger: "blur",
      },
    ],
  });
  return {
    rules,
    isValidPhone,
    isValidSecondaryPhone,
  };
}
