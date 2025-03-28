import '@/styles/index.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AntdConfig from '@/components/AntdConfig';
const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AntdConfig>
        <App />
      </AntdConfig>
    </React.StrictMode>,
  );
}
