import commonjs from "@rollup/plugin-commonjs";
import resolve from '@rollup/plugin-node-resolve'
import strip from "@rollup/plugin-strip";
import typescript from "@rollup/plugin-typescript";
import autoprefixer from 'autoprefixer'
import path from 'path'
import externals from 'rollup-plugin-node-externals'
import postcss from 'rollup-plugin-postcss'

import pkg from "./package.json";

export default [
  {
    input: './src/index.ts',
    output: [{
      dir: path.dirname(pkg.module), 
      format: "es",
      name: pkg.name,
      exports: 'named', // 指定导出模式（自动、默认、命名、无）
      preserveModules: true, // 保留模块结构
      preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
    }],
    plugins: [
      externals({
        devDeps: false,
      }),
      resolve(),
      commonjs(),
      typescript({
        "outDir": "es",
        "declaration": true,
        "declarationDir": "es"
      }),
      postcss({
        plugins: [
          autoprefixer()
        ],
      }),
      strip(),
    ],
  },
];
