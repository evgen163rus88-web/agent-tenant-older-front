import { DirectiveBinding } from "vue";
import { parsePhoneNumberFromString, NumberFormat } from "libphonenumber-js";

type CompareInput = string | Date | undefined;

export const isEmpty = (target: any): boolean => {
  return target !== null && typeof target === "object" && !Array.isArray(target) && Object.keys(target).length === 0;
};

export function getNumCharacters(v: any, binding?: DirectiveBinding) {
  if (binding?.arg === "chaining") {
    return String(v)
      .replace(/\./g, ",")
      .replace(/[^\d,\s]+/gi, "");
  }

  if (binding?.arg === "withdash") {
    return String(v).replace(/[^\d-]+/gi, "");
  }

  const regex = new RegExp(binding?.arg === "phone" ? /([+]?[\d\s-]+)/ : /[^\d]/, "gi");

  return binding?.arg === "phone" ? String(v).match(regex)?.join("").trim() || "" : String(v).replace(regex, "").trim();
}

export function queryInputElementInside(el: any): HTMLInputElement {
  return el instanceof HTMLInputElement ? el : el.querySelector("input") || el;
}

export function toNumber(val: any) {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
}

export type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

export function createObjectURL(file: Blob | MediaSource) {
  if (window.webkitURL) {
    return window.webkitURL.createObjectURL(file);
  } else if (window.URL && window.URL.createObjectURL) {
    return window.URL.createObjectURL(file);
  } else {
    return null;
  }
}

export const omit = <T, K extends keyof T>(obj: T, props: K[]): Omit<T, K> => {
  obj = { ...obj };

  props.forEach((prop) => delete obj[prop]);

  return obj;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce(func: Function, timeout = 333) {
  let timer: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function after(n: number, func: Function) {
  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }

  n = n || 0;
  return function (...args: any[]) {
    if (--n < 1) {
      return func.apply(this, args);
    }
  };
}

export function phone(v: string | number, format?: NumberFormat) {
  const phoneNumber = v && parsePhoneNumberFromString("+" + v);
  if (!phoneNumber) return v;
  if (format) {
    return phoneNumber.format(format);
  }
  return phoneNumber.format("INTERNATIONAL");
}

export function compareAndRotateDates(dates: CompareInput[]): CompareInput[] {
  const [firstDate, endDate] = dates;

  if (firstDate && endDate && dayjs(firstDate).isAfter(dayjs(endDate))) {
    return [endDate, firstDate];
  }

  return dates;
}
