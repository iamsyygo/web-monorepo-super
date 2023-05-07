import { ExtractPropTypes, PropType } from 'vue';
import { TableColumnCtx } from 'element-plus';

import tableProps from 'element-plus/lib/components/table/src/table/defaults.js';

export type DataItem = Record<string, any>;
export interface TableItem_prop extends Partial<TableColumnCtx<DataItem>> {
  //  总是显示，不受控制
  alwaysDisplay?: boolean;
  type?: string;
  prop: string;
  [key: string]: any;

  // 含有 type 字段无需 prop 反之必填，为了 使 prop 在 type 不存在时也必填
}

export interface TableItem_type extends Partial<TableColumnCtx<DataItem>> {
  //  总是显示，不受控制
  // alwaysDisplay?: boolean;
  type: string;
  prop?: string;
  [key: string]: any;
}

export type TableItem = TableItem_prop | TableItem_type;

export type TableColumns = TableItem[];

export const props = {
  ...tableProps,
  columns: {
    type: Array as PropType<TableColumns>,
    default: () => [],
  },
  // 优先级低于 columns
  showOverflowTooltip: {
    type: Boolean,
  },
  // 表格配置缓存key
  stateUniqueKey: {
    type: String,
  },
  // 优先级低于 columns
  sortable: {
    type: Boolean,
    default: false,
  },

  // 默认显示多少列
  defaultShowColumn: {
    type: Number,
    default: 6,
  },
};

export interface TableConfig {
  border: boolean;
  showOverflowTooltip: boolean;
  columns: TableColumns;
  size: 'large' | 'small' | 'default';
  stripe: boolean;
  highlightCurrentRow: boolean;
}
