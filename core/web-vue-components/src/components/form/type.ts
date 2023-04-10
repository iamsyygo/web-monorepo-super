import {
  FormItemProps,
  ColProps,
  FormInstance,
  formProps,
  formEmits,
} from 'element-plus';
import type { ExtractPropTypes, PropType } from 'vue';

// 日期的类型
export type IDatePickerType =
  | 'year'
  | 'month'
  | 'date'
  | 'dates'
  | 'week'
  | 'datetime'
  | 'datetimerange'
  | 'daterange'
  | 'monthrange';

// 表单的类型
export type formType =
  | 'input'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'switch'
  | IDatePickerType;

// 表单的配置, 如 select、radio、checkbox 类型的就需要
export interface IFormOptions {
  label: string;
  value: string | number;
}

export type Span = Pick<ColProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'> | number;
export type buttonPosition = 'inline' | 'block' | 'right';

export interface FormItem extends Partial<FormItemProps> {
  prop?: string;
  label?: string;
  placeholder?: string;
  type?: formType; // slot > type
  defaultValue?: any;
  span?: Span; // 对象或者数字
  options?: IFormOptions[];
  hidden?: boolean;
  labelWidth?: number;
}

export type FormItems = FormItem[];

export const Props = {
  ...formProps,
  gutter: {
    type: Number,
    default: 10,
  },
  formItems: {
    type: Array as PropType<FormItem[]>,
    default: () => [],
    // required: true,
  },
  spans: {
    type: [Object, Number] as PropType<Span>,
    default: () => ({ xs: 24, sm: 24, md: 24, lg: 24, xl: 24 }),
  },
  modelValue: {
    type: Object,
    default: () => ({}),
  },
  // 是否渲染表单项
  renderFormItem: {
    type: Function as PropType<(item: FormItem, model: any) => boolean>,
  },
  required: Boolean,
  // buttonPosition: {
  //   type: String as PropType<buttonPosition>,
  //   default: 'block',
  // },
};

export const DFormEmits = {
  ...formEmits,
  // eslint-disable-next-line
  'update:modelValue': (model: any): boolean => true,
};
