import { memo } from 'react';
import { FindMusic } from './index.styled';
import { useTransitionActive } from '@/hooks';
import { Outlet } from 'react-router-dom';

const navBarList = [
  {
    name: '推荐',
    path: '/find-music/recommend',
  },
  {
    name: '排行榜',
    path: '/find-music/ranking',
  },
  {
    name: '歌单',
    path: '/find-music/song-list',
  },
  {
    name: '主播电台',
    path: '/find-music/dj',
  },
  {
    name: '歌手',
    path: '/find-music/singer',
  },
  {
    name: '新碟上架',
    path: '/find-music/new-music',
  },
];
export default memo(() => {
  const { activeRef, handleActive } = useTransitionActive(
    navBarList,
    'nav-bar-item',
  );
  console.log('find-music');

  return (
    <FindMusic>
      <div
        className="nav-bar-container"
        onClick={handleActive}
        data-aos="fade-left"
      >
        {navBarList.map((item, index) => {
          return (
            <div className="nav-bar-item" key={item.path} data-index={index}>
              {item.name}
            </div>
          );
        })}
        <div className="nav-bar-active-item" ref={activeRef}></div>
      </div>

      {/* Main */}
      <Outlet />
    </FindMusic>
  );
});
