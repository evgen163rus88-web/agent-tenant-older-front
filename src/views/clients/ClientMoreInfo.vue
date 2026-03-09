<template>
  <el-card
    shadow="never"
    class="clients-more more-in-tables"
    v-loading="loading"
    :body-style="{ padding: isMobile ? '8px' : '16px' }"
  >
    <div class="image__list mr-8">
      <p class="title devi--text mb-2">
        {{ $t("docsPhoto") }}
      </p>
      <el-image v-if="client.docsPhoto?.length === 0">
        <template #error>
          <div class="image__slot">{{ $t("noFoto") }}</div>
        </template>
      </el-image>
      <el-image
        class="image__list--item"
        v-for="(url, i) in client.docsPhoto"
        :key="url"
        :src="resolveUrl(url).toString()"
        :preview-src-list="(resolveUrl(client.docsPhoto) as string[])"
        :initial-index="i"
        fit="cover"
      />
    </div>

    <ClientMoreMobile v-if="isMobile" :data="client" />

    <div class="d-flex flex-column mr-6 mw-30-desk">
      <div v-if="client.agent" class="mb-3">
        <p class="paragraph mb-1">{{ $t("fields.agentClient") }}:</p>
        <b class="bg-light--text">{{ client.agent }}</b>
      </div>
    </div>

    <el-card v-if="client.bookingId.length" class="w-half">
      <template #header>
        <b> {{ $t("rentlyApartament") }}&nbsp;&nbsp; </b>
      </template>
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(book, i) in client.bookingId" :key="`book${i}`" :name="i">
          <template #title>
            <p class="paragraph bg-dark--text">
              <span class="fwb"> {{ book.apartamentId[0].propertyId[0].name }} &mdash; </span>
              {{ book.apartamentId[0].name }}
            </p>
          </template>
          <el-card>
            <div class="d-flex flex-wrap align-center mb-2">
              <p class="mr-2 fwb">{{ $t("period") }}:</p>
              <el-tag effect="plain" type="success" class="mr-4">
                {{ $dayjs(book.periodFrom).format("L") }} &mdash;
                {{ $dayjs(book.periodTo).format("L") }}
              </el-tag>

              <p class="mr-2 fwb">{{ $t("fields.address") }}:</p>
              <span class="devil--text">{{ book.apartamentId[0].propertyId[0].address }}</span>
            </div>

            <div class="d-flex flex-wrap align-center mb-2">
              <p class="mr-1 fwb">{{ $t("fields.pledge") }}:</p>
              <p class="devil--text">{{ book.pledge }}</p>
              &nbsp;
              <span class="mr-3">
                {{ getCurrencySymbol(book.pledgeCurrency) }}
              </span>
              <p class="mr-1 fwb">{{ $t("fields.payDayForLease") }}:</p>
              <span class="devil--text">{{ book.payDayForLease }}</span>
            </div>

            <div class="d-flex align-center mb-2">
              <p class="mr-1 fwb">{{ $t("fields.currentStatusOfApartament") }}:</p>
              <el-tag
                :type="statusCode(book.apartamentId[0].bookingStatus)"
                class="mx-1"
                effect="dark"
              >
                {{ $t(`bookingStatuses.${book.apartamentId[0].bookingStatus}`) }}
              </el-tag>
            </div>
          </el-card>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <el-button
      type="primary"
      circle
      size="large"
      class="ml-auto mt-2"
      @click="$emit('edit', client)"
    >
      <b-icon>edit</b-icon>
    </el-button>
  </el-card>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, computed } from "vue";
import {
  FoundCustomersDTO,
  basePath,
  CreateApartamentDtoBookingStatusEnum as BookingStatus,
} from "@/api";
import { useCurrencyStore } from "@/store/currency.store";
import ClientMoreMobile from "./ClientMoreMobile.vue";

export default defineComponent({
  components: { ClientMoreMobile },
  props: {
    client: {
      type: Object as PropType<FoundCustomersDTO>,
      required: true,
    },
    isMobile: Boolean,
  },
  setup() {
    const currencyStore = useCurrencyStore();
    const getCurrencySymbol = computed(() => currencyStore.getSymbolCurrency);
    const loading = ref(false);
    const activeName = ref();

    const resolveUrl = (photo?: string | string[]) => {
      if (!photo) return [];

      if (Array.isArray(photo)) {
        return photo.map((ph) => {
          return `${basePath}/upload-file/get/${ph}`;
        });
      }

      return `${basePath}/upload-file/get/${photo}`;
    };

    const statusCode = (status) => {
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
    };

    return {
      basePath,
      loading,
      resolveUrl,
      activeName,
      statusCode,
      getCurrencySymbol,
    };
  },
});
</script>
<style lang="scss">
.clients-more {
  .w-half {
    .el-card__body {
      display: block;
    }
  }
  .el-card {
    @media screen and (max-width: 780px) {
      margin-top: space(2);

      .el-tag {
        margin-top: space(1);
        margin-bottom: space(1);
      }
    }
    &__body {
      @extend %p-2;
      display: flex;
      flex-wrap: wrap;
      background-color: color(white);
    }
  }
}
</style>
