import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import path from 'path'
import postcssUrl from 'postcss-url'
import externals from 'rollup-plugin-node-externals'
import postcss from "rollup-plugin-postcss";

import {walkEntryFiles} from './scripts/buildUtil'

export default {
  input: [...walkEntryFiles('src')],
  output: {
    dir: path.dirname('dist/bundle.js'),
    format: 'es',
  },
  plugins: [
    externals({
      devDeps: false,
      include: [/^rc-/],
      exclude: [/\.less$/],
    }),
    nodeResolve(),
    commonjs(),
    typescript({
      declaration: true,
      declarationDir: 'dist'
    }),
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
  ],
  external: ["react"],
};
