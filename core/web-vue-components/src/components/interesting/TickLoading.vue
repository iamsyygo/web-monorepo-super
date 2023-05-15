<template>
  <svg :width="props.size" :height="props.size">
    <circle
      class="tick-circle"
      fill="none"
      :stroke="props.color"
      :stroke-width="props.stroke"
      stroke-linecap="round"
      :cx="props.size / 2"
      :cy="props.size / 2"
      :r="(props.size - props.stroke) / 2"
    />
    <polyline
      class="tick-polyline"
      fill="none"
      :stroke="props.color"
      :stroke-width="props.stroke"
      :points="points"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    color?: string;
    size?: number;
    stroke?: number;
  }>(),
  {
    color: '#409eff',
    size: 50,
    stroke: 6,
  },
);

// gou line points
const points = computed(() => {
  const axis = props.size / 3;
  const core = props.size / 2;

  return `${axis - axis / 3},${core + axis / 3} ${axis + axis / 3},${
    core + axis - axis / 4
  } ${core + axis - axis / 4},${axis}`;
});

// 圆的周长 = 2πr
const circleLength = computed(() => props.size * 2 * Math.PI);
</script>

<style scoped>
.tick-circle {
  stroke-dasharray: v-bind('circleLength');
  stroke-dashoffset: 0;
  animation: tick-circle 3s;
  animation-fill-mode: forwards;
}

.tick-polyline {
  stroke-dasharray: v-bind('circleLength');
  stroke-dashoffset: v-bind('circleLength');
  animation: tick-polyline 3s;
  animation-fill-mode: forwards;
  animation-delay: 1s;
}

@keyframes tick-circle {
  from {
    stroke-dashoffset: v-bind('circleLength');
  }
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes tick-polyline {
  0% {
    stroke-dashoffset: v-bind('circleLength');
  }
  100% {
    stroke-dashoffset: 0;
  }
}
</style>
