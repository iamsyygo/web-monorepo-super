<script setup lang="ts">
import draggable from 'vuedraggable';
import { PropType, ref } from 'vue';
import { DCaret } from '@element-plus/icons-vue';
import { ElIcon, ElCheckbox } from 'element-plus';

interface Item {
  label?: string;
  prop?: string;
  [key: string]: any;
}
const props = defineProps({
  list: {
    type: Array as PropType<Item[]>,
    default: () => [],
  },
  tickable: {
    type: Boolean,
    default: false,
  },
});

const _list = ref(props.list);

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
      item-key="prop"
      key="dragggable"
      v-model="_list"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{ element }">
        <li :key="element.prop" v-if="!element.type">
          <el-checkbox
            v-if="tickable"
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
    padding: 2px 6px;
    border-radius: 3px;
    cursor: move;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
    user-select: none;

    & span {
      color: #636363;
    }
  }
}
</style>
