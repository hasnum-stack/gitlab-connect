import type { PerformanceConfig } from '@rsbuild/core';
export const chunkSplit: PerformanceConfig['chunkSplit'] = {
  strategy: 'split-by-experience',
  override: {
    cacheGroups: {
      'lib-antd': {
        test: /[\\/]node_modules[\\/](antd|@ant-design|rc-.*)[\\/]/,
        name: 'lib-antd',
        priority: 0,
      },
    },
  },
};
