---
layout: home
hero:
  name: My UI
  text: 轻量级 Vue 3 组件库
  tagline: 简单、高效、美观的企业级 UI 组件库
  image:
    src: /logo.svg
    alt: My UI Logo
  actions:
    - theme: brand
      text: 开始使用
      link: /guide/installation
    - theme: alt
      text: 组件一览
      link: /components/button/
features:
  - icon: 🛠️
    title: 开箱即用
    details: 提供完整的 TypeScript 类型支持，灵活的主题配置和精心设计的组件 API
  - icon: ⚡️
    title: 性能优先
    details: 高效渲染和按需加载，为开发者和用户提供流畅的体验
  - icon: 🎨
    title: 美观易用
    details: 基于设计系统打造，拥有优雅的 UI 和易于使用的交互体验
---

<!-- 内容区 -->
<div class="home-content">

# My UI

<div style="text-align: center">
  <img src="/logo.svg" alt="Logo" width="200" />
</div>

## 安装

```bash
# 使用 npm
npm install my-ui

# 使用 yarn
yarn add my-ui

# 使用 pnpm
pnpm add my-ui
```

## 快速开始

```js
import { createApp } from 'vue'
import MyUI from 'my-ui'
import 'my-ui/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(MyUI)
app.mount('#app')
```

## 特性

- 💡 **类型支持** - 使用 TypeScript 编写，提供完整的类型定义
- 🔥 **按需加载** - 支持按需导入组件，减小打包体积
- 🎨 **主题定制** - 灵活的主题配置和样式变量
- 📦 **组件丰富** - 30+ 高质量组件，涵盖绝大部分业务场景
- 🌍 **国际化** - 支持多语言配置
- 📒 **文档完善** - 详细的使用文档和示例

## 探索更多

My UI 提供了丰富的组件和功能，满足您的各种需求。

- [设计原则](/guide/design) - 了解 My UI 的设计理念
- [组件文档](/components/button/) - 查看所有组件的使用方法
- [主题定制](/guide/theme) - 自定义组件库主题

<style>
.home-content {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}
</style> 