import { THEME_CONFIG } from '@/styles/theme';
import styled from 'styled-components';

type ITheme = typeof THEME_CONFIG;
export const FindMusic = styled.div`
  width: 100%;
  .nav-bar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 35px;
    line-height: 35px;
    background-color: ${({ theme }: { theme: ITheme }) => theme.colorPrimary};
    user-select: none;
  }

  .nav-bar-item {
    font-size: 14px;
    font-weight: 600;
    color: #fff;
    margin-right: 38px;
    padding: 5px 10px;
    cursor: pointer;
    position: relative;
    z-index: 100;
  }
  .nav-bar-active-item {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100px;
    height: 25px;
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.3);
    z-index: 99;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;
  }
`;
