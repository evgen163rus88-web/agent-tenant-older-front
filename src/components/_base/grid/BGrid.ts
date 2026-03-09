export type DataGridItem = {
  [key: string]: any;
};
export interface Headers {
  prop: string;
  label?: string;
  className?: string;
  classNameHeader?: string;
  width?: string;
  minmax?: string[];
  isDate?: boolean;
  formatDate?: string;
  formatter?: (item: string | number | Date, row: DataGridItem) => any;
}

export interface SubheaderContent {
  title: string;
  className?: string;
  textPosition: "center" | "left" | "right";
}
