import { memo, useEffect, useRef, useState } from 'react';
import { Header } from './index.styled';
import { useTransitionActive } from '@/hooks';

const navList = [
  {
    name: '发现音乐',
    path: '/find-music',
  },
  {
    name: '我的音乐',
    path: '/me-music',
  },
  {
    name: '关注',
    path: '/follow',
  },
  {
    name: '商场',
    path: '/shop',
  },
  {
    name: '音乐人',
    path: '/musician',
  },
  {
    name: '下载客户端',
    path: '/download',
  },
];
export default memo(() => {
  const { activeRef, handleActive } = useTransitionActive(navList, 'nav-item');

  return (
    <Header>
      <div className="logo-container">
        <div className="img-filter"></div>
        <img src="/logo.svg" alt="/logo.svg" />
      </div>
      <h2>云音乐</h2>

      <div className="nav-container" onClick={handleActive}>
        {navList.map((item, index) => (
          <div className="nav-item" key={item.path} data-index={index}>
            {item.name}
          </div>
        ))}
        <div className="nav-active" ref={activeRef}></div>
      </div>

      <div className="other-container">
        <div className="search-container">
          <i className="iconfont icon-search"></i>
          <input type="text" placeholder="音乐/视频/电台/用户" />
        </div>
        <div className="creation-container">创作者中心</div>
        <div className="user-container"></div>
      </div>
    </Header>
  );
});
