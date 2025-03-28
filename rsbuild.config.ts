import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { chunkSplit } from './config/chunkSplit';
import { proxy } from './config/proxy';
import { pluginDoctor } from './plugins/doctor';
import { pluginMF } from './plugins/mf';

export default defineConfig({
  mode: 'production',
  output: {
    polyfill: 'usage',
    sourceMap: true,
    minify: false,
  },
  server: {
    proxy,
  },
  html: {
    title: 'gitlab-content',
  },
  performance: {
    chunkSplit,
  },
  plugins: [pluginReact(), pluginDoctor(), pluginMF()],
});
