<template>
  <div class="d-flex flex-column ml-auto obj-actions">
    <el-button type="primary" circle size="large" class="mb-3" @click="dialogVisible = true">
      <b-icon>edit</b-icon>
    </el-button>
    <el-button v-if="isAdmin" type="danger" size="large" class="danger-obj-btn" @click="$emit('remove')" circle>
      <el-icon><Delete /></el-icon>
    </el-button>
  </div>

  <el-dialog
    v-model="dialogVisible"
    :title="$t('editApartament')"
    width="96%"
    :close-on-click-modal="false"
    destroy-on-close
    lock-scroll
    top="10vh"
  >
    <CreateObjectView is-edit @close="closed" :apartment="apartment" />
  </el-dialog>
</template>
<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { FoundApartamentDTO } from "@/api";
import { useUserStore } from "@/store/user.store";
import CreateObjectView from "@/views/create-apartment/CreateObjectView.vue";

export default defineComponent({
  components: { Delete, CreateObjectView },
  props: {
    apartment: {
      type: Object as PropType<FoundApartamentDTO>,
      required: true,
    },
  },
  setup(_, { emit }) {
    const dialogVisible = ref(false);
    const userStore = useUserStore();
    const isAdmin = computed(() => userStore.isAdmin);

    const closed = () => {
      dialogVisible.value = false;
      emit("refresh");
    };
    return {
      closed,
      isAdmin,
      dialogVisible,
    };
  },
});
</script>
