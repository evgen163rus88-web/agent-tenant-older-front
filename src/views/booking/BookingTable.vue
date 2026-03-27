<template>
  <div class="w-100 booking-area">
    <!-- left-block -->
    <div class="d-flex flex-column booking-area__left-block">
      <div class="booking-area__units flex-column">
        <div class="booking-area__top-line" />
        <div v-if="arrDays.mounths.length > 3" class="booking-area__top-line months-h">
          <span> mounths </span>
        </div>
        <div class="booking-area__header">
          {{ $t("apartments") }}
        </div>
      </div>

      <template v-if="bookings.length > 0 && countColumn">
        <template v-for="property in bookings" :key="property[0].id">
          <div class="booking-area__units--caption">
            <p class="w-100 text-center fwb">{{ property[0].property }}</p>
          </div>
          <div
            v-for="(bookInfo, j) in property"
            :key="bookInfo.id"
            class="booking-area__units align-center"
            :class="j % 2 !== 0 ? 'gray-blue' : 'gray-light'"
          >
            <div class="inner pl-2 pr-1">
              <span>{{ bookInfo.name }}</span>
            </div>
          </div>
        </template>
      </template>
    </div>

    <!-- table-block -->
    <div class="w-100 booking-area__table-block" ref="bookingTeable">
      <div class="booking-area__top-line w-100 justify-center">
        <template v-if="countColumn">
          <template v-if="arrDays.mounths.length <= 3">
            <i v-for="(mounth, i) in arrDays.mounths" :key="`mounth-${i}`" class="title">
              {{ mounth.name }}
              <template v-if="arrDays.mounths[i + 1]"> &nbsp;/&nbsp; </template>
            </i>
          </template>
          <template v-else>
            <span class="fwb" :class="isMobile ? 'label' : 'paragraph'">
              {{ arrDays.mounths[0].name }}
              ({{ startYear }})&nbsp;&mdash;&nbsp;
              {{ arrDays.mounths[arrDays.mounths.length - 1].name }}
              ({{ endYear }})
            </span>
          </template>
        </template>
      </div>

      <div v-if="arrDays.mounths.length > 3" class="d-grid booking-area__months-head" :style="`${styleGridColumns};`">
        <div
          v-for="(mounth, jj) in arrDays.mounths"
          :key="`mounth-${jj}`"
          :style="`grid-column-start: ${mounth.columnStart}; grid-column-end: ${mounth.columnEnd};`"
          class="booking-area__months-head--inner"
        >
          <span>
            {{ mounth.name }}
          </span>
        </div>
      </div>

      <div class="booking-area__header booking-area__header--calendar" :class="{ 'w-content': countColumn > 60 }">
        <div class="d-grid w-100" :style="`${styleGridColumns};`">
          <template v-if="countColumn">
            <div
              v-for="(weekDay, i) in arrDays.days"
              :key="`label-${i}`"
              class="title flex-column booking-area__header--dates"
              :class="{ 'gray-before': weekDay.numDayOfWeek === 0 || weekDay.numDayOfWeek === 6 }"
            >
              <p class="devil--text mb-1 label">
                {{ weekDay.dayOfWeek }}
              </p>
              <p>
                {{ weekDay.dateNum }}
              </p>
            </div>
          </template>
          <p v-else class="text-center text-no-wrap title error--text px-4">
            {{ $t("choosePeriod") }}
          </p>
        </div>
      </div>

      <template v-if="bookings.length > 0 && countColumn">
        <template v-for="property in bookings" :key="property[0].id">
          <div class="booking-area__units--caption">
            <p style="visibility: hidden" class="booking-area__units fwb pr-1">
              {{ property[0].property }}
            </p>
          </div>

          <template v-for="(book, i) in property" :key="book.id">
            <div
              class="d-grid w-100 relative book-line"
              :style="`${styleGridColumns};`"
              :class="[i % 2 !== 0 ? 'gray-blue' : 'gray-light', { 'w-content': countColumn > 60 }]"
            >
              <div
                v-for="line in book.bookings"
                :key="line.id"
                class="booking-area__time-line d-flex justify-between"
                :id="`line${line.id}`"
                :style="diapasonBooking(line, `line${line.id}`)"
                :class="[`${line.currentStatus?.toLowerCase()}`, `${line.currentStatus?.toLowerCase()}-t--text`]"
              >
                <div
                  v-if="line.currentStatus !== StatusEnum.CANCELED"
                  class="booking-area__time-line--info d-flex align-center"
                >
                  <b-icon :color="`${line.currentStatus?.toLowerCase()}-t`" size="large">
                    {{ line.currentStatus?.toLowerCase() }}
                  </b-icon>
                  <div class="ml-1">
                    <p class="paragraph bg-dark--text text-truncate">
                      {{ line.customerId[0].firstName + " " + line.customerId[0].lastName }}
                    </p>
                    <p class="label devil--text">
                      {{
                        $t("periodBooking", {
                          from: $dayjs(line.periodFrom).format("L"),
                          to: $dayjs(line.periodTo).format("L"),
                        })
                      }}
                    </p>
                  </div>
                </div>

                <BookingDropdown :line="line" @refresh="$emit('refresh')" />
              </div>

              <div
                v-for="(_, i) in arrDays.days"
                :key="`table-label-${i}`"
                class="title booking-area__response--cell"
              />
            </div>
          </template>
        </template>
      </template>
    </div>
  </div>
  <div class="booking-area__footer"></div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, unref } from "vue";
import { useI18n } from "@/plugins";
import { ResponseFoundBookingDTO, FoundBookingData, FoundBookingDataCurrentStatusEnum as StatusEnum } from "@/api";
import { useLayoutsStore } from "@/store/layouts.store";
import BookingDropdown from "./BookingDropdown.vue";

interface MonthArr {
  name: string;
  columnStart: number;
  columnEnd: number;
}

export default defineComponent({
  components: { BookingDropdown },
  props: {
    countDays: {
      type: Number,
      required: true,
    },
    startDay: {
      type: String as PropType<Date | string>,
      required: true,
    },
    bookings: {
      type: Array as PropType<ResponseFoundBookingDTO[][]>,
      default: () => [],
    },
  },
  setup(props) {
    const layoutsStore = useLayoutsStore();
    const bookingTeable = ref<HTMLElement | null>(null);
    const i18n = useI18n();
    const countColumn = computed(() => (props.countDays !== 0 ? Math.abs(props.countDays) + 1 : 0));
    const startOfDay = computed(() => dayjs(props.startDay).startOf("day"));
    const isMobile = computed(() => layoutsStore.isMobileScreen);

    const startYear = computed(() => dayjs(props.startDay).format("YYYY"));
    const endYear = computed(() => dayjs(props.startDay).add(unref(countColumn), "day").format("YYYY"));

    const arrDays = computed(() => {
      const one = 1;
      const days: { dayOfWeek: string; dateNum: string; numDayOfWeek: number }[] = [];
      const mounths: MonthArr[] = [];

      for (let i = 0; i <= countColumn.value; i++) {
        const weekDay = dayjs(props.startDay).add(i, "day").day();
        const dateNum = dayjs(props.startDay).add(i, "day").format("DD");

        days.push({
          dayOfWeek: i18n.t(`daysOfWeek.${weekDay}`),
          numDayOfWeek: weekDay,
          dateNum,
        });

        const mounth = dayjs(props.startDay).add(i, "day").format("MMMM");

        if (mounths.length === 0 || mounths[mounths.length - 1].name !== mounth) {
          let daysInMonth = dayjs(dayjs(props.startDay).add(i, "day")).daysInMonth();

          if (parseInt(dateNum) > 1) {
            daysInMonth = daysInMonth - parseInt(dateNum) + one;
          }

          mounths.push({
            name: mounth,
            columnStart: i + one,
            columnEnd: i + daysInMonth + one,
          });
        }
      }

      return { days, mounths };
    });

    const styleGridColumns = computed(() => {
      const clientWidth = bookingTeable.value?.clientWidth;
      const w = i18n.locale.value.toLowerCase() === "ru" ? 24 : 26;

      const mobileCell = clientWidth && unref(arrDays).days.length < 10 ? clientWidth / unref(arrDays).days.length : w;

      return `grid-template-columns: repeat(${arrDays.value.days.length}, ${
        unref(isMobile) ? `${mobileCell.toFixed(2)}px` : `minmax(${w}px, 1fr)`
      })`;
    });

    const diapasonBooking = (booking: FoundBookingData, id: string) => {
      let width = "";
      let left = "left: 0;";
      const zIndex = `z-index: ${booking.currentStatus === StatusEnum.CANCELED ? 1 : 2};`;

      const diffStart = startOfDay.value.diff(dayjs(booking.periodFrom).endOf("day"), "day");
      const diffEnd = startOfDay.value.diff(dayjs(booking.periodTo).endOf("day"), "day");

      const beginDay = diffStart >= 1 ? 1 : Math.abs(diffStart) + 1;

      const finish = Math.abs(diffEnd);

      const setWidth = (half: boolean, time = 0) => {
        setTimeout(() => {
          const divider = half ? 2 : 1;
          const timeLine = bookingTeable.value?.querySelector(`#${id}`);
          const timeLineWidth = timeLine?.getBoundingClientRect().width;
          const attrStyle = timeLine?.getAttribute("style");
          const percent = (cellWidth / divider / timeLineWidth!) * 100;

          width = `width: ${(percent + 100).toFixed(1)}%;`;

          if (!attrStyle?.includes("width") && cellWidth > 1) {
            timeLine?.setAttribute("style", attrStyle + width);
          }
        }, time);
      };

      const isSamePeriodFromAndStartOfDay =
        dayjs(booking.periodFrom).format("L") === dayjs(startOfDay.value).format("L");

      const finishDay = finish >= arrDays.value.days.length ? arrDays.value.days.length : finish + 1;

      const cellWidth = bookingTeable.value?.querySelector(".booking-area__response--cell")?.clientWidth || 1;

      // divider =======
      if (diffStart < 0 || isSamePeriodFromAndStartOfDay) {
        left = `left: ${cellWidth >> 1}px;`;
      }

      const selStart = parseInt(left.replace(/[^\d]/g, ""));

      if (finish >= arrDays.value.days.length || selStart === 0) {
        setWidth(!(finish >= arrDays.value.days.length && selStart === 0), 10);
      }

      const range = `grid-column-start: ${beginDay}; grid-column-end: ${finishDay}; ${left} ${zIndex}`;

      return range;
    };

    return {
      isMobile,
      bookingTeable,
      diapasonBooking,
      styleGridColumns,
      countColumn,
      StatusEnum,
      startYear,
      endYear,
      arrDays,
    };
  },
});
</script>
<style lang="scss">
@import "@/styles/booking-table.scss";
</style>
