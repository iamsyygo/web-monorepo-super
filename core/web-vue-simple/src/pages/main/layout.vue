<template>
  <el-container class="base-app-layout">
    <el-header :class="header">
      <slot name="header"></slot>
    </el-header>
    <el-aside :class="aside">
      <slot name="aside"></slot>
    </el-aside>
    <el-main :class="main">
      <slot name="main"></slot>
    </el-main>
    <el-tooltip content="主题设置" placement="top" effect="light">
      <div class="base-app-theme-setting" @click="openDrawer">
        <d-icon name="artist-palette-svgrepo-com" :size="18"></d-icon>
      </div>
    </el-tooltip>
  </el-container>
  <el-drawer
    v-model="visibleDrawer"
    title="系统主题设置"
    size="500px"
    custom-class="base-app-bg"
  >
    <el-card shadow="never">
      <el-divider content-position="left">布局</el-divider>
      <div class="lay-map-box">
        <div class="lay-map hlc" @click="hanldeLayoutChange('hlc')">
          <d-icon name="-fireworks" v-if="layoutActive === 'hlc'"></d-icon>
        </div>
        <div class="lay-map lhc" @click="hanldeLayoutChange('lhc')">
          <d-icon name="-fireworks" v-if="layoutActive === 'lhc'"></d-icon>
        </div>
        <div class="lay-map lc" @click="hanldeLayoutChange('lc')">
          <d-icon name="-fireworks" v-if="layoutActive === 'lc'"></d-icon>
        </div>
        <div class="lay-map hc" @click="hanldeLayoutChange('hc')">
          <d-icon name="-fireworks" v-if="layoutActive === 'hc'"></d-icon>
        </div>
      </div>

      <el-divider content-position="left">主题色</el-divider>
      <div
        v-for="color in colorParams"
        :key="color.name"
        class="theme-test-demo"
      >
        <el-color-picker
          v-model="systemConfig.theme[color.name]"
          @change="(params) => handleTemeChange(params as string, color.name)"
        />
        <div
          :class="`test-demo-${color.name}`"
          :style="`background:var(--el-color-${color.name})`"
        ></div>
        <div
          v-for="item in [3, 5, 7, 8, 9]"
          :key="item"
          :class="`test-demo-${color.name}`"
          :style="`background:var(--el-color-${color.name}-light-${item})`"
        ></div>
      </div>

      <el-divider content-position="left">头部区域</el-divider>
      <div>
        <div class="system-layout-item__label">高度：</div>
        <el-input-number
          v-model="systemConfig.typesetting.header_height"
          :min="50"
          controls-position="right"
        />
        <div class="system-layout-item__label">导航页：</div>
        <el-switch
          v-model="systemConfig.typesetting.navigation"
          inline-prompt
          active-text="开启"
          inactive-text="关闭"
        />
        <div class="system-layout-item__label">效果：</div>
        <el-switch
          v-model="systemConfig.typesetting.header_bg_effect"
          inline-prompt
          active-text="渐变"
          inactive-text="纯色"
        />
        <div
          v-if="systemConfig.typesetting.header_bg_effect"
          class="theme-test-demo_next"
        >
          <div class="system-layout-item__label">角度：</div>
          <el-input-number
            v-model="header_bg_angle"
            :min="50"
            controls-position="right"
          />
          <div class="system-layout-item__label">左侧颜色：</div>
          <el-color-picker v-model="header_bg_left" />
          <div class="system-layout-item__label">右侧颜色：</div>
          <el-color-picker v-model="header_bg_right" />
        </div>
        <div v-else class="theme-test-demo_next">
          <div class="system-layout-item__label">头部区域颜色：</div>
          <el-color-picker v-model="systemConfig.typesetting.header_bg" />
        </div>
      </div>
    </el-card>
  </el-drawer>
</template>

<script lang="ts" setup>
import { Layout } from './type';
// import { useRoute } from 'vue-router';
import { convert } from 'css-color-function';
const { typesetting, theme } = JSON.parse(
  localStorage.getItem('system-setting') || '{}',
);

const leftcolor = typesetting?.header_bg.split(',')[1];
const rightcolor = typesetting?.header_bg.split(',')[2]?.replace(')', '');
let angle = typesetting?.header_bg
  .split(',')[0]
  .split('(')[1]
  ?.replace('deg', '');

const header_bg_angle = ref(+angle || 90);
const header_bg_left = ref(leftcolor || typesetting?.header_bg);
const header_bg_right = ref(rightcolor || typesetting?.header_bg);
let systemConfig = reactive({
  layout: 'l-hlc',
  typesetting: {
    navigation: typesetting.navigation || true,
    header_bg_effect: typesetting.header_bg_effect || true, // true:渐变 false:纯色
    header_height: typesetting.header_height || 60,
    header_bg:
      typesetting?.header_bg ||
      `linear-gradient(${header_bg_angle.value}deg, ${header_bg_left.value}, ${header_bg_right.value})`,
    header_box_shadow: '0 2px 4px 0 rgb(0 0 0 / 5%)',
    aside_width: 200,
  },
  theme: theme || {
    primary: '#396EFB',
    success: '#13CE66',
    warning: '#F7BA2A',
    danger: '#FF4949',
  },
});
// systemConfig = localLayout;
const layout = toRef(systemConfig, 'layout');
// const route = useRoute();

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
const aside = computed((aaa) => {
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
    // 如果 header 是 fill 的话，heighr:aside - header
    if (header.value == 'layout-header--fill') {
      return 'layout-aside--hide—fill_header';
    }
    if (header.value == 'layout-header--fill_aside') {
      return 'layout-aside--hide—fill';
    }
    // return 'layout-aside--hide';
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

// svg
onMounted(() => {
  const svgDynamicDolor = document.getElementsByClassName('svg-dynamic-color');
  // console.log(svgDynamicDolor, 'svgDynamicDolor');
});

// 打开主题设置抽屉
const visibleDrawer = ref(false);
const layoutActive = ref('hlc');
const openDrawer = () => {
  visibleDrawer.value = true;
};
const hanldeLayoutChange = (val: string) => {
  const value = `l-${val}`;
  layout.value = value as Layout;
  layoutActive.value = val;
};

// 主题色
const colorParams = computed(() => {
  return Object.keys(systemConfig.theme).map((key: string) => {
    return {
      name: key as keyof typeof systemConfig.theme,
      value: systemConfig.theme[key as keyof typeof systemConfig.theme],
    };
  });
});
// const colorPickerValues = systemConfig.theme.reduce((acc, cur) => {
//   acc[cur.name] = cur.value;
//   return acc;
// }, {} as Record<string, string>);
const handleTemeChange = (
  val: string,
  master: keyof typeof systemConfig.theme,
) => {
  systemConfig.theme[master] = val;

  // 每次修改都储存至本地
  // localStorage.setItem('system-setting', JSON.stringify(colorPickerValues));

  const data = getLadderColor(val, '--el-color', master);
  appendBodyCssVar(data, 'theme-color-' + master);
};

// 生成阶梯色
const getLadderColor = (color: string, pre: string, master: string) => {
  const result: any = {};
  const preName = `${pre}-${master}`;
  result[preName] = color;
  for (let index = 0; index < 10; index++) {
    if (![9, 8, 6, 4, 0].includes(index)) {
      result[`${preName}-light-${10 - index}`] = convert(
        `color(${color} tint(${10 - index}0%))`,
      );
    }
    if (index === 2) {
      result[`${preName}-dark-${index}`] = convert(
        `color(${color} shade(${index}0%))`,
      );
    }
  }
  return result;
};

// 根据传入的变量对象，生成一个 css 变量 字符串并插入body后面
const appendBodyCssVar = (varDate: any, selector: string) => {
  const cssVar = Object.keys(varDate)
    .map((key) => `${key}: ${varDate[key]};`)
    .join('');

  // 查找是否已经存在
  const style = document.querySelector('#' + selector);

  if (style) {
    style.innerHTML = `:root{${cssVar}}`;
  } else {
    const style = document.createElement('style');
    style.setAttribute('id', selector);
    style.innerHTML = `:root{${cssVar}}`;
    document.body.appendChild(style);
  }
};

// 设置排版
const setTypesetting = (val: any) => {
  const result: any = {};
  Object.entries(val).forEach(([key, value]) => {
    result[`--${key}`] = typeof value === 'number' ? `${value}px` : value;
  });
  appendBodyCssVar(result, 'theme-loyut-config');
};
watch(
  () => systemConfig.typesetting,
  (val) => {
    setTypesetting(val);
  },
  { immediate: true, deep: true },
);

watch(
  () => systemConfig,
  (val) => {
    localStorage.setItem('system-setting', JSON.stringify(val));
  },
  {
    deep: true,
    immediate: true,
  },
);

watch(
  () => systemConfig.typesetting.header_bg_effect,
  (val) => {
    if (!val) {
      systemConfig.typesetting.header_bg = systemConfig.theme.primary;
    } else {
      systemConfig.typesetting.header_bg = `linear-gradient(${header_bg_angle.value}deg, ${header_bg_right.value}, ${header_bg_left.value})`;
    }
  },
  {
    deep: true,
  },
);

watch(
  [
    () => header_bg_angle.value,
    () => header_bg_left.value,
    () => header_bg_right.value,
  ],
  (val) => {
    if (systemConfig.typesetting.header_bg_effect) {
      const [angle, left, right] = val;
      systemConfig.typesetting.header_bg = `linear-gradient(${angle}deg, ${left}, ${right})`;
    }
  },
  {
    deep: true,
  },
);

// 默认执行一次  primary
handleTemeChange(systemConfig.theme.primary, 'primary');
setTypesetting(systemConfig.typesetting);
</script>
<style scoped lang="scss">
.base-app-layout {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
  header {
    background: var(--header_bg);
    box-shadow: var(--header_box_shadow);
  }
  header,
  main,
  aside {
    position: absolute;
    transition: all 0.5s ease;
  }
}

.layout-header--fill {
  left: 0;
  width: 100%;
  height: var(--header_height);
}
.layout-header--fill_aside {
  left: var(--aside_width);
  width: calc(100% - var(--aside_width));
  height: var(--header_height);
}

.layout-aside--fill {
  top: 0;
  width: var(--aside_width);
  height: 100%;
}
.layout-aside--fill_header {
  top: var(--header_height);
  width: var(--aside_width);
  height: calc(100% - var(--header_height));
}

.layout-main--nofill {
  left: var(--aside_width);
  top: var(--header_height);
  width: calc(100% - var(--aside_width));
  height: calc(100% - var(--header_height));
}
.layout-main--fill_header {
  top: 0;
  height: 100%;
  width: calc(100% - var(--aside_width));

  left: var(--aside_width);
}
.layout-main--fill_aside {
  width: 100%;
  left: 0;
  top: var(--header_height);
  height: calc(100% - var(--header_height));
}

.layout {
  &-header--hide {
    width: 100%;
    height: 0;
    overflow: hidden;
  }
  &-aside--hide—fill {
    top: 0;
    width: 0;
    height: 100%;
    overflow: hidden;
  }
  &-aside--hide—fill_header {
    top: var(--header_height);
    width: 0;
    height: calc(100% - var(--header_height));
    overflow: hidden;
  }
}

// 主题设置
.base-app-theme-setting {
  cursor: pointer;
  position: absolute;
  width: 50px;
  right: -42px;
  bottom: 10%;
  padding: 4px 0 4px 4px;
  border-radius: 5px;
  transition: all 0.5s ease;
  background-color: #eff1f2;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 5%);
  &:hover {
    right: -20px;
  }
}

.lay-map-box {
  display: flex;
  justify-content: space-between;
}
.lay-map {
  width: 100px;
  height: 60px;
  cursor: pointer;
  border-radius: 3px;
  overflow: hidden;
  background-color: #eff1f2;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
  margin-left: 3px;

  svg {
    position: absolute;
    z-index: 999;
    bottom: 0;
    right: 0;
  }

  &.hlc,
  &.lhc,
  &.hc,
  &.lc {
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 10px;
      background: var(--header_bg, #ccced6);
      box-shadow: var(--header_box_shadow);
    }
    &::before {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 20px;
      background: var(--aside_bg, #ccced6);
      box-shadow: var(--header_box_shadow);
    }
  }
  &.lhc::before {
    z-index: 99;
  }
  &.hc::before,
  &.lc::after {
    display: none;
  }
}

.theme-test-demo {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.test-demo- {
  &primary,
  &success,
  &warning,
  &danger,
  &info {
    cursor: pointer;
    border-radius: 3px;
    margin-left: 3px;
    flex: 1;
    height: 28px;
    transition: all 0.3s ease;
    &:hover {
      box-shadow: 0 0 5px rgba(202, 199, 199, 0.9);
      transform: scale(1.05);
    }
  }
}
.system-layout-item__label {
  display: inline-block;
  color: var(--el-text-color-regular);
  font-size: var(--el-font-size-base);
  margin-left: 15px;
}
.theme-test-demo_next {
  margin-top: 3px;
}
</style>
