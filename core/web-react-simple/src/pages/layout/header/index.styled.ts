import { THEME_CONFIG } from '@/styles/theme';
import styled from 'styled-components';

type ITheme = typeof THEME_CONFIG;

export const Header = styled.div`
  width: 100%;
  height: var(--app-header-height);
  // element-plus 官网导航栏背景色
  background-image: radial-gradient(transparent 1px, #fff 1px);
  backdrop-filter: saturate(50%) blur(4px);
  /* border-bottom: #f0f0f0 1px solid; */
  border-bottom: ${({ theme }: { theme: ITheme }) => theme['colorPrimary']} 5px
    solid;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 999;

  // logo
  .logo-container {
    width: 36px;
    position: relative;
    img {
      width: 100%;
      &:hover {
        filter: drop-shadow(0 0 10px #646cffaa);
        transition: all 0.3s ease;
      }
    }
  }

  // 导航栏
  .nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 100%;
    margin: 0 10px;

    .nav-item {
      margin: 0 10px;
      padding: 10px 10px;
      cursor: pointer;
    }
    .nav-active {
      position: absolute;
      top: 1px;
      width: 100px;
      height: 5px;
      background: ${({ theme }: { theme: ITheme }) => theme['colorPrimary']};
      border-radius: 3px;

      transition: all 0.2s cubic-bezier(0.7, 0.7, 1, 1.1);
    }
  }

  .other-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .search-container {
    width: 180px;
    height: 33px;
    line-height: 33px;
    margin: 0 10px;
    background: rgba(230, 232, 233, 0.6);
    border-radius: 90px;
    font-size: 14px;
    i.iconfont {
      margin-left: 5px;
    }
    input {
      font-weight: 600;
      width: calc(100% - 28px);
      height: 80%;
      border: none;
      background: transparent;
      &:focus {
        outline: none;
      }
    }
  }

  .creation-container {
    cursor: pointer;
    font-weight: 600;
    padding: 0 10px;
    color: #6a6a6a;
    height: 33px;
    line-height: 33px;
    margin: 0 12px;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.05);
    background: rgba(230, 232, 233, 0.6);
    border-radius: 90px;
    font-size: 14px;
    &:hover {
      transition: all 0.5s;
      border: 1px solid rgba(0, 0, 0, 0.35);
    }
  }
`;
