<template>
  <div class="d-flex flex-column mw-30-desk w-100 pl-1">
    <p class="paragraph fwb mb-05">{{ $t("listObj.roomArea") }}:</p>
    <p class="devil--text text-no-wrap">
      <span>{{ data.roomArea }}</span>
      <span>m<sup>2</sup></span>
    </p>
  </div>

  <div class="d-flex flex-column mw-30-desk w-100 pl-1">
    <p class="paragraph fwb mb-05">{{ $t("listObj.priceMouth") }}:</p>
    <p class="devil--text text-no-wrap">
      <span>
        {{ data.pricePerMounth }}
        {{ data.currencySymbol }}
      </span>
    </p>
  </div>

  <div v-if="data.pricePerDay" class="d-flex flex-column mw-30-desk w-100 pl-1">
    <p class="paragraph fwb mb-05">{{ $t("listObj.priceDay") }}:</p>
    <p class="devil--text text-no-wrap">
      <span>
        {{ data.pricePerDay }}
        {{ data.currencySymbol }}
      </span>
    </p>
  </div>

  <div class="d-flex flex-column mw-30-desk w-100 pl-1">
    <p class="paragraph fwb mb-05">{{ $t("listObj.countBedRooms") }}:</p>
    <p class="devil--text">{{ data.countBedroom }}</p>
  </div>

  <div class="d-flex flex-column mw-30-desk w-100 pl-1">
    <p class="paragraph fwb mb-05">{{ $t("listObj.countBathRooms") }}:</p>
    <p class="devil--text">{{ data.countBathroom || "&mdash;" }}</p>
  </div>

  <div class="d-flex flex-column mw-30-desk w-100 pl-1">
    <p class="paragraph fwb mb-05">{{ $t("listObj.updatedAt") }}:</p>
    <p class="devil--text">{{ $dayjs(data.updatedAt).format("lll") }}</p>
  </div>
</template>

<script lang="ts">
import { FoundApartamentDTO } from "@/api/openapi";
import { defineComponent, PropType } from "vue";
export default defineComponent({
  props: {
    data: {
      type: Object as PropType<FoundApartamentDTO>,
      required: true,
    },
  },
});
</script>
