<template>
  <el-descriptions direction="vertical" :column="1" border>
    <template v-for="(info, i) of labels" :key="`data-${i}`">
      <el-descriptions-item v-if="mobileMore[info.prop] && String(mobileMore[info.prop]).length" :label="info.label">
        <p>{{ parser(mobileMore[info.prop]) }}</p>
      </el-descriptions-item>
    </template>
  </el-descriptions>

  <div class="d-flex mt-2 px-3" :class="`justify-${onlyEdit ? 'end' : 'between'}`">
    <el-button type="primary" circle @click="$emit('edit')">
      <b-icon icon="edit" />
    </el-button>
    <el-button v-if="!onlyEdit && (isManager || isAdmin)" type="danger" circle @click="$emit('remove')">
      <b-icon icon="delete" />
    </el-button>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, PropType } from "vue";
import {
  CreateBillsIncomeDto,
  CreateBillsExpenseDto,
  BaseEntityShema,
  CustomerForBills,
  CreateCommunalFront,
} from "@/api/openapi";
import { Headers } from "@/components/_base/grid/BGrid";
import { useUserStore } from "@/store/user.store";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function checkInterface(arg: any): arg is BaseEntityShema[] {
  return arg[0].name !== undefined;
}

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<CreateBillsExpenseDto | CreateBillsIncomeDto | CreateCommunalFront>,
      requried: true,
    },
    labels: {
      type: Array as PropType<Headers[]>,
      requried: true,
    },
    mobileColumns: {
      type: Array as PropType<string[]>,
      requried: true,
    },
    onlyEdit: Boolean,
  },
  setup(props) {
    const userStore = useUserStore();
    const isAdmin = computed(() => userStore.isAdmin);
    const isManager = computed(() => userStore.isManager);
    const mobileMore = computed(() => {
      const info = Object.create(null);

      for (const key in props.data) {
        if (Object.prototype.hasOwnProperty.call(props.data, key) && !props.mobileColumns?.includes(key)) {
          info[key] = props.data[key];
        }
      }

      return info;
    });

    const parser = (val: BaseEntityShema[] | CustomerForBills[] | string | number) => {
      if (Array.isArray(val) && checkInterface(val)) {
        return val[0].name;
      }

      if (Array.isArray(val)) {
        return val[0].firstName + " " + val[0].lastName;
      }

      if (dayjs(val).isValid() && val.toString().length > 7) {
        return dayjs(val).format("LLL");
      }

      return val;
    };

    return { mobileMore, parser, isAdmin, isManager };
  },
});
</script>
