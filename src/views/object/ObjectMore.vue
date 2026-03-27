<template>
  <div class="d-flex white obj-more--wrap">
    <div class="d-flex flex-mobile-wrap obj-more more-in-tables" v-loading="loading">
      <div class="image__list mr-5">
        <el-image v-if="apartment.photos?.length === 0">
          <template #error>
            <div class="image__slot">Нет фото</div>
          </template>
        </el-image>
        <el-image
          class="image__list--item"
          v-for="(url, i) in apartment.photos"
          :key="url"
          :src="resolveUrl(url).toString()"
          :preview-src-list="(resolveUrl(apartment.photos) as string[])"
          :initial-index="i"
          fit="cover"
        />
      </div>

      <div class="d-flex flex-column mr-7 mw-30-desk w-100">
        <p class="title mb-1">{{ $t("noties") }}:</p>

        <ol class="note-list mb-2">
          <li v-for="(note, index) in apartment.note" :key="`note${index}`" class="note-list__content">
            <template v-if="!showInputEditNote[index]">
              <span class="mr-4">
                {{ note }}
              </span>
              <el-button type="info" circle size="small" class="ml-auto" @click="showInputEditNote[index] = true">
                <b-icon>edit</b-icon>
              </el-button>
              <el-button type="info" circle size="small" @click="confirm(true, index)">
                <el-icon><Delete /></el-icon>
              </el-button>
            </template>

            <div v-else class="d-flex align-center">
              <el-input class="mr-2" v-model="notiesModel[index]" type="textarea" :rows="1" />
              <div class="d-flex justify-end">
                <el-button type="danger" circle size="small" @click="showInputEditNote[index] = false">
                  <el-icon><Close /></el-icon>
                </el-button>
                <el-button type="success" circle size="small" class="mr-1" @click="updateNoties">
                  <el-icon><Check /></el-icon>
                </el-button>
              </div>
            </div>
          </li>
        </ol>

        <div v-if="showInputAddNewNote" class="w-100">
          <el-input class="mb-2" v-model="note" size="large" type="textarea" :rows="2" />
          <div class="d-flex justify-end">
            <el-button type="danger" circle size="small" class="mr-3" @click="showInputAddNewNote = false">
              <el-icon><Close /></el-icon>
            </el-button>
            <el-button type="success" circle size="small" @click="updateNoties">
              <el-icon><Check /></el-icon>
            </el-button>
          </div>
        </div>

        <el-button v-show="!showInputAddNewNote" @click="showInputAddNewNote = true" type="info">
          {{ $t("addNote") }}
        </el-button>
      </div>

      <div class="d-flex flex-column mr-1 mw-30-desk pl-1">
        <div v-if="apartment.owner" class="mb-2">
          <p class="title">{{ $t("owner") }}:</p>
          <p>{{ apartment.owner }}</p>
        </div>

        <div class="d-flex align-center mb-2">
          <p class="title mr-2">{{ $t("isHaveKitchen") }}:</p>

          <el-tag size="small" :type="apartment.isKitchenAvailable ? 'success' : 'danger'" effect="dark">
            {{ $t(apartment.isKitchenAvailable ? "yes" : "no") }}
          </el-tag>
        </div>

        <div class="d-flex align-center mb-2">
          <p class="title mr-2">{{ $t("isWiFi") }}:</p>

          <el-tag size="small" :type="apartment.isWiFi ? 'success' : 'danger'" effect="dark">
            {{ $t(apartment.isWiFi ? "yes" : "no") }}
          </el-tag>
        </div>

        <p class="title mb-1">{{ $t("description") }}:</p>
        <p class="devil--text">{{ apartment.description || "&mdash;" }}</p>
      </div>

      <ObjectMobileFromGrid v-if="isMobile" :data="apartment" />
    </div>

    <ObjectActions v-if="showActions" :apartment="apartment" @remove="confirm()" @refresh="$emit('refresh')" />
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, computed, unref } from "vue";
import { Delete, Check, Close } from "@element-plus/icons-vue";
import { FoundApartamentDTO, basePath, apartamentsApi } from "@/api";
import { useUserStore } from "@/store/user.store";
import { useI18n } from "@/plugins";
import { ElMessageBox, ElMessage } from "element-plus";
import ObjectMobileFromGrid from "./ObjectMobileFromGrid.vue";
import ObjectActions from "./ObjectActions.vue";

export default defineComponent({
  components: {
    Delete,
    Check,
    Close,
    ObjectActions,
    ObjectMobileFromGrid,
  },
  props: {
    apartment: {
      type: Object as PropType<FoundApartamentDTO>,
      required: true,
    },
    mobileColumns: {
      type: Array as PropType<string[]>,
      required: true,
    },
    isMobile: Boolean,
  },
  setup(props, { emit }) {
    const i18n = useI18n();
    const note = ref();
    const loading = ref(false);
    const showInputAddNewNote = ref(false);
    const showInputEditNote = ref(props.apartment.note?.map(() => false) || []);
    const notiesModel = ref(props.apartment.note?.map((n) => n) || []);
    const userStore = useUserStore();
    const isAdmin = computed(() => userStore.isAdmin);
    const isManager = computed(() => userStore.isManager);
    const showActions = computed(() => unref(isManager) || unref(isAdmin));

    const resolveUrl = (photo?: string | string[]) => {
      if (!photo) return [];

      if (Array.isArray(photo)) {
        return photo.map((ph) => {
          return `${basePath}/upload-file/get/${ph}`;
        });
      }

      return `${basePath}/upload-file/get/${photo}`;
    };

    const confirm = (isNote?: boolean, index?: number) => {
      if (!isAdmin.value) {
        return;
      }

      ElMessageBox.confirm(i18n.t("confirmRemove"), i18n.t("warning"), {
        confirmButtonText: i18n.t("btns.ok"),
        cancelButtonText: i18n.t("btns.cancel"),
        type: "warning",
        draggable: true,
      })
        .then(async () => {
          if (isNote && index !== undefined) {
            notiesModel.value = notiesModel.value.filter((_, i) => i !== index);
            await updateNoties();
          } else {
            await apartamentsApi.removeApartmentById(String(props.apartment.id));
          }
          emit("refresh");

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

    const updateNoties = async () => {
      const noties = notiesModel.value as string[];
      try {
        loading.value = true;

        if (note.value && note.value.length) {
          noties.push(note.value);
          note.value = undefined;
        }

        await apartamentsApi.updateApartamentById(String(props.apartment.id), {
          note: noties,
        });
        emit("refresh");

        showInputEditNote.value = showInputEditNote.value.map(() => false);
        showInputAddNewNote.value = false;

        ElMessage({
          type: "success",
          message: i18n.t("dataSuccessUpdated"),
        });
      } catch (e) {
        ElMessage({
          type: "error",
          message: i18n.t("pageError"),
        });
      } finally {
        loading.value = false;
      }
    };

    return {
      note,
      basePath,
      loading,
      confirm,
      resolveUrl,
      updateNoties,
      showActions,
      showInputAddNewNote,
      showInputEditNote,
      notiesModel,
    };
  },
});
</script>
<style lang="scss">
.danger-obj-btn {
  margin-left: 0 !important;
}
.note-list {
  counter-reset: li;
  list-style: none;
  padding: 0;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);

  &__content {
    position: relative;
    display: flex;
    align-items: center;
    padding: 0.4em 0.4em 0.4em 2em;
    margin: 0.5em 0;
    background: color(gray-semi);
    color: color(dark);
    text-decoration: none;
    border-radius: 0.3em;
    transition: 0.5s ease-out;

    &:hover {
      background: #e9e4e0;
    }
    &:hover:before {
      transform: rotate(360deg);
    }
    &:before {
      content: counter(li);
      counter-increment: li;
      position: absolute;
      left: -1.3em;
      top: 50%;
      margin-top: -1.3em;
      background: #8fd4c1;
      height: 2em;
      width: 2em;
      line-height: 2em;
      border: 0.3em solid white;
      text-align: center;
      font-weight: bold;
      border-radius: 2em;
      transition: all 0.3s ease-out;
    }
  }
}

.obj-more {
  &--wrap {
    @extend %p-2;

    @media screen and (max-width: 780px) {
      padding: 0;
      padding-left: space(0.5);
    }
  }

  @media screen and (max-width: 780px) {
    .image__list {
      margin-right: 0;
      margin-bottom: space(3);
      width: 100%;

      &--item {
        width: 110px;
        height: 110px;
        margin-right: space(1);
      }
    }
  }
}
</style>
