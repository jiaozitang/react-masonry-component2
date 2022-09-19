import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import autoprefixer from 'autoprefixer'
import path from 'path'
import postcss from "rollup-plugin-postcss";

import {walkEntryFiles} from './scripts/buildUtil'

export default {
  input: [...walkEntryFiles('src')],
  output: {
    dir: path.dirname('dist/bundle.js'),
    format: 'es',
    exports: 'named', // 指定导出模式（自动、默认、命名、无）
    preserveModules: true, // 保留模块结构
    preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    typescript({
      outDir: 'dist',
      declaration: true,
      declarationDir: 'dist'
    }),
    postcss({
      plugins: [autoprefixer()]
    }),
  ],
};
