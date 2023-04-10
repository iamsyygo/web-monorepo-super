<template>
  <div>
    <el-tree
      :indent="30"
      ref="tree"
      :data="treeData"
      :props="{
        label: 'name',
        children: 'children',
      }"
    >
      <template #default="{ node, data }">
        <d-tree :show-line="true" :node="node">{{ data.label }}</d-tree>
      </template>
    </el-tree>
  </div>
</template>

<script setup lang="ts">
// https://unpkg.com/province-city-china@8.5.6/dist/level.json
import { ElTree } from 'element-plus';

import DTree from '@/components/tree-line/index.vue';
import { ref } from 'vue';

const treeData = ref([]);
fetch('https://unpkg.com/province-city-china@8.5.6/dist/level.json')
  .then((res) => res.json())
  .then((data) => {
    treeData.value = data;
  });
</script>

<style scoped></style>
