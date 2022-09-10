import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import strip from "@rollup/plugin-strip";
import typescript from "@rollup/plugin-typescript";
import path from 'path'
import externals from 'rollup-plugin-node-externals'
import sass from 'rollup-plugin-sass';

import pkg from "./package.json";
import {walkEntryFiles} from './scripts/buildUtil'


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
    input: [...walkEntryFiles('src')],
    external: ["ms"],
    output: [getOutputConfig({dir: path.dirname(pkg.module), format: "es"})],
    plugins: [
      sass(),
      externals({
        devDeps: false,
        include: [/^rc-/],
        exclude: [/\.less$/],
      }),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
      }),
      strip(),
    ],
  },
];
