import { ref, computed } from "vue";

export enum Diapozon {
  PER_MOUNTH = "BookingPricePerMounth",
  PER_PERIOD = "BookingPricePerPeriod",
}

export function useBookingPrices(bookingForm) {
  const disabledEarlyDeposit = computed(() => {
    return dayjs(bookingForm.periodFrom).diff(dayjs(), "day") <= 0;
  });

  const typePledge = computed(() => (inPercent.value ? "%" : bookingForm.currency));
  const countDays = computed(
    () => dayjs(bookingForm.periodFrom).diff(dayjs(bookingForm.periodTo).endOf("day"), "day") || 1
  );

  const enumPrice = ref();
  const inPercent = ref(false);
  const loading = ref(false);

  const typePrice = computed({
    get: () =>
      enumPrice.value ||
      (bookingForm.hasPriceAllPeriod ? Diapozon.PER_PERIOD : Diapozon.PER_MOUNTH),
    set: (val) => {
      enumPrice.value = val;
    },
  });

  return {
    disabledEarlyDeposit,
    typePledge,
    inPercent,
    typePrice,
    countDays,
    loading,
  };
}
