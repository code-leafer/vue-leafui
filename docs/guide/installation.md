# 安装

## 环境支持

My UI 需要以下环境支持:

- [Vue.js](https://cn.vuejs.org/) 3.2.0 或更高版本
- 现代浏览器（Chrome，Firefox，Safari，Edge 等）
- TypeScript 4.5.0 或更高版本（如使用 TypeScript）

:::tip
我们推荐使用 Node.js 16.0 或更高版本
:::

## 使用包管理器（推荐）

我们推荐使用包管理器（NPM，Yarn，pnpm）安装 My UI:

```bash
# 使用 npm
npm install my-ui-lib

# 使用 yarn
yarn add my-ui-lib

# 使用 pnpm
pnpm add my-ui-lib
```

## 浏览器直接引入

你也可以通过 CDN 在浏览器中直接使用:

```html
<head>
  <!-- 导入样式 -->
  <link rel="stylesheet" href="https://unpkg.com/my-ui-lib/dist/index.css" />
  <!-- 导入 Vue 3 -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <!-- 导入组件库 -->
  <script src="https://unpkg.com/my-ui-lib"></script>
</head>

<body>
  <div id="app">
    <my-button type="primary">Hello</my-button>
    <my-input v-model="inputValue" placeholder="请输入内容"></my-input>
  </div>
  <script>
    const { createApp, ref } = Vue
    const app = createApp({
      setup() {
        const inputValue = ref('')
        return { inputValue }
      }
    })
    app.use(MyUI)
    app.mount('#app')
  </script>
</body>
```

## 在 TypeScript 中使用

如果你正在使用 TypeScript，确保在 `tsconfig.json` 中包含正确的类型声明:

```json
{
  "compilerOptions": {
    // ...
    "types": ["my-ui-lib/dist/index.d.ts"]
  }
}
```

## Vite 项目配置

在 Vite 项目中使用 My UI 非常简单:

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // 如果你需要使用组件库的源码
  optimizeDeps: {
    include: ['my-ui-lib']
  }
})
```

## Vue CLI 项目配置

在 Vue CLI 创建的项目中使用:

```js
// vue.config.js
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src')
      }
    }
  }
})
```

## 验证安装

安装完成后，可以通过在项目中导入一个组件来验证是否安装成功:

```vue
<template>
  <my-button type="primary">验证按钮</my-button>
</template>

<script setup>
import { MyButton } from 'my-ui-lib'
import 'my-ui-lib/dist/index.css'
</script>
```

如果能成功渲染按钮，说明安装成功。接下来可以查看[快速开始](/guide/quickstart.html)了解如何在项目中使用我们的组件。 