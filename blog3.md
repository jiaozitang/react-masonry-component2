## 什么是 `rollup`

`rollup` 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。

## 为什么是 `rollup`

为什么是 `rollup` 而不是 `webpack` 呢？

`rollup`的特色是 `ES6` 模块和代码 `Tree-shaking`，这些 `webpack` 同样支持，除此之外 `webpack` 还支持热模块替换、代码分割、静态资源导入等更多功能。

当开发应用时当然优先选择的是 `webpack`，但是若你项目只需要打包出一个简单的 `bundle` 包，并是基于 `ES6` 模块开发的，可以考虑使用 `rollup`。

`rollup` 相比 `webpack`，它更少的功能和更简单的 api，是我们在打包类库时选择它的原因。

## 快速开始

### 安装

```chain
npm install --global rollup
```

### JS ES6 模块打包

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

### 引入外部资源

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

- 添加插件 `@rollup/plugin-node-resolve` 将我们编写的源码与依赖的第三方库进行合并
- 配置 external 属性，告诉 rollup.js 哪些是外部的类库。

#### resolve 插件

安装 `@rollup/plugin-node-resolve`：

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

#### external 属性

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
  external: ["lodash-es"],
};
```

打包产物

## 参考资料

- [Rollup 官网](https://www.rollupjs.com/)
- [rollup 从入门到打包一个按需加载的组件库](https://juejin.cn/post/6934698510436859912)
- [一文带你快速上手 Rollup](https://zhuanlan.zhihu.com/p/221968604)
