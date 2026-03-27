<template>
  <vue-tel-input
    class="b-phone-input"
    ref="vueTelInput"
    :value="valueVueTel"
    :disabled="disabled"
    :style="{ width }"
    mode="international"
    :preferredCountries="['ru', 'ua', 'by', 'th', 'us']"
    :inputOptions="attrs"
    v-digitsonly:phone
    defaultCountry="ru"
    v-bind="$attrs"
    @validate="onInput"
  >
    <template v-for="(_, slot) of $slots" #[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </vue-tel-input>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch, onMounted, onBeforeUnmount, ComponentPublicInstance } from "vue";
import { queryInputElementInside, phone, omit, debounce, after } from "@/helpers/index";
import { VueTelInput } from "vue3-tel-input";

export default defineComponent({
  inheritAttrs: false,
  props: {
    emitInputAfter: {
      type: Number,
      default: 2,
    },
    isoCountry: String,
    modelValue: String,
    disabled: Boolean,
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const width = ctx.attrs.width;
    const valid = ref();
    const countryCode = ref();
    const isActivePasteEvent = ref(false);
    const isNeedChangePhone = ref(false);
    const valueVueTel = computed(() => props.modelValue ?? "");

    const vueTelInput = ref<ComponentPublicInstance<VueTelInput>>();

    const attrs = computed(() => ({
      autocomplete: "off",
      type: "tel",
      autoDefaultCountry: false,
      ...omit(ctx.attrs, ["onInput"]),
    }));

    // Fuck emitting after component init
    const emitInput = after(props.emitInputAfter, (args: any[]) => {
      ctx.emit("update:modelValue", args[0]);
    });

    // Fuck double input event  emitting.
    // First - simply input, second - formatted input.
    const onInput = debounce((phoneObj) => {
      let phoneFormatted = phoneObj.formatted;
      valid.value = phoneObj.valid;

      if (
        !isActivePasteEvent.value &&
        countryCode.value &&
        phoneObj.country &&
        countryCode.value !== phoneObj.country?.dialCode
      ) {
        phoneFormatted = `+${phoneObj.country.dialCode}`;
      }

      if (isNeedChangePhone.value) {
        const regex = new RegExp(/^[7|8|375|66]/, "i");
        let nationalNumber = phoneObj.nationalNumber ?? phoneObj.formatted;
        nationalNumber = nationalNumber.replace(/^[+][\d][\s]?[+]?[\d]?[\s]?/i, "").replace(regex, "");

        phoneFormatted = phone(`${phoneObj.country.dialCode}${nationalNumber}`);
      }

      countryCode.value = phoneObj.country?.dialCode;
      isActivePasteEvent.value = false;
      isNeedChangePhone.value = false;

      emitInput([phoneFormatted, phoneObj]);
    });

    const pasteHandler = (e: ClipboardEvent) => {
      const paste = e.clipboardData?.getData("text");
      const searchPattern = new RegExp(/^[+|8|7|\w]/);
      isActivePasteEvent.value = true;

      if (paste && searchPattern.test(paste)) {
        isNeedChangePhone.value = true;
      }
    };

    const runWatcher = (isoCountry?: string) => {
      if (isoCountry && !valid.value) {
        countryCode.value = isoCountry;
        vueTelInput.value.choose(isoCountry);
      }
    };

    onMounted(() => {
      const input = queryInputElementInside(vueTelInput.value?.$refs.input);
      input.addEventListener("paste", pasteHandler, false);

      // Код для кейсов когда код ISO сразу имеется в пропсе компонента
      if (props.emitInputAfter < 2) {
        runWatcher(props.isoCountry);
      }
    });

    onBeforeUnmount(() => {
      const input = queryInputElementInside(vueTelInput.value?.$refs.input);
      input.removeEventListener("paste", pasteHandler, false);
    });

    watch(
      () => props.isoCountry,
      (val) => {
        runWatcher(val);
      }
    );

    return {
      width,
      attrs,
      onInput,
      valueVueTel,
      vueTelInput,
    };
  },
});
</script>

<style lang="scss">
.b-phone-input {
  &.vue-tel-input {
    height: 40px;
    padding: 1px 0;
    border-radius: $radius-base;
    border: 1px solid color(primary);
    box-sizing: border-box;
    background: color(white);
    width: 100%;

    .vti__input {
      flex-grow: 10;
      max-width: none;
      background: transparent;
    }

    .vti__input::placeholder {
      color: color(black-0);
    }

    &.vue-tel-input:focus-within {
      color: inherit;
      background: color(white);
      box-shadow: none;
      border-color: color(black-0);
      border-radius: $radius-base;
    }

    .vti__dropdown {
      &.open {
        background: transparent;
      }

      &:hover,
      &:focus {
        background: rgba(45, 45, 45, 0.05);
      }

      &:active:not(.open) {
        background: color(grey);
      }
    }

    .vti__dropdown-list {
      border: none;
      border-radius: $radius-base;
      box-shadow: 0 2px 6px 0 color(black-0);
    }

    .vti__dropdown-item:active {
      background: color(white);
    }
  }

  &.disabled {
    border: transparent;
    background: color(gray-semi);
    color: color(devil);
  }
}
</style>
