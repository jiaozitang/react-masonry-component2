import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
    format: "umd",
    name: "test",
  },
  plugins: [
    nodeResolve(),
    commonjs(),
    postcss({
      plugins: [autoprefixer(), cssnano()],
      extract: "css/index.css",
    }),
  ],
  external: ["react"],
};
