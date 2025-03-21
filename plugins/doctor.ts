import { logger } from '@rsbuild/core';
import type { RsbuildPlugin } from '@rsbuild/core';
import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import packageJson from '../package.json';

export const pluginDoctor = (): RsbuildPlugin => {
  return {
    name: 'plugin-doctor',
    setup(api) {
      // 检测到RSDOCTOR环境变量
      if (process.env.RSDOCTOR) {
        // 添加RsdoctorRspackPlugin插件
        const browserslist = packageJson.browserslist;
        logger.greet('--------browserslist--------');
        console.log(browserslist);
        logger.greet('--------browserslist--------');
        api.modifyRspackConfig((_, { appendPlugins }) => {
          appendPlugins(
            new RsdoctorRspackPlugin({
              linter: {
                rules: {
                  'ecma-version-check': [
                    'Warn',
                    {
                      targets: browserslist,
                    },
                  ],
                },
              },
            }),
          );
        });
        // 修改输出配置, 禁用压缩, 开启sourceMap
        api.modifyRsbuildConfig((config, { mergeRsbuildConfig }) => {
          return mergeRsbuildConfig(config, {
            output: {
              minify: false,
              sourceMap: true,
            },
          });
        });
      }
    },
  };
};
