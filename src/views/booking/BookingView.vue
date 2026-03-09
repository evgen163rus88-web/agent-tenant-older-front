<template>
  <b-page :state="page">
    <template v-if="$route.meta.isChild" #content>
      <router-view @refresh="refresh" />
    </template>

    <template v-else #content>
      <div class="d-flex justify-between flex-mobile-wrap align-center">
        <FilterCollaps class="booking-view__filters">
          <BookingFilters @search="find" />
        </FilterCollaps>

        <h1 class="booking-view__title mr-1">{{ $t("booking") }}</h1>

        <el-button
          v-if="!isJustUser"
          type="primary"
          class="booking-view__create"
          @click="$router.push({ name: RouteName.MAKE_BOOKING, params: { bookId: 0 } })"
          round
        >
          <b-icon class="mx-1" color="bg-nav" icon="add" />
          <span>
            {{ $t("btns.createBooking") }}
          </span>
        </el-button>
      </div>
      <el-divider />

      <BookingTable :countDays="countDays" :startDay="startDay" :bookings="bookings" @refresh="refresh" />
    </template>
  </b-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { usePage } from "@/components/_base/page/BPage";
import { usePropertiesStore } from "@/store/properties.store";
import BookingFilters from "./BookingFilters.vue";
import BookingTable from "./BookingTable.vue";
import { debounce } from "@/helpers";
import { RouteName } from "@/router/router-utils";
import { bookingApi, SearchBookingDto, ResponseFoundBookingDTO } from "@/api";
import FilterCollaps from "@/components/FilterCollaps.vue";
import { useUserStore } from "@/store/user.store";

export default defineComponent({
  components: { BookingFilters, BookingTable, FilterCollaps },
  setup() {
    const page = usePage();
    const propertyStore = usePropertiesStore();
    const userStore = useUserStore();

    const isJustUser = computed(() => userStore.isJustUser);
    const countDays = ref(0);
    const startDay = ref<Date | string>(new Date());
    const currentFilter = ref<SearchBookingDto>();

    const bookings = ref<ResponseFoundBookingDTO[]>([]);

    page.load(async () => {
      await propertyStore.fetchProperties();
    });

    const find = debounce(async (filters: SearchBookingDto) => {
      countDays.value = dayjs(filters.periodFrom).diff(dayjs(filters.periodTo), "day");
      startDay.value = filters.periodFrom || new Date();

      currentFilter.value = JSON.parse(JSON.stringify(filters));

      if (
        filters.periodFrom &&
        filters.periodTo &&
        dayjs(filters.periodFrom).isValid() &&
        dayjs(filters.periodTo).isValid() &&
        currentFilter.value
      ) {
        bookings.value = (await bookingApi.searchBooking({ ...currentFilter.value })).data;
      }
    });

    const refresh = async () => {
      await find(currentFilter.value);
    };

    return {
      page,
      find,
      refresh,
      bookings,
      RouteName,
      countDays,
      startDay,
      isJustUser,
    };
  },
});
</script>
<style lang="scss">
.booking-view {
  &__filters {
    @media screen and (max-width: 780px) {
      order: 2;
    }
  }

  &__title {
    @media screen and (min-width: 780px) {
      display: none;
    }
  }

  &__create {
    margin-left: auto;
    @media screen and (max-width: 780px) {
      margin-bottom: space(2);
      order: 1;
    }
  }
}
</style>
