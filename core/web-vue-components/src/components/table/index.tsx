import { defineComponent, ref, toRef } from 'vue';
import { ElButton } from 'element-plus';

import { Props } from './type';
import DForm from '../form/index';
export default defineComponent({
  name: 'DTable',
  props: Props,
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
    console.log(buttonSlotName);

    return () => (
      <div className="base-page-container">
        <div className="base-page--search">
          {slots.sar?.()}
          <DForm
            v-model={formModel}
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
                  <ElButton type="primary">查询</ElButton>
                  <ElButton>重置</ElButton>
                  {slots[`button-${buttonSlotName}`]?.()}
                </>
              ),
            }}
          </DForm>
        </div>
      </div>
    );
  },
});
