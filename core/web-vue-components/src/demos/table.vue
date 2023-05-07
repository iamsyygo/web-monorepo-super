<template>
  <div style="">
    <DTable :columns="columns" :data="data" state-unique-key="test">
      <!-- <template #header></template> -->
      <template #search-header="{ model }">{{ model }}</template>
      <template #search-footer="{ model }">{{ model }}</template>

      <template #button-inline>
        <ElButton type="primary">查询</ElButton>
        <ElButton>重置</ElButton>
      </template>
    </DTable>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import DTable from '@/components/table/index';
import type { TableColumns } from '@/components/table/type';
import { ref } from 'vue';
const data = ref<any[]>([]);
import axios from 'axios';

axios.get('/api/code-remove/getList').then((res) => {
  // console.log(res);
  data.value = (res.data.data.list as any[]).slice(0, 10);
});

const columns: TableColumns = [
  {
    type: 'selection',
  },
  {
    label: '源包名',
    prop: 'sourcePackage',
  },

  {
    label: '提交时间',
    prop: 'pushTime',
  },
  {
    label: '提交人',
    prop: 'pushUser',
  },
  {
    label: '真实地址',
    prop: 'realAddress',
  },
  {
    label: '源IP',
    prop: 'sourceIp',
  },
  {
    label: '目标IP',
    prop: 'targetIp',
  },
  {
    label: '目标包名',
    prop: 'targetPackage',
  },
  {
    label: '说明',
    prop: 'description',
  },
];
</script>

<style scoped></style>
