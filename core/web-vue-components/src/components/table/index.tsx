import { defineComponent, reactive, ref, toRef, toRefs, unref } from 'vue';
import TableConfigComponent from './tableConfig.vue';
import {
  ElTable,
  ElTableColumn,
  ElEmpty,
  ElPopover,
  ElIcon,
} from 'element-plus';
import { props, TableColumns, TableConfig } from './type';
import moduleCss from './index.module.scss';
import { SwitchFilled } from '@element-plus/icons-vue';

export default defineComponent({
  name: 'page-pro',
  props,
  setup(props, { slots, attrs, emit, expose }) {
    const Allcolumns = toRef(props, 'columns');
    const popoverRef = ref();
    enum Size {
      large = 14,
      small = 12,
      default = 14,
    }
    // 真正的列表 columns
    const columns = ref<TableColumns>([]);
    const tableConfig = reactive<TableConfig>({
      border: props.border,
      showOverflowTooltip: props.showOverflowTooltip,
      columns: [],
      size: props.size || 'default',
      stripe: true,
      highlightCurrentRow: false,
    });
    // 序号 or 多选
    // const restColumns = Allcolumns.value.filter((item) => item.type);

    // hadnle table config
    if (props.stateUniqueKey) {
      const _tableConfig = localStorage.getItem(props.stateUniqueKey);
      let _columns = [];
      if (_tableConfig) {
        // has cache use cache
        const config = JSON.parse(_tableConfig);
        Object.assign(tableConfig, config);
        _columns = tableConfig.columns.filter((item: any) => item.show);
      } else {
        // no cache reload columns
        _columns = Allcolumns.value.slice(0, props.defaultShowColumn);
        tableConfig.columns = Allcolumns.value.map((item, i) => {
          const show = i < props.defaultShowColumn;
          item.show = show;
          return item;
        });
      }
      columns.value = /*  restColumns.concat(_columns); */ _columns;
    } else {
      // no cache key use default
      columns.value = Allcolumns.value;
      tableConfig.columns = Allcolumns.value;
    }

    const handleConfigSubmit = (data: TableConfig) => {
      const _columns = data.columns;
      Object.assign(tableConfig, data);
      if (props.stateUniqueKey) {
        // columns.value = restColumns.concat(
        //   _columns.filter((item) => item.show),
        // );
        columns.value = _columns.filter((item) => item.show);
        localStorage.setItem(props.stateUniqueKey, JSON.stringify(tableConfig));
        return;
      }
      columns.value = _columns;
    };

    const handleConfigReset = () => {
      console.log(popoverRef);

      unref(popoverRef).hide?.();
      props.stateUniqueKey && localStorage.removeItem(props.stateUniqueKey);
      columns.value = Allcolumns.value.slice(0, props.defaultShowColumn);
      tableConfig.columns = Allcolumns.value.map((item, i) => {
        const show = i < props.defaultShowColumn;
        item.show = show;
        return item;
      });
      tableConfig.border = props.border;
      tableConfig.showOverflowTooltip = props.showOverflowTooltip;
      tableConfig.size = props.size || 'default';
      tableConfig.stripe = props.stripe;
      tableConfig.highlightCurrentRow = props.highlightCurrentRow;
    };

    return () => {
      const elTableColumns = columns.value.map((item) => {
        const columnSlots = {
          default: item.prop && slots[item.prop],
          header: slots.header,
        };
        const minWidth =
          item.minWidth ||
          (item.label && item.label.length * Size[tableConfig.size] + 50);

        return (
          <ElTableColumn
            key={item.prop}
            {...item}
            showOverflowTooltip={tableConfig.showOverflowTooltip}
            minWidth={minWidth}
          >
            {columnSlots}
          </ElTableColumn>
        );
      });

      const elTableSlots = {
        empty: () => slots.empty?.() || <ElEmpty description="暂无数据" />,
        append: () => slots.append?.(),
      };
      return (
        <div class={moduleCss['base-table-pro']}>
          <ElTable
            {...props}
            v-slots={elTableSlots}
            border={tableConfig.border}
            size={tableConfig.size}
            stripe={tableConfig.stripe}
            highlightCurrentRow={tableConfig.highlightCurrentRow}
          >
            {elTableColumns}
          </ElTable>

          <ElPopover
            v-if={props.stateUniqueKey}
            placement="right"
            ref={popoverRef}
            width={300}
            trigger="click"
            transition="config-popover"
          >
            {{
              reference: () => (
                <div class="table-pro-config-button">
                  <ElIcon size={18}>
                    <SwitchFilled />
                  </ElIcon>
                </div>
              ),
              default: () => {
                return (
                  <>
                    <h3>
                      表格配置
                      <span style="font-size: 12px; color: #999; margin-left: 5px;">
                        （可拖拽排序）
                      </span>
                    </h3>
                    <TableConfigComponent
                      tableConfig={tableConfig}
                      stateUniqueKey={props.stateUniqueKey}
                      onSubmit={handleConfigSubmit}
                      onReset={handleConfigReset}
                    />
                  </>
                );
              },
            }}
          </ElPopover>
        </div>
      );
    };
  },
});
