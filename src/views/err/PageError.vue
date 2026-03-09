<template>
  <b-page :state="page">
    <template #content>
      <div class="container d-flex justify-center">
        <b-card class="mt-8">
          <h1 class="err-header blue-semi-dark--text text-center headline">Oops…</h1>
          <p class="text-center w-100 title my-4">
            {{ $t(`pages.err-${purpose}`) }}
          </p>
          <div class="px-3">
            <img :src="`/img/${purpose}.png`" alt="" class="err-img mr-4" />
          </div>
        </b-card>
      </div>
    </template>
  </b-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "@/plugins";
import { usePage } from "@/components/_base/page/BPage";

export default defineComponent({
  props: {
    purpose: {
      type: String,
      required: true,
    },
  },
  setup() {
    const i18n = useI18n();
    const page = usePage();

    page.title = i18n.t("pages.pageerror");
    page.load(async () => {
      await Promise.resolve();
    });

    return {
      page,
    };
  },
});
</script>
<style lang="scss" scoped>
.err-header {
  line-height: 1.5em;
  font-weight: 300;
  margin: 0 0 20px;
}

.err-img {
  width: 100%;
  height: 300px;
  object-fit: contain;
}
</style>
