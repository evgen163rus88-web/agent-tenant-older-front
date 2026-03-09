<template>
  <div class="objects-ex__wrap" v-if="source.length > 0">
    <div v-loading="loading" class="objects-ex w-100 mb-2" v-for="obj in source" :key="obj.id">
      <div class="p-2">
        <p class="d-flex align-center title fwb mb-2">
          <b-icon class="mt-05 mr-1" size="large">modern-building</b-icon>
          <span>
            {{ getApart(obj.apartamentId).parent }}
          </span>
          <span class="mx-1">&rAarr;</span>
          <b-icon class="mt-05 mr-1">bed</b-icon>
          <span class="blue--text">
            {{ getApart(obj.apartamentId).name }}
          </span>
        </p>
        <p class="paragraph mb-1 text-wrap">
          <span>{{ $t("type") }}:</span>
          {{ $t(`typeProperty.${getApart(obj.apartamentId).type}`) }}
        </p>
        <p class="paragraph text-wrap mb-2">
          {{ getApart(obj.apartamentId).description || "&mdash;" }}
        </p>

        <el-tag effect="plain" round class="p-2 justify-self-end">
          <span class="fwb">{{ $t("period") }}: </span>
          <span class="bg-light--text">
            {{
              $t("periodBooking", {
                from: $dayjs(obj.periodFrom).format("LL"),
                to: $dayjs(obj.periodTo).format("LL"),
              })
            }}
          </span>
        </el-tag>
      </div>
    </div>
  </div>

  <el-empty v-loading="loading" v-else />
</template>

<script lang="ts">
import { defineComponent, ref, PropType, onMounted } from "vue";
import { ExpiringLeasesRes, apartamentsApi, FoundApartamentDTO, basePath } from "@/api";

export default defineComponent({
  props: {
    source: {
      type: Array as PropType<ExpiringLeasesRes[]>,
      required: true,
    },
  },
  setup(props) {
    const apartaments = ref<FoundApartamentDTO[]>([]);
    const loading = ref(false);

    onMounted(async () => {
      if (props.source.length) {
        loading.value = true;
        try {
          apartaments.value = (
            await apartamentsApi.findManyByIds({ ids: props.source.map((s) => s.apartamentId) })
          ).data;
        } finally {
          loading.value = false;
        }
      }
    });

    const getApart = (id: number): FoundApartamentDTO => {
      return apartaments.value.find((ap) => ap.id === id) || ({} as FoundApartamentDTO);
    };

    return {
      basePath,
      loading,
      getApart,
      apartaments,
    };
  },
});
</script>
<style lang="scss">
.objects-ex {
  display: flex;
  border: 1px solid color(gray-before);
  border-radius: space(1);
  border-right: 4px solid color(gray);
  overflow: hidden;

  &:last-child {
    margin-bottom: 0 !important;
  }

  &__img {
    height: 100%;
    width: 200px;
    object-fit: contain;
    border-right: 1px solid color(gray-before);
  }

  &__wrap {
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 780px) {
    .el-tag {
      word-wrap: break-word;
      white-space: break-spaces;
      line-height: 1.4em;
      padding: space(3);
    }
  }
}
</style>
