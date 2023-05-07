<script setup lang="ts">
import {
  ElConfigProvider,
  ElTimeline,
  ElTimelineItem,
  ElCard,
} from 'element-plus';
import zhCn from 'element-plus/dist/locale/zh-cn';

import DForm from '@/demos/form.vue';
import DTree from '@/demos/tree.vue';
import virtual from '@/demos/virtual.vue';
import DTable from '@/demos/table.vue';
import ContextMenus from '@/demos/ContextMenus.vue';
import PagePro from '@/demos/PagePro.vue';
import type { FormItem } from './components/form/type';

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
</script>
<template>
  <el-config-provider :locale="zhCn">
    <el-timeline>
      <el-timeline-item
        center
        timestamp="2023-04-10"
        placement="top"
        type="primary"
      >
        <el-card style="background-color: #f6f6f6">
          <h4># 简单and不简单的表格组件</h4>
          <DTable></DTable>
        </el-card>
      </el-timeline-item>
      <el-timeline-item
        center
        timestamp="2023-04-10"
        placement="top"
        type="primary"
      >
        <el-card>
          <h4># 简单and不简单的页面组件</h4>
          <PagePro></PagePro>
        </el-card>
      </el-timeline-item>

      <el-timeline-item
        center
        timestamp="2023-04-10"
        placement="top"
        type="primary"
      >
        <el-card>
          <h4># 右键菜单组件</h4>
          <ContextMenus></ContextMenus>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2023-04-08" placement="top" type="info">
        <el-card>
          <h4># 虚拟列表</h4>
          <virtual></virtual>
        </el-card>
      </el-timeline-item>

      <el-timeline-item timestamp="2023-03-26" placement="top" type="success">
        <el-card>
          <h3># 表单组件(Form Component)</h3>
          <DForm />
        </el-card>
      </el-timeline-item>
      <el-timeline-item
        center
        timestamp="2023-03-01"
        placement="top"
        type="warning"
      >
        <el-card>
          <h3># 🌲结构线组件(Tree Component)</h3>
          <DTree />
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </el-config-provider>
</template>
