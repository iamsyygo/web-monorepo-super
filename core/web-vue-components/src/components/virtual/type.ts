import { PropType } from 'vue';

export interface OptionProps {
  label: string;
  value: string;
  disabled?: boolean;
  children?: OptionProps[];
}

export const Props = {
  data: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  height: {
    type: Number,
    default: 300,
  },
  rowHeight: {
    type: Number,
    default: 50,
  },
  props: {
    type: Object as PropType<OptionProps>,
    default: () => ({
      label: 'label',
      value: 'value',
      disabled: 'disabled',
      children: 'children',
    }),
  },
};
