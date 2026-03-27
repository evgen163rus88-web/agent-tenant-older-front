import { reactive } from "vue";
import type { FormRules } from "element-plus";
import i18n from "@/plugins/i18n";

export function useBookingRules(bookingForm) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateDeposit = (rule: any, value: any, callback: any) => {
    if (bookingForm.pledge && !value) {
      callback(new Error(i18n.global.t("chouldChooseCurrensyOfDeposit")));
    } else {
      callback();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const validateDepositBefore = (rule: any, value: any, callback: any) => {
    if (bookingForm.depositBefore && !value) {
      callback(new Error(i18n.global.t("chouldChooseCurrensyOfDeposit")));
    } else {
      callback();
    }
  };

  const rules = reactive<FormRules>({
    periodFrom: [{ required: true, message: i18n.global.t("needPeriod"), trigger: "blur" }],
    periodTo: [{ required: true, message: i18n.global.t("needPeriod"), trigger: "blur" }],
    countGuests: [
      { required: true, message: i18n.global.t("fieldRequired"), trigger: "blur" },
      { type: "number", message: i18n.global.t("avaliableOnlyDigits") },
    ],
    payDayForLease: [
      { required: true, message: i18n.global.t("fieldRequired"), trigger: "blur" },
      { type: "number", message: i18n.global.t("avaliableOnlyDigits") },
    ],
    currency: [{ required: true, message: i18n.global.t("fieldRequired"), trigger: "blur" }],
    pricePerMounth: [
      {
        required: !bookingForm.hasPriceAllPeriod,
        message: i18n.global.t("fieldRequired"),
        trigger: "blur",
      },
    ],
    priceAllPeriod: [
      {
        required: bookingForm.hasPriceAllPeriod,
        message: i18n.global.t("fieldRequired"),
        trigger: "blur",
      },
    ],

    apartamentId: [{ required: true, message: i18n.global.t("chooseAccommodation"), trigger: "blur" }],
    customerId: [{ required: true, message: i18n.global.t("chooseClient"), trigger: "blur" }],

    pledgeCurrency: [{ validator: validateDeposit, trigger: "blur" }],

    depositCurrency: [{ validator: validateDepositBefore, trigger: "blur" }],
  });
  return {
    rules,
  };
}
