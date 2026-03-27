<template>
  <div class="d-flex align-center mb-1 flex-mobile-wrap">
    <el-form-item :label="$t('pricerPerPeriod')" prop="priceAllPeriod" class="mr-3">
      <el-input v-model="priceAllPeriodModel" autocomplete="off" :disabled="isView" />
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
import { defineComponent, PropType, computed, watch } from "vue";

function priceToNumber(val: string | number) {
  if (typeof val === "number") {
    return val;
  }

  return parseFloat(val.replace(/\s/, ""));
}

export default defineComponent({
  name: "BookingPricePerPeriod",
  props: {
    currensies: {
      type: Array as PropType<Currencies[]>,
      required: true,
    },
    priceAllPeriod: {
      type: Number,
    },
    currency: {
      type: String,
    },
    countDays: {
      type: Number,
      default: 1,
    },
    isView: Boolean,
  },
  setup(props, { emit }) {
    const priceAllPeriodModel = computed({
      get: () => props.priceAllPeriod,
      set: (val) => {
        emit("update:priceAllPeriod", val);
        emit(
          "update:pricePerMounth",
          val ? ((priceToNumber(val) / Math.abs(props.countDays)) * 30).toFixed(2) : undefined
        );
      },
    });

    const currencyModel = computed({
      get: () => props.currency,
      set: (val) => {
        emit("update:currency", val);
      },
    });

    watch(
      () => props.countDays,
      () => {
        emit(
          "update:pricePerMounth",
          priceAllPeriodModel.value
            ? ((priceToNumber(priceAllPeriodModel.value) / Math.abs(props.countDays)) * 30).toFixed(2)
            : undefined
        );
      }
    );

    return {
      priceAllPeriodModel,
      currencyModel,
    };
  },
});
</script>
