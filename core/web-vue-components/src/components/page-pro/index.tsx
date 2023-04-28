import { defineComponent, ref, toRef } from 'vue';
import { ElButton } from 'element-plus';

import { props } from './type';
import DForm from '../form/index';
import moduleCss from './index.module.scss';
console.log(moduleCss);

export default defineComponent({
  name: 'page-pro',
  props,
  setup(props, { slots, attrs, emit, expose }) {
    const searchOptions = toRef(props, 'searchOptions');
    // 生成查询模型数据
    const searchFormModel =
      searchOptions.value?.searchItems.reduce((acc, cur) => {
        if (cur.prop) acc[cur.prop] = cur.defaultValue;
        return acc;
      }, {} as Record<string, any>) || {};

    const formModel = ref(searchFormModel);
    // 查询按钮位置
    const buttonSlotName = searchOptions.value?.buttonPosition || 'inline';

    const handleReset = () => {
      console.log(999);

      formModel.value = searchFormModel;
    };

    return () => (
      <div className="base-page-container">
        <div className="base-page--search">
          {slots['search-header']?.({ model: formModel.value })}
          <DForm
            v-model={formModel.value}
            class={moduleCss['base-page--search-form']}
            label-width={searchOptions.value?.labelWidth || 80}
            label-position={searchOptions.value?.labelPosition || 'right'}
            spans={
              searchOptions.value?.spans || {
                xs: 24,
                sm: 12,
                md: 8,
                lg: 6,
                xl: 6,
              }
            }
            form-items={searchOptions.value?.searchItems}
          >
            {{
              [`button-${buttonSlotName}`]: () => (
                <>
                  <ElButton type="primary">查 询</ElButton>
                  <ElButton onClick={handleReset}>重 置</ElButton>
                  {/* 附加的按钮 */}
                  {slots[`button-${buttonSlotName}`]?.({
                    model: formModel.value,
                  })}
                </>
              ),
            }}
          </DForm>
          {slots['search-footer']?.({ model: formModel.value })}
        </div>
      </div>
    );
  },
});
