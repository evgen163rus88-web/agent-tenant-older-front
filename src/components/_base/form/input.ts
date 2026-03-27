import { ElInput } from "element-plus";
import { computed, getCurrentInstance, onMounted, PropType, Ref, ref, SetupContext, watch } from "vue";

export const inputProps = {
  modelValue: {
    type: [String, Number, Object, Array] as PropType<string | string[] | number | Record<string, unknown>>,
    default: null,
  },
  width: {
    type: [String, Number] as PropType<string | number>,
    required: false,
  },
};

export type UnwrapInputProps = { modelValue: any | null; width?: string | number };

export type FormatFunction = <T>(args: T) => string | null;

export type CInputInstance = {
  focus: () => void;
  input: Ref<InstanceType<typeof ElInput>>;
};

type InputOptions<P> = {
  props: P;
  ctx: SetupContext<Record<string, any>>;
  format?: FormatFunction;
  parse?: (val: string | null) => string | null;
};

export function useWidth(props: Record<string, unknown> & { width?: string | number }) {
  return computed(() => (props.width ? props.width + "px" : "100%"));
}

export function useInput(options: InputOptions<UnwrapInputProps>) {
  const inputRef = ref<InstanceType<typeof ElInput>>();
  const currentValue = ref<any>();
  const instance = getCurrentInstance()!;
  const { props, format, parse } = options;

  const formatValue = (args: any[]) => (format ? format(args) : args[0]);
  const parseValue = (value: any) => (parse ? parse(value) : value);
  const onInput = (...args: any) => {
    currentValue.value = args[0];
    instance.emit("update:modelValue", formatValue(args));
  };
  const onChange = (...args: any) => {
    currentValue.value = args[0];
    instance.emit("change", formatValue(args));
  };
  const focus = () => {
    inputRef.value?.focus();
  };
  onMounted(() => {
    currentValue.value = parseValue(props.modelValue);
  });
  watch(
    () => props.modelValue,
    (value) => {
      currentValue.value = parseValue(value);
    }
  );

  options.ctx.expose({ input: inputRef, focus } as CInputInstance);

  return {
    currentValue,
    onInput,
    onChange,
    getWidth: computed(() => (props.width ? props.width + "px" : "100%")),
    inputRef,
  };
}
