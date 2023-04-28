<template>
  <div style="background-color: antiquewhite; border: 2px solid red">
    <DTable :columns="columns" :data="data">
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

const columns: TableColumns = [
  {
    label: '属性名',
    prop: 'attrName',
  },

  {
    label: '类型',
    prop: 'type',
  },
  {
    label: '默认值',
    prop: 'default',
  },
  {
    label: '可选值',
    prop: 'options',
  },
  {
    label: '是否必填',
    prop: 'isRequired',
  },
  {
    label: '创建时间',
    prop: 'createTime',
  },
  {
    label: '有效期',
    prop: 'validTime',
  },
  {
    label: '说明',
    prop: 'description',
  },
];

const data = ref([]);
</script>

<style scoped></style>
