import { defineComponent, ref, toRef, toRefs } from 'vue';
// import Draggable from 'vuedraggable';

import Draggable from '@/components/draggable/index.vue';
import { ElButton, ElTable, ElTableColumn, ElEmpty } from 'element-plus';
import { props } from './type';
import moduleCss from './index.module.scss';

export default defineComponent({
  name: 'page-pro',
  props,
  setup(props, { slots, attrs, emit, expose }) {
    const columns = toRef(props, 'columns');

    // const fields=columns.value.
    return () => {
      const elTableColumns = columns.value.map((item) => {
        const columnSlots = {
          default: item.prop && slots[item.prop],
          header: slots.header,
        };
        return (
          <ElTableColumn key={item.prop} {...item}>
            {columnSlots}
          </ElTableColumn>
        );
      });

      const elTableSlots = {
        empty: () => slots.empty?.() || <ElEmpty description="暂无数据" />,
        append: () => slots.append?.(),
      };
      const options = {
        animation: 0,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      };
      return (
        <div class={moduleCss['base-table-pro']}>
          <ElTable {...props} v-slots={elTableSlots}>
            {elTableColumns}
          </ElTable>
          <Draggable></Draggable>
        </div>
      );
    };
  },
});
