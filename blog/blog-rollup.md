我报名参加金石计划 1 期挑战——瓜分 10 万奖池，这是我的第 5 篇文章，[点击查看活动详情](https://s.juejin.cn/ds/jooSN7t "https://s.juejin.cn/ds/jooSN7t")

## 介绍

本文带你一起使用 Rollup 打包项目，实现以下功能：

- **自动将 dependencies 依赖声明为 externals**
- **支持处理外部 npm 依赖**
- **支持基于 CommonJS 模块引入**
- **支持 typescript，并导出声明文件**
- **支持 scss，并添加前缀**
- **支持自动清除调试代码**
- **打包输出文件保留原始模块结构**
- **支持按需加载**

## 一、什么是 `rollup`

`rollup` 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。

## 二、为什么是 `rollup`

为什么是 `rollup` 而不是 `webpack` 呢？

`rollup`的特色是 `ES6` 模块和代码 `Tree-shaking`，这些 `webpack` 同样支持，除此之外 `webpack` 还支持热模块替换、代码分割、静态资源导入等更多功能。

当开发应用时当然优先选择的是 `webpack`，但是若你项目只需要打包出一个简单的 `bundle` 包，并是基于 `ES6` 模块开发的，可以考虑使用 `rollup`。

`rollup` 相比 `webpack`，它更少的功能和更简单的 api，是我们在打包类库时选择它的原因。

## 三、支持打包的文件格式

rollup 支持的打包文件的格式有 amd, cjs, es\esm, iife, umd。其中，amd 为 AMD 标准，cjs 为 CommonJS 标准，esm\es 为 ES 模块标准，iife 为立即调用函数， umd 同时支持 amd、cjs 和 iife。

## 四、快速开始

### 1. 安装

```chain
npm install --global rollup
```

### 2. 基础打包

新增文件 `src/main.js`：

```js
// src/main.js
import foo from "./foo.js";
export default function () {
  console.log(foo);
}
```

新增文件 `src/foo.js`：

```js
export default "hello world!";
```

项目根目录下新增文件 `rollup.config.js`：

```js
export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
    format: "cjs",
  },
};
```

运行命令：

```chain
rollup -c
```

得到产物 `bundle.js`：

```js
"use strict";

var foo = "hello world!";

// src/main.js
function main() {
  console.log(foo);
}

module.exports = main;
```

这时我们使用 Rollup 将 `src/main.js`、`src/foo.js`打包成功，完成了第一个 bundle，。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cb44b7bbc31438897ac3105a00ac05a~tplv-k3u1fbpfcp-watermark.image?)

### 3. 引入外部资源

更新 `src/main.js`，添加外部资源 `lodash-es` 引入：

```js
// src/main.js
import foo from "./foo.js";

import { sum } from "lodash-es";

export default function () {
  console.log(foo);
  console.log(sum[(1, 2)]);
}
```

再次打包 `rollup -c`，发现有报错 `(!) Unresolved dependencies`：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70335a0186a64b539caca268c8b64654~tplv-k3u1fbpfcp-watermark.image?)

这是因为当项目中引入外部资源时，如 npm 包，`rollup` 不知道如何打破常规去处理这些依赖。

有 2 种方法引入外部资源：

- 添加插件 `@rollup/plugin-node-resolve` 将我们编写的源码与依赖的第三方库进行合并；
- 配置 external 属性，告诉 rollup.js 哪些是外部的类库。

#### 3.1 resolve 插件

`@rollup/plugin-node-resolve` 插件让 rollup 能够处理外部依赖。

安装：

```chain
yarn add @rollup/plugin-node-resolve -D
```

更新 `rollup.config.js`：

```js
import resolve from "@rollup/plugin-node-resolve";
export default {
  plugins: [resolve()],
};
```

重新打包得到产物，已经包含了 `lodash-es`：

```js
"use strict";

var foo = "hello world!";

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * The base implementation of `_.sum` and `_.sumBy` without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {number} Returns the sum.
 */
function baseSum(array, iteratee) {
  var result,
    index = -1,
    length = array.length;

  while (++index < length) {
    var current = iteratee(array[index]);
    if (current !== undefined) {
      result = result === undefined ? current : result + current;
    }
  }
  return result;
}

/**
 * Computes the sum of the values in `array`.
 *
 * @static
 * @memberOf _
 * @since 3.4.0
 * @category Math
 * @param {Array} array The array to iterate over.
 * @returns {number} Returns the sum.
 * @example
 *
 * _.sum([4, 2, 8, 6]);
 * // => 20
 */
function sum(array) {
  return array && array.length ? baseSum(array, identity) : 0;
}

// src/main.js

function main() {
  console.log(foo);
  console.log(sum([1, 2]));
}

module.exports = main;
```

成功运行：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8d7233456d124f52ae678d5a58723d69~tplv-k3u1fbpfcp-watermark.image?)

#### 3.2 external 属性

有些场景下，虽然我们使用了 resolve 插件，但可能我们仍然想要某些库保持外部引用状态，这时我们就需要使用 external 属性，来告诉 rollup.js 哪些是外部的类库。

更新 `rollup.config.js`：

```js
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
    format: "esm",
    name: "test",
  },
  plugins: [nodeResolve(), commonjs()],
  external: ["react"],
};
```

#### 3.3 external 插件

每个类库都要手动添加至 externals 未免太麻烦，这时候可以用 `rollup-plugin-node-externals` 插件，自动将外部类库声明为 externals。

安装：

```chain
yarn add rollup-plugin-node-externals -D
```

更新 `rollup.config.js`：

```js
import externals from "rollup-plugin-node-externals";

export default [
  {
    plugins: [
      externals({
        devDeps: false, // devDependencies 类型的依赖就不用加到 externals 了。
      }),
    ],
  },
];
```

### 4. 引入 CommonJs 模块

#### 4.1 CommonJs 插件

rollup.js 编译源码中的模块引用默认只支持 ES6+的模块方式 import/export。然而大量的 npm 模块是基于 CommonJS 模块方式，这就导致了大量 npm 模块不能直接编译使用。

需要添加 @rollup/plugin-commonjs 插件来支持基于 CommonJS 模块方式 npm 包。

安装：

```chain
yarn add @rollup/plugin-commonjs -D
```

更新 rollup.config.js：

```js
import commonjs from "@rollup/plugin-commonjs";

export default {
  plugins: [commonjs()],
};
```

更新 src/foo.js：

```js
module.exports = {
  text: "hello world!",
};
```

重新打包，打包成功：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c98d1d7466e54ead9bfa5da4c5e055ba~tplv-k3u1fbpfcp-watermark.image?)

### 5. 引入 Sass 资源

rollup-plugin-postcss 默认集成了对 scss、less、stylus 的支持。

#### 5.1 打包支持 sass 文件

新增 `src/foo.scss`：

```scss
body {
  background-color: red;
  display: flex;
}
```

更新 `src/main.js`：

```js
// src/main.js
import foo from "./foo.js";
import "./foo.scss";

export default function () {
  console.log(foo.text);
}
```

安装：

```chain
yarn add rollup-plugin-postcss -D
```

更新 rollup.config.js：

```js
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";

export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
    format: "esm",
    name: "test",
  },
  plugins: [nodeResolve(), commonjs(), postcss()],
  external: ["react"],
};
```

打包产物：

```js
"use strict";

var foo = {
  text: "hello world!",
};

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === "undefined") {
    return;
  }

  var head = document.head || document.getElementsByTagName("head")[0];
  var style = document.createElement("style");
  style.type = "text/css";

  if (insertAt === "top") {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "body {\n  background-color: red;\n}";
styleInject(css_248z);

// src/main.js

function main() {
  console.log(foo.text);
}

module.exports = main;
```

效果如图：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9d5d5e80b5d54910abe0836b8ca0144a~tplv-k3u1fbpfcp-watermark.image?)

#### 5.2 css 加前缀

安装：

```chain
yarn add autoprefixer -D
```

更新 packages.json：

```js

  "browserslist": [
    "defaults",
    "not ie < 8",
    "last 2 versions",
    "> 1%",
    "iOS 7",
    "last 3 iOS versions"
  ]
```

更新 rollup.config.js：

```js
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import autoprefixer from "autoprefixer";
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
      plugins: [autoprefixer()],
    }),
  ],
  external: ["react"],
};
```

效果如图：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdb1b417634e4b7cacb27d824ebebf00~tplv-k3u1fbpfcp-watermark.image?)

#### 5.3 css 压缩

安装：

```chain
yarn add cssnano -D
```

更新 rollup.config.js：

```js
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
    }),
  ],
  external: ["react"],
};
```

效果如图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84ac8ce365664db1a49a8d81f0256b4e~tplv-k3u1fbpfcp-watermark.image?)

#### 5.4 抽离单独的 css 文件

更新 `rollup.config.js`：

```js
export default [
  {
    plugins: [
      postcss({
        plugins: [autoprefixer(), cssnano()],
        extract: "css/index.css",
      }),
    ],
  },
];
```

效果如图：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31aa7bcbac6e4a2a8a1576c1b35e90b3~tplv-k3u1fbpfcp-watermark.image?)

### 6. 引入 Typescript 资源

#### 6.1 typescript 插件

修改 `src/foo.js` -> `src/foo.ts`：

```ts
export default {
  text: "hello world!",
};
```

更新 `src/main.js`：

```js
// src/main.js
import foo from "./foo.ts";
import "./foo.scss";

export default function () {
  console.log(foo.text);
}
```

安装：

```chain
yarn add @rollup/plugin-typescript -D
```

更新 rollup.config.js：

```js
import typescript from "@rollup/plugin-typescript";
export default [
  {
    plugins: [typescript()];
  }
];
```

成功支持 Ts 文件导出：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecdd7a565cac48c7a70d7cec2b2f8678~tplv-k3u1fbpfcp-watermark.image?)

#### 6.2 导出类型声明文件

更新 rollup.config.js：

```js
import typescript from "@rollup/plugin-typescript";
export default [
  {
    plugins: [
        typescript({
            outDir: "dist",
            declaration: true,
            declarationDir: "dist",
        })
    ];
  }
];
```

成功支持类型声明文件导出：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2a441501a9d54033a73529d9928a90a2~tplv-k3u1fbpfcp-watermark.image?)

### 7. 打包产物清除调试代码

插件 `@rollup/plugin-strip` 用于从代码中删除 debugger 语句和函数。包括 assert.equal、console.log 等等。

安装：

```chain
yarn add @rollup/plugin-strip -D
```

更新 rollup.config.js：

```js
import strip from "@rollup/plugin-strip";
export default [
  {
    plugins: [
        strip()
    ];
  }
];
```

### 8. 打包输出文件保留原始模块结构

上面我们的 output 配置是这样的：

```js
output: {
    dir: path.dirname('dist/bundle.js'),
    format: 'es',
  }
```

打包产物如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbade42b786b41a7b957d66052396733~tplv-k3u1fbpfcp-watermark.image?)

那么怎么才能把 index.js、index2.js 改成 foo/index.js、hello/index.js 呢？

修改 output，更新 rollup.config.js：

```js
output: {
    dir: path.dirname('dist/bundle.js'),
    format: 'es',
    exports: 'named', // 指定导出模式（自动、默认、命名、无）
    preserveModules: true, // 保留模块结构
    preserveModulesRoot: 'src', // 将保留的模块放在根级别的此路径下
  },
```

这时打包产物就和源码的结构一致了：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dfa326d7746a41fda5fa8fabd141c93b~tplv-k3u1fbpfcp-watermark.image?)

### 9. 按需加载

rollup 支持输出格式为 `es` 模块化，就会按模块输出。

所以我们上面的配置已经实现了按需加载了。

## 五、一个真实的组件库的 rollup 打包配置

项目地址：<https://github.com/jiaozitang/react-masonry-component2>

该项目支持：

- **打包输出文件保留原始模块结构**
- **自动将 dependencies 依赖声明为 externals**
- **支持处理外部 npm 依赖**
- **支持基于 CommonJS 模块引入**
- **支持 typescript，并导出声明文件**
- **支持 scss，并添加前缀**
- **支持自动清除调试代码**
- **支持按需加载**

### 1. 安装

```chain
npm i rollup -g

yarn add @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-strip @rollup/plugin-typescript rollup-plugin-postcss rollup-plugin-node-externals autoprefixer -D
```

### 2. 配置

项目根目录下新增 `rollup.config.js`：

```js
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import strip from "@rollup/plugin-strip";
import typescript from "@rollup/plugin-typescript";
import autoprefixer from "autoprefixer";
import path from "path";
import externals from "rollup-plugin-node-externals";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json";

export default [
  {
    input: "./src/index.ts", // 入口文件
    output: [
      {
        // 出口文件
        dir: path.dirname(pkg.module),
        format: "es", // es模块导出，支持按需加载
        name: pkg.name,
        exports: "named", // 指定导出模式（自动、默认、命名、无）
        preserveModules: true, // 保留模块结构
        preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
      },
    ],
    plugins: [
      // 自动将dependencies依赖声明为 externals
      externals({
        devDeps: false,
      }),
      // 处理外部依赖
      resolve(),
      // 支持基于 CommonJS 模块引入
      commonjs(),
      // 支持 typescript，并导出声明文件
      typescript({
        outDir: "es",
        declaration: true,
        declarationDir: "es",
      }),
      // 支持 scss，并添加前缀
      postcss({
        plugins: [autoprefixer()],
      }),
      // 清除调试代码
      strip(),
    ],
  },
];
```

更新 packages.json：

```json
{
  "module": "es/index.js",
  "types": "es/index.d.ts",
  "files": ["es"]
}
```

项目结构：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc9ee49f5c64886bb5dc007335a0d43~tplv-k3u1fbpfcp-watermark.image?)

打包产物：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a794eea6f1b42008cdb4b1eea8c3f1d~tplv-k3u1fbpfcp-watermark.image?)

## 小结

本文介绍了 rollup 的各个功能的使用方法，rollup 自身能力较弱，依靠插件完成完整的组件库打包。

可以直接拷贝文中配置，实现一个按需加载的组件库打包。

项目地址：<https://github.com/jiaozitang/react-masonry-component2>

希望能对你有所帮助，感谢阅读～

别忘了点个赞鼓励一下我哦，笔芯 ❤️

## 往期精彩

- [从 0 到 1 开发一个 React 组件库](https://juejin.cn/post/7144365208646418462)

## 参考资料

- [Rollup 官网](https://www.rollupjs.com/)
- [rollup 从入门到打包一个按需加载的组件库](https://juejin.cn/post/6934698510436859912)
- [一文带你快速上手 Rollup](https://zhuanlan.zhihu.com/p/221968604)
