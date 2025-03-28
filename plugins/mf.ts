import type { RsbuildPlugin } from '@rsbuild/core';
import pkg from '../package.json';
import { pluginModuleFederation, createModuleFederationConfig } from '@module-federation/rsbuild-plugin';
const dep = pkg.dependencies;

export const pluginMF = (): RsbuildPlugin => {
  let hasnum_provider: string;
  if (process.env.MFDEV) {
    hasnum_provider = 'hasnum_provider@http://localhost:8888/mf-manifest.json';
  } else {
    hasnum_provider = 'hasnum_provider@hasnum_provider/1.0.0/mf-manifest.json';
  }
  return pluginModuleFederation(
    createModuleFederationConfig({
      name: 'federation_consumer',
      remotes: {
        test: hasnum_provider,
      },
      shared: [
        {
          ...dep,
          react: { singleton: true, requiredVersion: dep.react },
          'react-dom': { singleton: true, requiredVersion: dep['react-dom'] },
        },
      ],
    }),
  );
};
