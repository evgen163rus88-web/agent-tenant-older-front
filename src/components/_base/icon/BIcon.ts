export enum SizeEnum {
  MEDIUM = "medium",
  LARGE = "large",
  "X-LARGE" = "x-large",
}
export const sizeValidator = (v: string): boolean => v.toUpperCase() in SizeEnum;

export const getSvgIcon = (iconName: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require("@/assets/icons/" + iconName + "?raw");
};
