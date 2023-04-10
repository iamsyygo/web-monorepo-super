<template>
  <span class="tree-node-container">
    <span
      class="label-befote--line__level"
      v-if="node.level !== 1 && (showLine === true || showLine === 'structure')"
      :style="{
        left: -indent - 15 + 'px',
        width: `${
          !node.canFocus || node.childNodes.length
            ? `${indent - 27}px`
            : `${indent}px`
        }`,
      }"
    ></span>
    <!-- TODO: 高度待优化 -->
    <span
      class="label-befote--line__vertical"
      v-if="
        node.level !== 1 &&
        isLastNode(node) &&
        (showLine === true || showLine === 'structure')
      "
      :style="{ left: `${-indent - 15}px`, height: `${100 * 100}%` }"
    ></span>
    <span>{{ node.label }}</span>
    <span
      class="label-after--line"
      v-if="showLine === true || showLine === 'label'"
    ></span>
    <div>
      <slot name="label-append" :node="node"></slot>
    </div>
  </span>
</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

// 默认值
let props = withDefaults(
  defineProps<{
    node: any;
    indent: number;
    showLine: boolean | 'structure' | 'label';
  }>(),
  {
    indent: 30,
    showLabelLine: true,
  },
);
const { node, indent, showLine } = toRefs(props);

function isLastNode(node: any) {
  const { parent } = node;
  if (parent) {
    const { childNodes } = parent;
    return childNodes.at(-1) === node;
  }
  return false;
}
</script>

<style scoped lang="scss">
$-base-broder-style: 1px dashed #ccc;
.tree-node-container {
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.label-befote--line__level {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  display: inline-block;
  width: 16px;
  height: 1px;
  border-bottom: $-base-broder-style;
}
.label-befote--line__vertical {
  position: absolute;
  left: 0;
  bottom: 50%;

  display: inline-block;
  width: 1px;
  height: 100%;
  border-left: $-base-broder-style;
}
.label-after--line {
  flex: 1;
  margin: 0 5px;
  height: 1px;
  border-bottom: $-base-broder-style;
}
</style>
