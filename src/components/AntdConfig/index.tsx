import { App, ConfigProvider } from 'antd';
import type React from 'react';
import GlobalMessage from './components/GlobalMessage';

type AntdConfigProps = {
  children: React.ReactElement;
};

const fontFamily =
  "LXGWWenKaiGB-Regular,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol','Noto Color Emoji'";

function AntdConfig({ children }: AntdConfigProps) {
  return (
    <>
      <ConfigProvider
        theme={{
          cssVar: true,
          hashed: false,
          token: {
            fontFamily,
            colorPrimary: '#00B96B',
          },
        }}
      >
        <App>
          <GlobalMessage />
          {children}
        </App>
      </ConfigProvider>
    </>
  );
}
export default AntdConfig;
