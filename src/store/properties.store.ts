import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { propertyApi, CreatePropertyDto } from "@/api";
import i18n from "@/plugins/i18n";

export const usePropertiesStore = defineStore("properties", () => {
  const properties = ref<CreatePropertyDto[]>([]);
  const currentParentId = ref<number | undefined>(undefined);

  const getPropertiesForSelect = computed(() => {
    return properties.value.map((prop) => {
      const buildType = i18n.global.t(`typeProperty.${prop.type}`);

      return {
        id: prop.id,
        label: `${prop.name} (${buildType})`,
      };
    });
  });

  const getCurrentParentId = computed(() => currentParentId.value);

  const getCurrentParentType = (id: number) => {
    return properties.value.find((prop) => prop.id === id)?.type;
  };

  async function fetchProperties() {
    properties.value = (await propertyApi.getAllProperties()).data;
  }

  function clearAll() {
    properties.value = [];
    currentParentId.value = undefined;
  }

  return {
    properties,
    currentParentId,
    getPropertiesForSelect,
    getCurrentParentId,
    getCurrentParentType,
    fetchProperties,
    clearAll,
  };
});
