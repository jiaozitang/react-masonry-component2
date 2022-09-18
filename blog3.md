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

### 2. JS ES6 模块打包

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

这时我们使用 Rollup 完成了第一个 bundle。

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
import { nodeResolve } from "@rollup/plugin-node-resolve";
export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
    format: "cjs",
  },
  plugins: [nodeResolve()],
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
    format: "cjs",
    name: "test",
  },
  plugins: [nodeResolve(), commonjs()],
  external: ["react"],
};
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
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/main.js",
  output: {
    file: "bundle.js",
    format: "cjs",
    name: "test",
  },
  plugins: [nodeResolve(), commonjs()],
  external: ["react"],
};
```

更新 src/foo.js：

```js
module.exports = {
  text: "hello world!",
};
```

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
    format: "cjs",
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
postcss({
  plugins: [autoprefixer(), cssnano()],
  extract: "css/index.css",
});
```

效果如图：
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31aa7bcbac6e4a2a8a1576c1b35e90b3~tplv-k3u1fbpfcp-watermark.image?)

### 6. 引入 Typescript 资源

#### 6.1 typescript 插件

修改 `src/foo.js` -> `src/foo.ts`：

```ts
export default  {
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
{
  plugins: [
      typescript()
  ]
}
```

成功支持 Ts 文件导出：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ecdd7a565cac48c7a70d7cec2b2f8678~tplv-k3u1fbpfcp-watermark.image?)

#### 6.2 导出类型声明文件



## 参考资料

- [Rollup 官网](https://www.rollupjs.com/)
- [rollup 从入门到打包一个按需加载的组件库](https://juejin.cn/post/6934698510436859912)
- [一文带你快速上手 Rollup](https://zhuanlan.zhihu.com/p/221968604)
