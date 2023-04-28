import { onMounted, onUnmounted, ref, toRefs } from 'vue';
import type { Ref } from 'vue';

export const useContextMenu = (
  refDom: Ref<HTMLElement | null>,
  callback?: (el: MouseEvent) => boolean,
) => {
  const showMenu = ref(false);
  const menuWidth = ref(0);
  const menuHeight = ref(0);
  const x = ref(0);
  const y = ref(0);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    // 制止事件冒泡导致的其它操作覆盖菜单 or 触发父级的 contextmenu 事件
    e.stopPropagation();
    if (callback?.(e)) return;
    // 判断超出边界的情况
    const { clientX, clientY } = e;
    const innerWidth = window.innerWidth;
    const innerHeight = window.innerHeight;
    const isOverflowRight = clientX + menuWidth.value > innerWidth;
    const isOverflowHeight = clientY + menuHeight.value > innerHeight;
    showMenu.value = true;
    x.value = isOverflowRight ? e.clientX - menuWidth.value : e.clientX;
    y.value = isOverflowHeight ? e.clientY - menuHeight.value : e.clientY;
  };

  const handleCloseMenu = () => {
    showMenu.value = false;
  };

  onMounted(() => {
    const root = refDom.value;

    // 必须监听 contextmenu 事件，否则出现其它操作显示菜单的情况，无法监听到
    root?.addEventListener('contextmenu', handleContextMenu);
    // 为了防止消费者在 root 中进行事件点击制止冒泡，这里在捕获阶段进行处理
    window.addEventListener('click', handleCloseMenu, true);

    // 同样的方法，在 window 上进行监听 contextmenu 事件，隐藏其他右键菜单
    window.addEventListener('contextmenu', handleCloseMenu, true);

    // 滚动时隐藏菜单
    window.addEventListener('scroll', handleCloseMenu, true);
  });

  onUnmounted(() => {
    const root = refDom.value;
    root?.removeEventListener('contextmenu', handleContextMenu);
    window.removeEventListener('click', handleCloseMenu, true);
    window.removeEventListener('contextmenu', handleCloseMenu, true);
    window.removeEventListener('scroll', handleCloseMenu, true);
  });
  return { showMenu, menuWidth, menuHeight, x, y };
};
