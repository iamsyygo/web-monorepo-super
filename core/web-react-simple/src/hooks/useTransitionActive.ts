import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * 结构应该是 - data-index 为导航栏的索引
 * <div className="nav-item" key={item.path} data-index={index}></div>
 * <div className="nav-active" ref={activeRef}></div>
 **/

interface NavList {
  name: string;
  path: string;
}
/**
 * 过渡动画 hook 适用于导航栏
 * @param {NavList[]} navList 导航栏列表
 * @param {string} navClassName 导航栏类名
 * @returns activeRef 过渡动画元素
 * @returns handleActive 点击导航栏触发的事件 - 适用于事件委托
 **/
export const useTransitionActive = (
  navList: NavList[],
  navClassName: string,
) => {
  const activeRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState({
    index: 0,
    path: '',
    width: 0,
    left: 0,
  });

  const handleActive = (e: any) => {
    const isNav = e.target.classList.contains(navClassName);
    if (!isNav) return;

    const currentNav = e.target;

    // const { width, left } = currentNav.getBoundingClientRect();
    const left = currentNav.offsetLeft;
    const width = currentNav.offsetWidth;
    const index = currentNav.getAttribute('data-index');
    console.log(2);

    currentNav.setAttribute('style', 'true');
    if (index === activeItem.index) return;
    setActiveItem({
      index: index,
      path: navList[index].path,
      width,
      left,
    });
    console.log(1);
  };

  useEffect(() => {
    if (!activeRef.current) return;
    console.log(3);

    if (!activeItem.path) {
      const fristNav = document.querySelectorAll(`.${navClassName}`)[0];
      handleActive({
        target: fristNav,
      });
      return;
    }
    activeRef.current?.setAttribute(
      'style',
      `width: ${activeItem.width}px; left: ${activeItem.left}px`,
    );

    if (activeItem.path !== location.pathname) {
      navigate(activeItem.path);
    }
  }, [activeItem]);

  return {
    activeRef,
    handleActive,
  };
};
