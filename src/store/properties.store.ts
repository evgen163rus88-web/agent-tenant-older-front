import { defineStore } from "pinia";
import { propertyApi, CreatePropertyDto } from "@/api";
import { useI18n } from "@/plugins";

export const usePropertiesStore = defineStore({
  id: "properties",
  state: () => ({
    properties: [] as CreatePropertyDto[],
    currentParentId: undefined as number | undefined,
  }),
  getters: {
    getPropertiesForSelect: (state) => {
      const i18n = useI18n();
      return state.properties.map((prop) => {
        const buildType = i18n.t(`typeProperty.${prop.type}`);

        return {
          id: prop.id,
          label: `${prop.name} (${buildType})`,
        };
      });
    },
    getCurrentParentId: (state) => state.currentParentId,
    getCurrentParentType: (state) => (id) => state.properties.find((prop) => prop.id === id)?.type,
  },
  actions: {
    async fetchProperties() {
      this.properties = (await propertyApi.getAllProperties()).data;
    },
    clearAll() {
      this.properties = [];
      this.currentParentId = undefined;
    },
  },
});
