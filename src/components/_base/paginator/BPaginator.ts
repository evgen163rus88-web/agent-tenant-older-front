import { computed, reactive, Ref, ref } from "vue";
import { AxiosPromise } from "axios";

interface Pagination {
  limit: number;
  offset: number;
  totalCount?: number;
}

export type PaginatorState = Readonly<ReturnType<typeof usePaginator>>;

interface ApiResponse<T = any> extends AxiosPromise {
  data?: T[];
  orders?: T[];
  count?: number;
  pagination?: Partial<Pagination>;
}
interface ApiCb<T = any> {
  (pagination: Omit<Pagination, "totalCount">): ApiResponse<T>;
}

interface UsePaginatorArg<T = any, U = T> {
  api: ApiCb<U>;
  binding: Ref<T[]>;
  initPagination?: Pagination;
  fieldData?: string;
}

export function usePaginator<T, U = T>(arg: UsePaginatorArg<T, U>) {
  const { api, binding, initPagination } = arg;
  const lengthData = ref<number | undefined>(0);

  const defaultPagination: Pagination = {
    limit: 12,
    offset: 0,
  };

  const pagination = reactive({ ...defaultPagination, ...initPagination });
  const hidden = computed(() => Boolean(!lengthData.value) || lengthData.value! < pagination.limit);

  const getData = async (reqPagination?: Pick<Pagination, "limit" | "offset">) => {
    let newPagination = { ...defaultPagination, ...initPagination };

    if (reqPagination) {
      newPagination = { ...newPagination, ...reqPagination };
    }

    Object.assign(pagination, { ...newPagination, ...reqPagination });

    const res = (await api(pagination)).data;
    lengthData.value = res?.length;

    if (res.pagination?.totalCount || res.count) {
      pagination.totalCount = res.pagination ? res.pagination.totalCount : res.count;
    }

    binding.value = res || [];
  };

  const showMore = async () => {
    pagination.offset++;

    const res = (await api(pagination)).data;

    lengthData.value = res?.length;

    if (res?.length) {
      binding.value = binding.value.concat(res);
    }
  };

  return {
    pagination,
    binding,
    getData,
    showMore,
    hidden,
  };
}
