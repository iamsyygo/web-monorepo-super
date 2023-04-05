<template>
  <el-container class="base-app-layout">
    <el-header :class="header">
      <slot name="header" :config="layoutCssVar"></slot>
    </el-header>
    <el-aside :class="aside">
      <slot name="aside" :config="layoutCssVar"></slot>
    </el-aside>
    <el-main :class="main">
      <slot name="main" :config="layoutCssVar"></slot>
    </el-main>
  </el-container>
</template>

<script lang="ts" setup>
import { Layout } from './type';
import { useRoute } from 'vue-router';

const layout = ref<Layout>('l-hlc');
const route = useRoute();

// 容器 class
const header = computed(() => {
  // 占满
  const fill = ['l-hlc', 'l-hc', 'd-hlc', 'd-hc'];
  if (fill.includes(layout.value)) {
    return 'layout-header--fill';
  }
  // 减去 aside
  const fill_aside = ['l-lhc', 'd-lhc'];
  if (fill_aside.includes(layout.value)) {
    return 'layout-header--fill_aside';
  }

  // 隐藏
  const hide = ['l-lc', 'd-lc'];
  if (hide.includes(layout.value)) {
    return 'layout-header--hide';
  }
});
const aside = computed(() => {
  // 占满
  const fill = ['l-lhc', 'd-lhc', 'l-lc', 'd-lc'];
  if (fill.includes(layout.value)) {
    return 'layout-aside--fill';
  }

  // 减去 header
  const fill_header = ['l-hlc', 'd-hlc'];
  if (fill_header.includes(layout.value)) {
    return 'layout-aside--fill_header';
  }

  // 隐藏
  const hide = ['l-hc', 'd-hc'];
  if (hide.includes(layout.value)) {
    return 'layout-aside--hide';
  }
});
const main = computed(() => {
  // 减去 header、aside
  const nofill = ['l-lhc', 'd-lhc', 'l-hlc', 'd-hlc'];
  if (nofill.includes(layout.value)) {
    return 'layout-main--nofill';
  }

  // 减去 header
  const fill_header = ['l-lc', 'd-lc'];
  if (fill_header.includes(layout.value)) {
    return 'layout-main--fill_header';
  }

  // 减去 aside
  const fill_aside = ['l-hc', 'd-hc'];
  if (fill_aside.includes(layout.value)) {
    return 'layout-main--fill_aside';
  }
});

// 布局配置
const layoutConfig = reactive({
  header_height: 60,
  // header_bg: '#fff',
  header_bg:
    'linear-gradient(90deg, var(--el-color-primary-light-8), var(--el-color-primary-light-9))',
  header_box_shadow: '0 2px 4px 0 rgb(0 0 0 / 5%)',
  aside_width: 200,
  main_padding: 10,
});
const layoutCssVar = computed(() => {
  return Object.entries(layoutConfig).reduce((acc: any, [key, value]) => {
    acc[key] = typeof value === 'number' ? `${value}px` : value;
    return acc;
  }, {});
});

// svg
onMounted(() => {
  const svgDynamicDolor = document.getElementsByClassName('svg-dynamic-color');
  console.log(svgDynamicDolor, 'svgDynamicDolor');
});
</script>

<style scoped lang="scss">
$-layout-header-height: v-bind('layoutCssVar.header_height');
$-layout-header-background: v-bind('layoutCssVar.header_bg');
$-layout-header_box_shadow: v-bind('layoutCssVar.header_box_shadow');
$-layout-aside-width: v-bind('layoutCssVar.aside_width');
$-layout-main-padding: v-bind('layoutCssVar.main_padding');
.base-app-layout {
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: $-layout-aside-width 1fr 1fr;
  grid-template-rows: $-layout-header-height 1fr;
}

.layout-header--fill {
  grid-column: 1 / 4;
  grid-row: 1 / 2;
}
.layout-header--fill_aside {
  grid-column: 2 / 4;
  grid-row: 1 / 2;
}

.layout-aside--fill {
  grid-column: 1 / 2;
  max-width: $-layout-aside-width;
  min-height: 0;
  grid-row: 1 / 3;
}
.layout-aside--fill_header {
  grid-column: 1;
  max-width: $-layout-aside-width;
  min-height: 0;
  grid-row: 2/3;
}

.layout-main--nofill {
  grid-column: 2 / 4;
  grid-row: 2 / 3;
}
.layout-main--fill_header {
  grid-column: 2 / 4;
  grid-row: 1 / 3;
}
.layout-main--fill_aside {
  grid-column: 1 / 4;
  grid-row: 2 / 3;
}

.layout-header--hide,
.layout-aside--hide,
.layout-main--hide {
  display: none;
}
</style>
