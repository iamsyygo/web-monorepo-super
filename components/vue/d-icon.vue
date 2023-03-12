<template>
  <!-- 如果需要使用 fill 属性，需要在 svg 删除 fill -->
  <svg aria-hidden="true">
    <use :href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
const prop = withDefaults(
  defineProps<{
    name: string;
    prefix?: string;
    color?: string;
  }>(),
  {
    prefix: '#icon',
  },
);

const symbolId = computed(() => `${prop.prefix}-${prop.name}`);
console.log(symbolId, 'symbolId');
</script>

<style scoped></style>
