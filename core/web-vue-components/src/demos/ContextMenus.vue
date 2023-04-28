<template>
  <ContextMenus :menus="menus" @select="handleSelect">
    <div class="demo-context-menu">{{ label }}</div>
  </ContextMenus>
</template>

<script setup lang="ts">
import ContextMenus from '@/components/context-menu/index.vue';
import { ref } from 'vue';
const label = ref('');
const handleSelect = (item: any, evt: MouseEvent) => {
  label.value = item.label;
};
const menus = [
  {
    label: '复制',
    command: 'copy',
  },
  {
    label: '粘贴',
    command: 'paste',
  },
  {
    label: '剪切',
    command: 'cut',
  },
  {
    label: '删除',
    command: 'delete',
  },
  {
    label: '撤销',
    command: 'undo',
  },
  {
    label: '重做',
    command: 'redo',
  },
];
</script>

<style scoped lang="scss">
.demo-context-menu {
  width: 100%;
  height: 90vh;
  background-color: antiquewhite;
}
</style>
