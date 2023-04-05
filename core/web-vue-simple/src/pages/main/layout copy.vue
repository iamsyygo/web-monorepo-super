<template>
  <div class="base-app-layout">
    <el-container class="base-app-layout_warp">
      <el-header v-if="showWarpHeader">
        <slot name="header" :config="layoutCssVar"></slot>
      </el-header>
      <el-aside v-if="showWarpAside && route.meta.showMenu" width="200px">
        <slot name="aside" :config="layoutCssVar"></slot>
      </el-aside>
      <el-main v-if="showWarpMain">
        <slot name="main" :config="layoutCssVar"></slot>
      </el-main>
      <el-container
        v-if="
          (!showWarpAside && !showWarpMain) ||
          (!showWarpHeader && !showWarpMain)
        "
        class="base-app-layout_inner"
      >
        <el-header v-if="showInnerHeader">
          <slot name="header" :config="layoutCssVar"></slot>
        </el-header>
        <el-aside v-if="showInnerAside && route.meta.showMenu" width="200px">
          <slot name="aside" :config="layoutCssVar"></slot>
        </el-aside>
        <el-main v-if="showInnerMain">
          <slot name="main" :config="layoutCssVar"></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { Layout } from './type';
import { useRoute } from 'vue-router';

const layout = ref<Layout>('l-hlc');
const route = useRoute();

// 外层容器
const showWarpHeader = computed(
  () => layout.value === 'l-hlc' || layout.value === 'l-hc',
);
const showWarpAside = computed(
  () => layout.value === 'l-lc' || layout.value === 'l-lhc',
);
const showWarpMain = computed(
  () => layout.value === 'l-lc' || layout.value === 'l-hc',
);

// 内层容器
const showInnerHeader = computed(() => layout.value === 'l-lhc');
const showInnerAside = computed(() => layout.value === 'l-hlc');
const showInnerMain = computed(
  () => layout.value === 'l-hlc' || layout.value === 'l-lhc',
);

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
  .el-header {
    height: $-layout-header-height;
    line-height: $-layout-header-height;
    background: $-layout-header-background;
    box-shadow: $-layout-header_box_shadow;
    padding: 0;
  }
  .el-aside {
    width: $-layout-aside-width;
  }
  .el-main {
    padding: $-layout-main-padding;
  }

  .base-app-layout_warp {
    .el-aside {
      width: $-layout-aside-width;
      height: 100vh;
    }
  }
  .base-app-layout_inner {
    .el-aside,
    .el-main {
      height: calc(100vh - $-layout-header-height);
    }
  }
}
</style>
