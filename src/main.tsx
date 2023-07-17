import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import App from '@/App.tsx';
import '@/index.scss';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiConfig } from 'wagmi';
import { chains, wagmiConfig } from '@/config/wagmiConfig';
import '@rainbow-me/rainbowkit/styles.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <HashRouter>

    <ConfigProvider
      theme={{
        token: {
          // colorBgLayout: '#F2F8FF',
          fontSize: 12
        },
        components: {
          Menu: {
            itemBg: 'transparent'
          },
          Card: {
            borderRadiusLG: 20
          },
          Modal: {
            padding: 0,
            paddingContentHorizontalLG: 0,
            paddingLG: 0,
            paddingMD: 0,
            paddingXS: 0,
            borderRadiusLG: 20,
            borderRadiusSM: 20
          }
        }
      }}
    >
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <App />
          </RainbowKitProvider>
        </WagmiConfig>
    </ConfigProvider>
      </HashRouter>
  </React.StrictMode>
);
