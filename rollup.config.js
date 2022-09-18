import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
    format: "cjs",
    name: 'test'
  },
  plugins: [nodeResolve(), commonjs()],
  external: ["react"],
};
