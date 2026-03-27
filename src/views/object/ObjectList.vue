<template>
  <b-grid
    :headers="headersData"
    :items="apartaments"
    hover
    type="expand"
    @click-line="setIndex"
    :hideHeader="hideHeader"
    :subheaderContent="subheaderContent"
  >
    <template #cell-roomArea="{ item }">
      <span>{{ item.roomArea }}&nbsp;</span>
      <span>m<sup>2</sup></span>
    </template>
    <template #cell-pricePerMounth="{ item }">
      <div v-if="item.pricePerMounth">
        <span>
          {{ item.pricePerMounth }}
          {{ item.currencySymbol }}
        </span>
      </div>
      <span v-else>&mdash;</span>
    </template>
    <template #cell-pricePerDay="{ item }">
      <div v-if="item.pricePerDay">
        <span> {{ item.pricePerDay }}</span>
        {{ item.currencySymbol }}
      </div>
      <span v-else>&mdash;</span>
    </template>

    <template #cell-bookingStatus="{ item }">
      <el-tooltip :disabled="!item.bookingId.length">
        <el-tag :type="statusCode(item)" class="mx-1" effect="dark">
          {{ $t(`bookingStatuses.${item.bookingStatus}`) }}
        </el-tag>
        <template #content>
          <p class="title primary-light--text fwb mb-1">{{ $t("bookings") }}:</p>
          <div v-for="(booking, j) in item.bookingId" :key="booking.id" class="paragraph">
            <p class="mb-1">
              <span class="fwb">{{ $t("period") }}: </span>
              <span class="warning--text">
                {{
                  $t("periodBooking", {
                    from: $dayjs(booking.periodFrom).format("LL"),
                    to: $dayjs(booking.periodTo).format("LL"),
                  })
                }}
              </span>
            </p>
            <p :class="{ 'mb-2': j === item.bookingId.length - 1 }">
              <span>{{ $tc("fields.ofGuestsNum", booking.countGuests) }}</span>
            </p>
            <el-divider v-if="j !== item.bookingId.length - 1" />
          </div>
        </template>
      </el-tooltip>
    </template>

    <template #default="{ item }">
      <ObjectMore
        :key="item.indexLine"
        :apartment="item"
        @refresh="$emit('refresh')"
        :isMobile="isMobile"
        :mobileColumns="mobileColumns"
      />
    </template>
  </b-grid>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref, unref, toRefs } from "vue";
import { Headers } from "@/components/_base/grid/BGrid";
import { FoundApartamentDTO, FoundApartamentDTOBookingStatusEnum as BookingStatus } from "@/api";
import ObjectMore from "./ObjectMore.vue";
import { useLayoutsStore } from "@/store/layouts.store";
import { SubheaderContent } from "@/components/_base/grid/BGrid";
import { useI18n } from "@/plugins";

export default defineComponent({
  components: { ObjectMore },
  props: {
    apartaments: {
      type: Array as PropType<FoundApartamentDTO[]>,
      default: () => [],
    },
    headers: {
      type: Array as PropType<Headers[]>,
      required: true,
    },
    hideHeader: Boolean,
  },
  emits: ["refresh"],
  setup(props) {
    const { headers } = toRefs(props);
    const layoutsStore = useLayoutsStore();
    const i18n = useI18n();
    const index = ref(null);
    const mobileColumns = ["name", "countBedroom", "bookingStatus"];

    const isMobile = computed(() => layoutsStore.isMobileScreen);

    const subheaderContent = computed<SubheaderContent>(() => ({
      title: `${props.apartaments[0].parent} - (${i18n.t("typeProperty." + props.apartaments[0].type)})`,
      textPosition: "left",
    }));

    const headersData = computed<Headers[]>(() => {
      if (isMobile.value) {
        return unref(headers).filter((t) => mobileColumns.includes(t.prop));
      }

      return headers.value;
    });

    const statusCode = (item: FoundApartamentDTO) => {
      const status = item.bookingStatus;

      switch (status) {
        case BookingStatus.RESERVED:
          return "warning";
        case BookingStatus.FREE:
          return "success";
        case BookingStatus.NOT_AVAILABLE:
          return "info";
        case BookingStatus.CHECK_IN:
          return "";
        case BookingStatus.CHECK_OUT:
          return "danger";
      }
    }; //"" | "warning" | "success" | "danger" | "info"

    const setIndex = (e) => {
      index.value = e.indexLine;
    };

    return {
      isMobile,
      subheaderContent,
      mobileColumns,
      statusCode,
      headersData,
      setIndex,
      index,
    };
  },
});
</script>
