<script setup lang="ts">
import dForm from './components/form';
import { FormItem } from './components/form/type';
import { ElConfigProvider } from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

import {
  computed,
  defineComponent,
  reactive,
  onMounted,
  toRefs,
  unref,
  watch,
  ref,
} from 'vue';
import { ElForm, ElFormItem, ElInput, ElRow, ElCol } from 'element-plus';
const formItems = reactive<FormItem[]>([
  {
    prop: 'fullName',
    label: '姓名',
  },
  {
    prop: 'age',
    label: '年龄',
    type: 'textarea',
  },
  {
    prop: 'sex',
    label: '性别',
    type: 'input',
  },
  {
    prop: 'address',
    label: '地址',
    type: 'input',
  },
  {
    prop: 'dateOfBirth',
    label: '出生年月',
    type: 'daterange',
  },
]);
onMounted(() => {});
let data = ref<any>({
  fullName: 'aaa',
  sex: '男',
});
const handleReanderFormItem = (formItem: any, model: any) => {
  return true;
};
// const handleData = (val: any) => {
//   console.log(val);
//   data.sex = val.sex;
// };
</script>

<template>
  <el-config-provider :locale="zhCn">
    <div>
      <dForm
        v-model="data"
        required
        label-position="top"
        :form-items="formItems"
        :render-form-item="handleReanderFormItem"
        :spans="{ xl: 6, lg: 8, xs: 12, sm: 12, md: 12 }"
        label-width="100px"
      >
        <!-- <template #fullName,address="formItem"> aaa {{ formItem }}</template> -->
        <!-- <template #fullName="formItem"> 333 {{ formItem }}</template> -->
        <template #formItems="{ formItem, formModel }">
          <el-input v-model="formModel[formItem.prop]"> </el-input>
        </template>
        <!-- <template #dateOfBirth="formItem"> formItems {{ formItem }}</template> -->
      </dForm>
    </div>
  </el-config-provider>
</template>

<style scoped></style>
