import { TranslateResult } from "vue-i18n";
import { reactive, Ref } from "vue";
import { handleError } from "@/helpers/error-handling";

export interface PageState {
  title: Ref<string | TranslateResult> | TranslateResult | string;
  loading: boolean;
  errorMsg: TranslateResult | string;
  readonly load: (cb: () => Promise<void>) => void;
}

export function usePage(initialState?: Partial<Omit<PageState, "load">>) {
  const defaultState = {
    title: "AgentTenant",
    loading: true,
    errorMsg: "",
  };

  const mergedState = initialState ? Object.assign(defaultState, initialState) : defaultState;

  const state = reactive<PageState>({
    ...mergedState,
    load: async (cb) => {
      state.loading = true;
      try {
        await cb();
      } catch (e) {
        handleError(e as any, (msg) => {
          state.errorMsg = msg;
        });
      } finally {
        state.loading = false;
      }
    },
  });

  return state;
}
