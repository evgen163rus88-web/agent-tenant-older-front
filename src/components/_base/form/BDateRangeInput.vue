<template>
  <div class="d-date-range-input">
    <el-date-picker
      :model-value="modelValue[0]"
      @update:model-value="onStartChange"
      @change="onStartChange"
      :placeholder="$t('fields.startDate')"
      :disabled-date="startPickerOptions.disabledDate"
      format="DD.MM.YYYY"
      :disabled="$attrs.disabled"
    />
    <div class="d-flex mx-05 align-center devil--text divider-range">&nbsp;&mdash;&nbsp;</div>
    <el-date-picker
      :model-value="modelValue[1]"
      @update:model-value="onEndChange"
      :placeholder="$t('fields.endDate')"
      :disabled-date="endPickerOptions.disabledDate"
      format="DD.MM.YYYY"
      :disabled="$attrs.disabled"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { ManipulateType } from "dayjs";
import { isEmpty } from "@/helpers";

export type Range = {
  start: number | string;
  end: number | string;
};

const getDisabledDate = (date: Date, range: Range) => {
  const millis = date.getTime();
  return millis < Number(range.start) || millis > Number(range.end);
};

export default defineComponent({
  props: {
    modelValue: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    maxRange: Number,
    maxRangeUnit: {
      type: String as PropType<ManipulateType>,
      default: "month",
    },
    forceRangeRestriction: {
      type: Object as PropType<Range>,
      default: () => ({}),
    },
    restrictionEndDate: Boolean,
    restrictStart: Boolean,
    autoSetEndTime: Boolean,
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const now = Date.now();

    const forceRange = computed(() => {
      const { maxRange, maxRangeUnit } = props;

      if (!isEmpty(props.forceRangeRestriction) && maxRange) {
        return {
          start: props.forceRangeRestriction.start ? dayjs(props.forceRangeRestriction.start).toDate().getTime() : 0,
          end: props.forceRangeRestriction.end
            ? dayjs(props.forceRangeRestriction.end).toDate().getTime()
            : dayjs(props.forceRangeRestriction.start).add(maxRange, maxRangeUnit).toDate().getTime(),
        };
      }

      return null;
    });

    const startPickerRange = computed<Range>(() => {
      const dateTo = props.modelValue[1];
      const endDayjs = dayjs(dateTo || new Date());
      const { maxRangeUnit, maxRange } = props;

      if (forceRange.value) {
        return forceRange.value;
      }

      return {
        start: dateTo && maxRange ? endDayjs.subtract(maxRange, maxRangeUnit).toDate().getTime() : 0,
        end: endDayjs.toDate().getTime(),
      };
    });

    const endPickerRange = computed<Range>(() => {
      const dateFrom = props.modelValue[0];
      const startDayjs = dayjs(dateFrom);
      const { maxRangeUnit, maxRange } = props;

      if (forceRange.value) {
        return forceRange.value;
      }

      const maxEnd = maxRange && dateFrom ? startDayjs.add(maxRange, maxRangeUnit).toDate().getTime() : now;
      return {
        start: dateFrom ? startDayjs.startOf("day").toDate().getTime() : 0,
        end: maxEnd > now && props.restrictionEndDate ? now : maxEnd,
      };
    });

    const startPickerOptions = computed(() => ({
      disabledDate: (date: Date) => {
        if (!props.modelValue[0] && !props.modelValue[1] && !props.restrictStart) {
          return;
        } else if (props.restrictStart) {
          return getDisabledDate(date, endPickerRange.value);
        }
        return getDisabledDate(date, startPickerRange.value);
      },
    }));

    const endPickerOptions = computed(() => ({
      disabledDate: (date: Date) => {
        if (!props.modelValue[0] && !props.modelValue[1]) {
          return;
        }
        return getDisabledDate(date, endPickerRange.value);
      },
    }));

    const getEndDate = (startValue: string) => {
      if (props.maxRange) {
        let maxDate = dayjs(startValue).add(props.maxRange, props.maxRangeUnit);

        if (maxDate.isAfter(new Date(), "day")) {
          maxDate = dayjs().add(1, "day");
        }

        return maxDate.format("YYYY-MM-DD");
      }
    };

    const onStartChange = (value) => {
      const endDate = value && props.autoSetEndTime ? getEndDate(value) : props.modelValue[1];
      emit("update:modelValue", [value, endDate]);
    };

    const onEndChange = (value: string) => {
      const firstDate = value || props.modelValue[0] ? props.modelValue[0] : null;
      emit("update:modelValue", [firstDate, value]);
    };

    return {
      startPickerOptions,
      endPickerOptions,
      onStartChange,
      onEndChange,
    };
  },
});
</script>
<style lang="scss">
.d-date-range-input {
  display: flex;
  align-items: center;
  @extend %pr-2;

  @media screen and (max-width: 780px) {
    margin-right: 0;
  }

  .el-input {
    margin-right: 0 !important;
  }

  .el-input__inner {
    padding: space(1) 0 space(1) space(2.5) !important;
  }

  .el-input__prefix {
    left: 4px;
  }

  .el-input__suffix {
    right: 0;
  }
}
</style>
