import strip from "@rollup/plugin-strip";
import typescript from "@rollup/plugin-typescript";
import sass from 'node-sass';
import path from 'path'
import postcss from 'rollup-plugin-postcss'

import postcssUrl from 'postcss-url'
import pkg from "./package.json";


function getOutputConfig({dir = 'lib/index.js', format = 'cjs'}) {
  return {
    dir,
    format,
    exports: 'named',
    name: pkg.name,
    preserveModules: true,
    preserveModulesRoot: 'src',
  }
}

export default [
  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: './src/index.ts',
    external: ["ms"],
    output: [getOutputConfig({dir: path.dirname(pkg.module), format: "es"})],
    plugins: [
      typescript(),
      postcss({
        modules: false,
        use: [
          'sass',
          'stylus',
          [
            'less',
            {
              javascriptEnabled: true,
            },
          ],
        ],
        plugins: [
          postcssUrl({
            url: 'inline',
          }),
        ],
      }),
      strip(),
    ],
  },
];
