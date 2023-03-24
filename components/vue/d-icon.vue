<template>
  <!-- 如果需要使用 fill 属性，需要在 svg 删除 fill -->
  <!-- 3.18 添加根元素，这样更加容易控制图标大小 -->
  <!-- 3.18 去除根元素，改用 porp 改变大小 -->
  <svg
    aria-hidden="true"
    class="icon"
    :style="{
      fontSize: size + 'px',
    }"
  >
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
    size?: number;
  }>(),
  {
    prefix: '#icon',
    size: 16,
  },
);

const symbolId = computed(() => `${prop.prefix}-${prop.name}`);
</script>
