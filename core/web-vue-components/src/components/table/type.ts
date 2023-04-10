import { PropType } from 'vue';
import { formProps } from 'element-plus';

import { FormItem, Span } from '../form/type';

export type ISearchItem = FormItem;
export type ISearchItems = ISearchItem[];
export interface SearchOptions {
  searchItems: ISearchItems;
  spans?: Span;
  gutter?: number;
  labelWidth?: typeof formProps.labelWidth;
  labelPosition?: typeof formProps.labelPosition;
  /*
   * 搜索按钮的位置
   * inline: 在表单之后
   * block: 换行, 在表单下面独占一行
   * right: 在表单右侧, 与表单同行, 若表单占满一行, 则搜索按钮换行
   */
  buttonPosition?: 'inline' | 'block' | 'right';
}

export const Props = {
  searchOptions: {
    type: Object as PropType<SearchOptions>,
  },
};
