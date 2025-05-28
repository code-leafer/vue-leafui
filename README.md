# My UI

![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

一个基于 Vue 3 的现代化轻量级组件库，提供企业级应用所需的高质量 UI 组件。

## 特性

- 🛠️ **开箱即用**: 完整的 TypeScript 类型支持，灵活的主题配置和精心设计的组件 API
- ⚡️ **性能优先**: 高效渲染和按需加载，为开发者和用户提供流畅的体验
- 🎨 **美观易用**: 基于设计系统打造，拥有优雅的 UI 和易于使用的交互体验
- 📦 **按需引入**: 支持组件按需引入，减小应用体积
- 🔨 **全面测试**: 单元测试覆盖所有组件，确保稳定性和可靠性

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

### 完整引入

```js
import { createApp } from 'vue'
import MyUI from 'my-ui'
import 'my-ui/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(MyUI)
app.mount('#app')
```

### 按需引入

```vue
<template>
  <my-button type="primary">按钮</my-button>
</template>

<script setup>
import { MyButton } from 'my-ui'
import 'my-ui/dist/index.css'
</script>
```

### 自动导入（推荐）

使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 实现组件自动导入：

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { MyUIResolver } from 'my-ui/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [
        MyUIResolver()
      ]
    })
  ]
})
```

详细使用方法请参考 [快速开始](https://your-domain.com/guide/quickstart) 文档。

## 组件列表

### 基础组件
- Button 按钮
- Icon 图标
- Typography 排版
- Divider 分割线
- Grid 栅格

### 表单组件
- Input 输入框
- Select 选择器
- Checkbox 复选框
- Radio 单选框
- Switch 开关
- DatePicker 日期选择器
- Upload 上传

### 数据展示组件
- Table 表格
- List 列表
- Tabs 标签页
- Carousel 轮播
- Tree 树形控件
- Badge 徽章
- Tag 标签

### 反馈组件
- Modal 对话框
- Message 消息提示
- Notification 通知
- Loading 加载
- Progress 进度条
- Skeleton 骨架屏

### 导航组件
- Menu 导航菜单
- Pagination 分页
- Breadcrumb 面包屑
- Steps 步骤条

## 项目结构

```
component-ui/vue/
├── docs/                # VitePress 文档站点
├── src/                 # 源代码
│   ├── components/      # 组件目录
│   │   ├── button/      # 按钮组件
│   │   ├── tabs/        # 标签页组件
│   │   └── ...          # 其他组件
│   ├── styles/          # 全局样式
│   ├── utils/           # 工具函数
│   └── index.ts         # 库入口文件
├── tests/               # 测试文件
└── package.json         # 项目配置
```

## 本地开发

克隆项目并安装依赖：

```bash
git clone https://github.com/your-username/component-ui.git
cd component-ui/vue
npm install

# 运行开发环境
npm run dev

# 构建组件库
npm run build

# 运行测试
npm run test

# 启动文档站点
cd docs
npm install
npm run dev
```

## 文档

我们使用 VitePress 构建了详细的文档站点，包含每个组件的用法示例和 API 说明。

在本地运行文档：

```bash
cd docs
npm install
npm run dev
```

构建文档站点：

```bash
cd docs
npm run build
```

## 贡献指南

我们非常欢迎你的贡献！

### 贡献流程

1. Fork 本仓库
2. 创建你的特性分支: `git checkout -b feature/amazing-feature`
3. 提交你的更改: `git commit -m 'Add some amazing feature'`
4. 推送到分支: `git push origin feature/amazing-feature`
5. 提交 Pull Request

### 开发规范

- 组件目录结构保持一致：`index.ts`、`src/*`、`README.md`
- 每个组件都应该有完整的单元测试
- 每个组件都应该有详细的文档

### 编码规范

- 使用 TypeScript 编写所有代码
- 遵循项目的 ESLint 和 Prettier 配置
- 确保通过所有单元测试

## 许可证

[MIT License](LICENSE)

## 联系方式

- 问题反馈：[GitHub Issues](https://github.com/your-username/component-ui/issues)
- 邮箱：your-email@example.com 