<template>
  <div>
    <el-button type="primary" size="small" @click="handleClick('success')"
      >success</el-button
    >
    <el-button type="primary" size="small" @click="handleClick('warning')"
      >warning</el-button
    >
    <el-button type="primary" size="small" @click="handleClick('info')"
      >info</el-button
    >
    <el-button type="primary" size="small" @click="handleClick('error')"
      >error</el-button
    >
    <el-button type="primary" size="small" @click="customMessage"
      >自定义的e</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElButton } from 'element-plus';
import { h } from 'vue';

import TickLoading from './TickLoading.vue';
function handleClick(type: 'success' | 'warning' | 'info' | 'error') {
  ElMessage({
    message: '恭喜你，这是一条' + type + '消息',
    type,
  });
}

function customMessage() {
  ElMessage({
    message: '自定义的message',
    type: 'success',
    icon: h(TickLoading, { size: 16, stroke: 2 }),
  });
}
</script>

<style scoped></style>
