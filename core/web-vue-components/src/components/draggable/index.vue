<script setup lang="ts">
import draggable from 'vuedraggable';
import { ref } from 'vue';
import { DCaret } from '@element-plus/icons-vue';
import { ElIcon, ElCheckbox } from 'element-plus';

const message = [
  'vue.draggable',
  'draggable',
  'component',
  'for',
  'vue.js 2.0',
  'based',
  'on',
  'Sortablejs',
];

const list = ref(
  message.map((name, index) => {
    return { name, order: index + 1 };
  }),
);

const dragOptions = ref({
  animation: 200,
  group: 'description',
  disabled: false,
  class: 'drag-transition-container',
});

const drag = ref(false);
</script>

<template>
  <transition-group>
    <draggable
      item-key="name"
      key="dragggable"
      :list="list"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element }">
        <li :key="element.name">
          <el-checkbox
            v-model="element.name"
            :label="element.name"
            size="small"
          />
          <el-icon><DCaret size="10" /></el-icon>
        </li>
      </template>
    </draggable>
  </transition-group>
</template>

<style scoped lang="scss">
.drag-transition-container {
  width: 200px;
  & > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f4f6f9;
    margin: 3px auto;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: move;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);

    // 禁止用户选择
    user-select: none;
  }
}
</style>
