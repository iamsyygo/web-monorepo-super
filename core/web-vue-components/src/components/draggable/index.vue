<script setup lang="ts">
import draggable from 'vuedraggable';
import { ref } from 'vue';
import { DCaret } from '@element-plus/icons-vue';
import { ElIcon, ElCheckbox, ElButton } from 'element-plus';

const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
});

const _list = ref(
  props.list.map((item: any, index) => ({
    ...item,
    itemKey: item.prop + index,
    show: true,
  })),
);

const emits = defineEmits(['dragSubmit']);

const dragOptions = ref({
  animation: 200,
  group: 'description',
  disabled: false,
  class: 'drag-transition-container',
});

const drag = ref(false);

const handleClick = () => {
  const list = _list.value.filter((item) => item.show);
  emits('dragSubmit', list);
};
</script>

<template>
  <transition-group>
    <draggable
      item-key="itemKey"
      key="dragggable"
      v-model="_list"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element }">
        <li :key="element.itemKey">
          <el-checkbox
            v-model="element.show"
            :label="element.label"
            size="small"
          />
          <el-icon><DCaret size="10" /></el-icon>
        </li>
      </template>
    </draggable>
    <el-button type="primary" size="small" @click="handleClick"
      >确 认</el-button
    >
  </transition-group>
</template>

<style scoped lang="scss">
.drag-transition-container {
  color: #ccc;
  width: 200px;
  & > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f4f6f9;
    margin: 2px auto;
    padding: 3px 6px;
    border-radius: 3px;
    cursor: move;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    user-select: none;
  }
}
</style>
