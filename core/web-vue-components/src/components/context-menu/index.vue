<template>
  <div ref="containerRef">
    <slot></slot>

    <!-- 防止出现 fixed 定位时,父级元素存在 transform 时,导致定位不准确 -->
    <Teleport to="body">
      <Transition
        name="context-menu"
        @before-enter="handleDivBeforeEnter"
        @enter="handleDivEnter"
      >
        <div
          class="context-menu-container"
          v-if="showMenu"
          :style="{ left: x + 'px', top: y + 'px', width: menuWidth + 'px' }"
        >
          <div class="menu-list">
            <div
              class="menu-items"
              v-for="(item, index) in props.menus"
              :key="index"
              @click="($event) => handleClickMenu($event, item)"
            >
              {{ item.label }}
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useContextMenu } from '@/hooks/useContextMenu';
interface ItemProp {
  label: string;
  command: string;
  icon?: string;
  // action?: () => void;
}
const containerRef = ref<HTMLElement | null>(null);
const props = withDefaults(
  defineProps<{
    menus: ItemProp[];
    berforeShow?: (el: MouseEvent) => boolean;
  }>(),
  {},
);

const emits = defineEmits<{
  (e: 'select', item: ItemProp, evt: MouseEvent): void;
}>();

// eslint-disable-next-line react-hooks/rules-of-hooks
const { showMenu, menuHeight, menuWidth, x, y } = useContextMenu(
  containerRef,
  props.berforeShow,
);
menuWidth.value = 150;
const handleClickMenu = (e: MouseEvent, item: ItemProp) => {
  emits('select', item, e);
  showMenu.value = false;
};

const handleDivBeforeEnter = (el: HTMLElement) => {
  el.style.height = '0px';
};
const handleDivEnter = (el: HTMLElement) => {
  // 先设置高度为auto,再获取高度,再设置高度为0,这样就可以获取到元素的高度
  el.style.height = 'auto';
  const height = el.clientHeight;
  menuHeight.value = height;
  el.style.height = '0px';

  // 为了让动画生效,需要在下一帧执行(即上面js执行完成后一帧)
  requestAnimationFrame(() => {
    el.style.height = height + 'px';
    el.style.transition = '.2s ease';
  });
};
</script>

<style scoped lang="scss">
.context-menu-container {
  /* 固定定位,当在父级中存在 transform 时,就不再会相对于视口 */
  position: fixed;
  z-index: 9999;

  box-sizing: border-box;

  /* width: calc(v-bind(menuWidth) * 1px); */
  padding: 5px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.menu-items {
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #eff1f2;
  }
}

.context-menu-enter-active,
.context-menu-leave-active {
  transition: all 0.2s ease;
}

.context-menu-enter-from,
.context-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.context-menu-leave-from,
.context-menu-enter-to {
  opacity: 1;
  transform: translateY(0);
}
</style>
