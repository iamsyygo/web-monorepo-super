<template>
  <div>
    <Virtual :data="data" :height="500" :row-height="50">
      <template #default="{ item, index }"> {{ item }}-{{ index }}</template>
    </Virtual>
  </div>
</template>

<script setup lang="ts">
import Virtual from '@/components/virtual/index.vue';

const data = new Array(1000).fill(null).map((item, index) => index);
</script>

<style scoped></style>
