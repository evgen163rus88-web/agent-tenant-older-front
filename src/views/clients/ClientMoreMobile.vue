<template>
  <div class="d-flex flex-column mw-30-desk w-100 pl-1">
    <p class="paragraph fwb mb-05">{{ $t("listObj.basePhoneNumber") }}:</p>
    <a :href="`tel:${data.phone}`" class="primary-dark--text">
      <u>{{ phone(data.phone) }}</u>
    </a>
  </div>

  <div class="d-flex flex-column mw-30-desk w-100 pl-1">
    <p class="paragraph fwb mb-05">{{ $t("listObj.passportNumber") }}:</p>
    <p class="devil--text">{{ data.passportNumber }}</p>
  </div>

  <div class="d-flex flex-column mw-30-desk w-100 pl-1">
    <p class="paragraph fwb mb-05">email:</p>
    <p class="devil--text text-no-wrap">
      {{ data.email || "&mdash;" }}
    </p>
  </div>
</template>

<script lang="ts">
import { FoundCustomersDTO } from "@/api/openapi";
import { defineComponent, PropType } from "vue";
import { phone } from "@/helpers";
export default defineComponent({
  props: {
    data: {
      type: Object as PropType<FoundCustomersDTO>,
      required: true,
    },
  },
  setup() {
    return { phone };
  },
});
</script>
