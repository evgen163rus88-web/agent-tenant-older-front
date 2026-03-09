<template>
  <div class="d-flex flex-wrap align-center">
    <b-icon class="mr-2 filters-mobile--icon">filter</b-icon>

    <el-input
      v-model.trim="filters.lastName"
      :placeholder="$t('clientFormValid.firstName')"
      autocomplete="off"
      style="width: 220px"
      @input="changeFilter"
      clearable
    />

    <el-input
      v-model.trim="filters.phone"
      :placeholder="$t('clientFormValid.phoneNumber')"
      autocomplete="off"
      style="width: 220px"
      @input="changeFilter"
      clearable
    />

    <el-input
      v-model.trim="filters.passportNumber"
      :placeholder="$t('clientFormValid.passportNumber')"
      autocomplete="off"
      style="width: 240px"
      @input="changeFilter"
      clearable
    />

    <el-form-item :label="$t('clientFormValid.justActive')" style="margin-bottom: 0">
      <el-switch
        v-model="filters.isActive"
        inline-prompt
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-text="Y"
        inactive-text="N"
        @change="changeFilter"
      />
    </el-form-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { debounce } from "@/helpers";

export type FiltersCustomer = {
  lastName?: string;
  phone?: string;
  isActive?: boolean;
  passportNumber?: string;
};

export default defineComponent({
  setup(_, { emit }) {
    const filters = reactive<FiltersCustomer>({
      lastName: undefined,
      phone: undefined,
      isActive: true,
      passportNumber: undefined,
    });

    const changeFilter = debounce(() => {
      emit("search", filters);
    });

    return {
      filters,
      changeFilter,
    };
  },
});
</script>
