import {
  BaseEntityShema,
  notificationApi,
  bookingApi,
  FindOneBookingDto,
  CreateNotificationDto,
} from "@/api";
import { Ref, ref } from "vue";

/**
 * id
 * apartment: BaseEntityShema[];
 * earlyBefore?: Депозит раннего бронирования;
 * amountMounth: Сумма платежа в месяц;
 * amountDay: Сумма платежа в день;
 * currency: Валюта платежа;
 * pd?: День платежа по аренде;
 */
export interface TargetNote {
  id: number;
  apartment: BaseEntityShema[];
  earlyBefore?: string | number;
  amountMounth: number;
  amountDay: number;
  currency: string;
  pd?: number;
}

export type ParsedNotice = Omit<CreateNotificationDto & { targets: TargetNote }, "target">;

export function useNotification() {
  const loading = ref(false);
  const booking = ref<FindOneBookingDto>();

  const parseTarget = (json: string): TargetNote => {
    return JSON.parse(json);
  };

  const discardNotice = async (id, loading: Ref<boolean>) => {
    loading.value = true;
    try {
      await notificationApi.unpdateNotice(id, { hasRead: true });
    } finally {
      loading.value = false;
    }
  };

  const fetchBooking = async (id) => {
    loading.value = true;
    try {
      booking.value = (await bookingApi.findOne(id)).data;
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    booking,
    fetchBooking,
    discardNotice,
    parseTarget,
  };
}
