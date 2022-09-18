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
'use strict';

var foo = "hello world!";

// src/main.js
function main () {
  console.log(foo);
}

module.exports = main;
```

这时我们使用 Rollup 完成了第一个 bundle。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cb44b7bbc31438897ac3105a00ac05a~tplv-k3u1fbpfcp-watermark.image?)

## 参考资料

- [Rollup 官网](https://www.rollupjs.com/)
- [rollup 从入门到打包一个按需加载的组件库](https://juejin.cn/post/6934698510436859912)
- [一文带你快速上手 Rollup](https://zhuanlan.zhihu.com/p/221968604)
