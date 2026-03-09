import { App } from "vue";

export function registerComponents(app: App) {
  const requireComponent = require.context("@/components/_base", true, /\w+\.vue$/);

  requireComponent.keys().forEach((fileName) => {
    const componentName = fileName
      .split("/")
      .pop()!
      .replace(/\.\w+$/, "");
    const componentConfig = requireComponent(fileName);

    app.component(componentName, componentConfig.default || componentConfig);
  });
}
