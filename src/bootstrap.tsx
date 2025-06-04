import '@/styles/index.ts';
import AntdConfig from '@/components/AntdConfig';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
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
