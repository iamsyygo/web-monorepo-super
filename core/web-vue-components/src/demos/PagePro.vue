<template>
  <PagePro
    :search-options="{
      searchItems: searchitems,
    }"
  >
    <template #search-header="{ model }">{{ model }}</template>
    <template #search-footer="{ model }">{{ model }}</template>

    <template #button-inline>
      <ElButton type="primary">查询</ElButton>
      <ElButton>重置</ElButton>
    </template>
  </PagePro>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
import PagePro from '@/components/page-pro/index';
import type { ISearchItem } from '@/components/page-pro/type';
import { ref } from 'vue';

const searchitems: ISearchItem[] = [
  {
    label: '属性名',
    prop: 'attrName',
    type: 'input',
    defaultValue: '无',
  },

  {
    label: '类型',
    prop: 'type',
    type: 'select',
    options: [
      {
        label: '字符串',
        value: 'string',
      },
      {
        label: '数字',
        value: 'number',
      },
      {
        label: '布尔值',
        value: 'boolean',
      },
      {
        label: '数组',
        value: 'array',
      },
      {
        label: '对象',
        value: 'object',
      },
      {
        label: '函数',
        value: 'function',
      },
      {
        label: 'Symbol',
        value: 'symbol',
      },
      {
        label: '任意类型',
        value: 'any',
      },
    ],
  },
  // {
  //   label: '默认值',
  //   prop: 'default',
  //   defaultValue: '无',
  // },
  {
    label: '可选值',
    prop: 'options',
    type: 'checkbox',
    options: [
      {
        label: '可选值1',
        value: '1',
      },
      {
        label: '可选值2',
        value: '2',
      },
      {
        label: '可选值3',
        value: '3',
      },
    ],
  },
  {
    label: '是否必填',
    prop: 'isRequired',
    required: true,
    defaultValue: '1',
  },
  {
    label: '创建时间',
    prop: 'createTime',
    type: 'date',
  },
  {
    label: '有效期',
    prop: 'validTime',
    type: 'daterange',
  },
  {
    label: '说明',
    prop: 'description',
    type: 'textarea',
    placeholder: '请输入说明',
    // span: { xl: 24, lg: 24, xs: 24, sm: 24, md: 24 },
  },
];
</script>

<style scoped></style>
