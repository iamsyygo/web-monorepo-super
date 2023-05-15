<template>
  <h2 class="interesting-text-container">
    https://uinotes.com
    <div class="interesting-mask">
      <span ref="items" v-for="(item, index) in list" :key="index">{{
        item
      }}</span>
    </div>
  </h2>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
const items = ref();
const list = [
  '货拉拉，拉货搬家的货运平台',
  '丁香医生，一起发现健康生活',
  '小米运动，智能穿戴管理平台',
  '飞猪旅行，特价票限时抢购',
  '微光，遇见温暖的陪伴',
  '淘票票，淘出好时光',
];

const length = list.length;
const activeIndex = ref(0);
// 轮播并且添加 text-up 和 text-in class
onMounted(() => {
  setInterval(() => {
    items.value.forEach((item: any, index: number) => {
      item.classList.remove('text-up', 'text-in');
      if (index === activeIndex.value) {
        item.classList.add('text-in');
        item.classList.remove('text-up');
      } else if (index === activeIndex.value - 1) {
        item.classList.add('text-up');
        item.classList.remove('text-in');
      } else if (
        activeIndex.value == 0 &&
        index == length - 1 &&
        item.classList.length
      ) {
        item.classList.remove('text-in');
        item.classList.add('text-up');
      } else {
        item.classList.remove('text-up', 'text-in');
      }
    });

    if (activeIndex.value >= length - 1) {
      activeIndex.value = 0;
    } else {
      activeIndex.value += 1;
    }
  }, 2000);
});
</script>

<style scoped lang="scss">
.interesting-text-container {
  width: 996;
  font-family: Helvetica;
  font-size: 100px;
  line-height: 1.06;
  letter-spacing: -0.02em;
  color: #1d1d1f;
}
.interesting-mask {
  position: relative;
  height: 110px;
  line-height: 110px;
  overflow: hidden;
}

.interesting-mask > span {
  display: block;
  position: absolute;
  top: 110px;
}

.text-up {
  transform: translateY(-220px);
  transition: all 2s;
}

.text-in {
  transform: translateY(-110px);
  transition: all 2s;
}
</style>
