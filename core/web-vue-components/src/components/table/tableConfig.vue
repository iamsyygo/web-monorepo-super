<template>
  <div>
    <div>
      <div class="config-broder-tooltip--container">
        <div>
          表格边框
          <el-switch
            v-model="data.border"
            :active-value="true"
            :inactive-value="false"
          >
          </el-switch>
        </div>
        <div>
          字段内容优化
          <el-switch
            v-model="data.showOverflowTooltip"
            :active-value="true"
            :inactive-value="false"
          >
          </el-switch>
        </div>
        <div>
          斑马纹
          <el-switch
            v-model="data.stripe"
            :active-value="true"
            :inactive-value="false"
          >
          </el-switch>
        </div>
        <div>
          高亮当前行
          <el-switch
            v-model="data.highlightCurrentRow"
            :active-value="true"
            :inactive-value="false"
          >
          </el-switch>
        </div>
        <div>
          排版
          <el-radio-group v-model="data.size" size="small">
            <el-radio-button
              v-for="item in layItems"
              :key="item.value"
              :label="item.value"
              >{{ item.label }}</el-radio-button
            >
          </el-radio-group>
        </div>
      </div>

      <transition-group>
        <draggable
          item-key="prop"
          key="dragggable"
          v-model="data.columns"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
        >
          <template #item="{ element }">
            <li :key="element.prop" v-if="!element.type">
              <el-checkbox
                v-if="!!props.stateUniqueKey"
                v-model="element.show"
                :label="element.label"
                size="small"
              />
              <span v-else>{{ element.label }}</span>
              <el-icon><DCaret size="10" /></el-icon>
            </li>
          </template>
        </draggable>
      </transition-group>
    </div>

    <div class="button-config-active">
      <el-button type="primary" size="small" @click="handleSubmit"
        >确 认</el-button
      >
      <el-button size="small" @click="handleReset">重置配置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import { DCaret } from '@element-plus/icons-vue';
import {
  ElIcon,
  ElCheckbox,
  ElButton,
  ElSwitch,
  ElRadioGroup,
  ElRadioButton,
} from 'element-plus';
import { PropType, nextTick, reactive, ref, unref } from 'vue';
import { TableConfig } from './type';

const layItems = [
  {
    label: '默认',
    value: 'default',
  },
  {
    label: '紧凑',
    value: 'small',
  },
  {
    label: '宽松',
    value: 'large',
  },
];

const props = defineProps({
  stateUniqueKey: {
    type: String,
  },
  tableConfig: {
    type: Object as PropType<TableConfig>,
    default: () => ({}),
  },
});

const emits = defineEmits(['submit', 'reset']);
const config = unref(props.tableConfig);

const data = ref({ ...config });

const dragOptions = ref({
  animation: 500,
  group: 'description',
  disabled: false,
  class: 'drag-transition-container',
});

const drag = ref(false);

const handleSubmit = () => {
  emits('submit', data.value);
};

const handleReset = () => {
  emits('reset');
  nextTick(() => {
    data.value = { ...config };
  });
  // Object.assign(data, config);
  // data.value = { ...config }; // 注意直接赋值会将data.value的引用指向新的对象，导致无法响应式更新
};
</script>
<style scoped lang="scss">
.button-config-active {
  text-align: right;
  margin-top: 5px;
}
.drag-transition-container {
  max-height: 300px;
  overflow: auto;
  color: #ccc;
  & > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #eff1f2;
    margin: 3px auto;
    padding: 2px 6px;
    border-radius: 3px;
    cursor: move;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.22);
    user-select: none;

    & span {
      color: #636363;
    }
  }
}

.config-broder-tooltip--container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  div {
    vertical-align: middle;
    margin-bottom: 3px;
  }
}
</style>
