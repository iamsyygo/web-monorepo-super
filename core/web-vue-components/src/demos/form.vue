<template>
  <div>
    <d-form :form-items="formItems" v-model="model" label-width="80" :spans="6">
      <template #formItems="{ formModel, formItem }">
        <el-input
          v-model="formModel[formItem.prop]"
          placeholder="请输入"
          clearable
        ></el-input>
      </template>
      <template #isRequired="{ formModel, formItem }">
        <el-radio-group v-model="formModel[formItem.prop]">
          <el-radio-button label="1">是</el-radio-button>
          <el-radio-button label="0">否</el-radio-button>
        </el-radio-group>
      </template>
    </d-form>
  </div>
</template>

<script setup lang="ts">
import { ElRadioGroup, ElRadioButton, ElInput } from 'element-plus';

import type { FormItem } from '@/components/form/type';
import DForm from '@/components/form';
import { ref } from 'vue';

const formItems: FormItem[] = [
  {
    label: '属性名',
    prop: 'attrName',
    type: 'input',
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
  {
    label: '默认值',
    prop: 'default',
    defaultValue: '无',
    required: true,
  },
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
    span: { xl: 24, lg: 24, xs: 24, sm: 24, md: 24 },
  },
];

// 使用 ref 能避免在 v-model 中出现引用丢失失去响应的问题
const model = ref({});
</script>

<style scoped></style>
