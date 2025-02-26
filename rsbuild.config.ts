import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { chunkSplit } from './config/chunkSplit';
import { proxy } from './config/proxy';
export default defineConfig({
  server: {
    proxy,
  },
  html: {
    title: 'gitlab-content',
  },
  performance: {
    chunkSplit,
  },
  plugins: [pluginReact()],
});
