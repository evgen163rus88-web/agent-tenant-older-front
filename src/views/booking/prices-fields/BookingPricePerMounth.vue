<template>
  <div class="d-flex align-center mb-1 flex-mobile-wrap">
    <el-form-item :label="$t('pricerPerMonth')" prop="pricePerMounth" class="mr-3">
      <el-input v-model="pricePerMounthModel" autocomplete="off" :disabled="isView" />
    </el-form-item>

    <el-form-item :label="$t('pricePerDay')" prop="pricePerDay" class="mr-3">
      <el-input v-model="pricePerDayModel" autocomplete="off" :disabled="isView" />
    </el-form-item>

    <el-form-item :label="$t('fields.currency')" prop="currency">
      <el-select
        v-model="currencyModel"
        filterable
        :placeholder="$t('chooseCurrency')"
        value-key="ticker"
        style="width: 250px"
        :disabled="isView"
      >
        <el-option v-for="item in currensies" :key="item.symbol" :value="item.ticker">
          <div class="d-flex justify-between">
            <b>{{ item.name }}</b>
            <span style="color: var(--el-text-color-secondary); font-size: 14px">
              {{ item.ticker }} &mdash; {{ item.symbol }}
            </span>
          </div>
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
<script lang="ts">
import { Currencies } from "@/store/currency.store";
import { defineComponent, PropType, computed } from "vue";

export default defineComponent({
  name: "BookingPricePerMounth",
  props: {
    currensies: {
      type: Array as PropType<Currencies[]>,
      required: true,
    },
    pricePerMounth: {
      type: Number,
    },
    pricePerDay: {
      type: Number,
    },
    currency: {
      type: String,
    },
    isView: Boolean,
  },
  setup(props, { emit }) {
    const pricePerMounthModel = computed({
      get: () => props.pricePerMounth,
      set: (val) => {
        emit("update:pricePerMounth", val);
      },
    });

    const pricePerDayModel = computed({
      get: () => props.pricePerDay,
      set: (val) => {
        emit("update:pricePerDay", val);
      },
    });

    const currencyModel = computed({
      get: () => props.currency,
      set: (val) => {
        emit("update:currency", val);
      },
    });

    return {
      pricePerMounthModel,
      pricePerDayModel,
      currencyModel,
    };
  },
});
</script>
