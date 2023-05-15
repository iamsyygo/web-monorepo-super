<template>
  <div class="text-effect-container">
    <h1>
      <span v-for="(item, index) in list" :key="index">
        <i :style="`animation-delay: ${index * 0.2}s`">{{ item }}</i>
      </span>
    </h1>
    <p>
      UI Notes 收集了大量线上优秀 App 的完整 UI 截图，只有落地设计没有飞机稿
      你可以在这里探索 UI
      设计的最新趋势、浏览竞品的产品设计、快速找到工作中需要的灵感
    </p>
  </div>
</template>

<script setup lang="ts">
const list = ['151个', '应用', '39499 张截图'];
</script>

<style lang="scss" scoped>
.text-effect-container {
  overflow: hidden;
  h1 {
    margin: 0;
    font-size: 50px;
    font-weight: bold;
  }
}

.text-effect-container > h1 > span {
  display: inline-block;
  overflow: hidden;
  position: relative;
  top: 0.2rem;
  animation: text-up 0.3s ease-in-out forwards;

  i {
    font-style: normal;
    position: relative;
    top: 8rem;
    animation: text-up 1s ease-in-out forwards;
  }
}

.text-effect-container > p {
  font-size: 26px;
  position: relative;
  top: 100px;
  animation: text-up 1s ease-in-out forwards;
  animation-delay: 0.6s;
}

@keyframes text-up {
  to {
    top: 0;
  }
}
</style>
