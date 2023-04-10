<template>
  <div>
    <div
      ref="viewports"
      class="viewports-container"
      :style="{ height: `${props.height}px` }"
      @scroll="handleScroll"
    >
      <div ref="listRef">
        <div
          v-for="(item, index) in showData"
          :key="index"
          class="virtual-item"
        >
          <slot :item="item" :index="index"></slot>
        </div>
      </div>

      <!-- 用于占位, 保证滚动条的高度 -->
      <div
        v-if="props.data.length > size"
        :style="{ height: `${(props.data.length - size) * props.rowHeight}px` }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue';
import { Props } from './type';
const props = defineProps(Props);
const viewports = ref<HTMLDivElement | null>(null);
const listRef = ref<HTMLDivElement | null>(null);

// 每页显示行数
const size = computed(() => Math.ceil(props.height / props.rowHeight));

const start = ref(0);
const end = computed(() => start.value + size.value);

// 显示的数据
const showData = ref<any[]>();
watch(
  () => [start.value, end.value],
  () => {
    showData.value = props.data.slice(start.value, end.value);
  },
  {
    immediate: true,
  },
);

// 滚动事件 TODO: 待优化 - 节流
const handleScroll = () => {
  const scrollTop = viewports.value?.scrollTop || 0;
  start.value = Math.floor(scrollTop / props.rowHeight);

  if (listRef.value) {
    listRef.value.style.transform = `translateY(${scrollTop}px)`;
  }
};
</script>

<style scoped lang="scss">
$--app-base-padding: 10px;
.viewports-container {
  overflow-y: scroll;
  margin: $--app-base-padding;
  background-color: #f5f5f5;
}
.virtual-item {
  height: calc(v-bind('props.rowHeight') * 1px);
  line-height: calc(v-bind('props.rowHeight') * 1px);
}
</style>
