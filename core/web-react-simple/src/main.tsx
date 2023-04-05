import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'antd/dist/reset.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

import '@/styles/index.css';
import App from './App';
import store from './store';
import { findIndex } from './api/find.api';
import { THEME_CONFIG } from './styles/theme';
findIndex().then((res) => {
  console.log(res, 'res');
});
const THEME = {
  token: THEME_CONFIG,
};

const ROOT = document.getElementById('root') as HTMLElement;

AOS.init();
ReactDOM.createRoot(ROOT).render(
  // <React.StrictMode>
  <ConfigProvider locale={zhCN} theme={THEME}>
    <Provider store={store}>
      <HashRouter>
        <ThemeProvider theme={THEME.token}>
          <App />
        </ThemeProvider>
      </HashRouter>
    </Provider>
  </ConfigProvider>,
  // </React.StrictMode>,
);
