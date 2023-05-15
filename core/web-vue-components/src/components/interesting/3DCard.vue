<template>
  <div>
    <ul
      class="card-container"
      @click="handleCardClick"
      :style="`height:${
        !isOpen ? itemHeight * list.length : itemHeight + list.length * 5
      }px`"
    >
      <li
        class="card-item"
        ref="items"
        v-for="(item, index) in list"
        :key="index"
        :style="setItemStyle(index)"
      >
        <h3>{{ item.title }}</h3>
        <div>{{ item.name }}</div>
        <div>{{ item.content }}</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
const items = ref();

const list = [
  {
    title: '微信',
    name: '阿萨德',
    content: '你好，今天天气不错',
  },
  {
    title: '微信',
    name: '阿萨德',
    content: '你好，今天天气不错',
  },

  {
    title: '微信',
    name: '阿萨德',
    content: '你好，今天天气不错',
  },

  {
    title: '微信',
    name: '阿萨德',
    content: '你好，今天天气不错',
  },

  {
    title: '微信',
    name: '阿萨德',
    content: '你好，今天天气不错',
  },
];
const isOpen = ref(true);
const itemHeight = ref(0);
const setItemStyle = (index: number): any => {
  const length = list.length;
  const style: any = {
    position: 'absolute',
    top: 0,
    left: 0,
    'z-index': `${length - index}`,
    transform: isOpen.value
      ? `translateZ(-${index * 15}px) translateY(${index * 5}px)`
      : `translateZ(0) translateY(${index * itemHeight.value}px)`,
  };

  if (index === length - 1 && isOpen.value) {
    style['box-shadow'] = '';
  }

  if (!index && isOpen.value) {
    style['background'] = '#fff';
  }

  return style;
};

onMounted(() => {
  // console.log(item);
  // 获取item高度
  const item = items.value?.[0];
  const height = item.offsetHeight;
  itemHeight.value = height + 5;
});

const handleCardClick = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style scoped>
li {
  list-style: none;
}
.card-container {
  position: relative;
  padding: 10px 40px;
  transform-style: preserve-3d; /* 保持3d效果 */
  perspective: 800px; /* 透视 */
  cursor: pointer;
  transition: all 0.5s;
}

/* 鼠标按压 */

.card-item {
  position: relative;
  width: 100%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 15px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  -webkit-backdrop-filter: saturate(130%) blur(20px); /* 背景模糊 */
  /* 不直接作用于元素，通过另外一层达到效果 */
  backdrop-filter: saturate(130%) blur(20px);
  transition: all 0.5s;
}
</style>
