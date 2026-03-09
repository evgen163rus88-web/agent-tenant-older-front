<template>
  <b-page :state="page">
    <template #content>
      <h1>{{ $t("properties") }}</h1>
      <el-divider />

      <div class="d-flex prop-box__parent">
        <el-card v-for="obj in properties" :key="obj.id" shadow="hover" class="prop-box">
          <template #header>
            <div class="prop-box__header">
              <span>{{ obj.name }}</span>
              <el-button class="prop-box__button" text @click="closeOpen(true, obj)">
                <b-icon>building-cog-outline</b-icon>
              </el-button>
              <el-button class="button" text @click="confirm(obj.id, obj.name)">
                <b-icon>delete</b-icon>
              </el-button>
            </div>
          </template>

          <ul class="prop-box__list">
            <li>
              <b>{{ $t("fields.address") }}:</b> {{ obj.address }}
            </li>
            <li>
              <b>{{ $t("fields.typeProp") }}:</b> {{ $t(`typeProperty.${obj.type}`) }}
            </li>
            <li>
              <b>{{ $t("description") }}:</b> {{ obj.description || "&mdash;" }}
            </li>
            <li>
              <b>{{ $t("fields.created") }}:</b> {{ $dayjs(obj.createdAt).format("L") }}
            </li>
            <li>
              <b>{{ $t("fields.updated") }}:</b> {{ $dayjs(obj.updatedAt).format("LLL") }}
            </li>
          </ul>
        </el-card>

        <el-card shadow="hover" class="prop-box--add" @click="dialogVisible = true">
          <b-icon size="x-large">cross</b-icon>
        </el-card>
      </div>
    </template>
  </b-page>

  <el-dialog
    v-model="dialogVisible"
    :title="titleModal"
    :width="isMobile ? '100%' : '50%'"
    :close-on-click-modal="false"
    destroy-on-close
    lock-scroll
    @closed="property = undefined"
  >
    <PropertyForm @close="closeOpen" :property="property" :isEdit="showEdit" />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { usePage } from "@/components/_base/page/BPage";
import PropertyForm from "./PropertyForm.vue";
import { propertyApi, CreatePropertyDto } from "@/api";
import { useI18n } from "@/plugins";
import { ElMessage, ElMessageBox } from "element-plus";
import { useLayoutsStore } from "@/store/layouts.store";

export default defineComponent({
  components: { PropertyForm },
  setup() {
    const i18n = useI18n();
    const layoutsStore = useLayoutsStore();
    const dialogVisible = ref(false);
    const showEdit = ref(false);
    const property = ref<Partial<CreatePropertyDto>>();
    const page = usePage();
    const properties = ref<CreatePropertyDto[]>([]);

    const isMobile = computed(() => layoutsStore.isMobileScreen);
    const titleModal = computed(() => i18n.t(showEdit.value ? "editObject" : "addObject"));

    const loadDataProperties = async () => {
      properties.value = (await propertyApi.getAllProperties()).data;
    };

    page.title = i18n.t("pages.properties");
    page.load(async () => {
      await loadDataProperties();
    });

    const closeOpen = async (bool = false, prop?: Partial<CreatePropertyDto>) => {
      if (showEdit.value) {
        await loadDataProperties();
      }

      dialogVisible.value = bool;
      showEdit.value = bool;

      property.value = bool ? prop : undefined;
    };

    const confirm = (id, name) => {
      ElMessageBox.confirm(i18n.t("confirmRemoveSub", { subject: name }), i18n.t("warning"), {
        confirmButtonText: i18n.t("btns.ok"),
        cancelButtonText: i18n.t("btns.cancel"),
        type: "warning",
        draggable: true,
      })
        .then(async () => {
          await propertyApi.removePropertyById(id);
          await loadDataProperties();

          ElMessage({
            type: "success",
            message: i18n.t("deleteCompleted"),
          });
        })
        .catch(() => {
          ElMessage({
            type: "info",
            message: i18n.t("deleteCancel"),
          });
        });
    };

    return {
      page,
      dialogVisible,
      properties,
      titleModal,
      showEdit,
      closeOpen,
      property,
      confirm,
      isMobile,
    };
  },
});
</script>
<style lang="scss">
.prop-box {
  margin-right: space(2);
  margin-bottom: space(2);
  width: 470px;

  &__header {
    display: flex;
    align-items: center;

    span {
      margin-right: auto;
    }
  }

  &--add {
    margin-bottom: space(2);

    .el-card__body {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }

  &__list {
    font-size: fontSize(paragraph);
    li {
      margin-bottom: space(1);
    }
  }

  &__parent {
    flex-wrap: wrap;
  }
}
</style>
