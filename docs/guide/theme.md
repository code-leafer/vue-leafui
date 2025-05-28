# 主题定制

My UI 提供了完善的主题定制能力，您可以根据项目需求自定义组件库的主题风格。

## 基础变量

My UI 使用 CSS 变量定义了一套基础的设计变量，包括颜色、字体、圆角、阴影等。您可以通过覆盖这些 CSS 变量来实现主题定制。

```css
:root {
  /* 品牌色 */
  --my-primary-color: #409eff;
  --my-success-color: #67c23a;
  --my-warning-color: #e6a23c;
  --my-danger-color: #f56c6c;
  --my-info-color: #909399;

  /* 文字颜色 */
  --my-text-color-primary: #303133;
  --my-text-color-regular: #606266;
  --my-text-color-secondary: #909399;
  --my-text-color-placeholder: #c0c4cc;

  /* 边框颜色 */
  --my-border-color: #dcdfe6;
  --my-border-color-light: #e4e7ed;
  --my-border-color-lighter: #ebeef5;
  --my-border-color-extra-light: #f2f6fc;

  /* 填充颜色 */
  --my-bg-color: #ffffff;
  --my-bg-color-page: #f2f3f5;
  --my-bg-color-overlay: #ffffff;

  /* 圆角 */
  --my-border-radius-small: 2px;
  --my-border-radius-base: 4px;
  --my-border-radius-large: 8px;
  --my-border-radius-round: 20px;
  --my-border-radius-circle: 100%;

  /* 阴影 */
  --my-box-shadow-base: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  --my-box-shadow-light: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  /* 字体 */
  --my-font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", 
                   "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  --my-font-size-extra-small: 12px;
  --my-font-size-small: 13px;
  --my-font-size-base: 14px;
  --my-font-size-medium: 16px;
  --my-font-size-large: 18px;
  --my-font-size-extra-large: 20px;

  /* 动画 */
  --my-transition-duration: 0.3s;
  --my-transition-timing-function: ease-in-out;
}
```

## 使用方法

### 方法一：全局覆盖变量

在您的入口 CSS 文件中覆盖 CSS 变量：

```css
:root {
  --my-primary-color: #6366f1; /* 自定义主色调 */
  --my-border-radius-base: 6px; /* 自定义圆角 */
  --my-font-family: 'Inter', sans-serif; /* 自定义字体 */
}
```

### 方法二：使用主题配置

My UI 提供了主题配置功能，您可以通过 JS 的方式设置主题：

```js
import { createApp } from 'vue'
import MyUI from 'my-ui'
import App from './App.vue'

const app = createApp(App)

// 自定义主题
MyUI.setTheme({
  primaryColor: '#6366f1',
  borderRadius: {
    base: '6px',
    small: '3px',
    large: '10px'
  },
  fontFamily: "'Inter', sans-serif"
})

app.use(MyUI)
app.mount('#app')
```

### 方法三：暗色主题

My UI 内置了暗色主题支持，您可以通过调用 API 或添加 HTML 属性切换暗色主题：

```js
// 在 JS 中切换暗色主题
import { toggleDarkMode } from 'my-ui'

// 切换暗色模式
toggleDarkMode()

// 或直接设置
setDarkMode(true) // 开启暗色模式
setDarkMode(false) // 关闭暗色模式
```

您也可以直接在 HTML 中添加 `dark` 类或属性：

```html
<!-- 方法一：添加 class -->
<html class="dark">
  <!-- ... -->
</html>

<!-- 方法二：添加 data 属性 -->
<html data-theme="dark">
  <!-- ... -->
</html>
```

## 主题切换示例

以下是一个实现主题切换的简单示例：

```vue
<template>
  <div>
    <my-button @click="toggleTheme">切换主题</my-button>
    <div class="theme-preview">
      <my-button type="primary">主要按钮</my-button>
      <my-button type="success">成功按钮</my-button>
      <my-button type="warning">警告按钮</my-button>
      <my-button type="danger">危险按钮</my-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { toggleDarkMode } from 'my-ui'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  toggleDarkMode()
}
</script>

<style>
.theme-preview {
  margin-top: 20px;
  padding: 20px;
  border-radius: var(--my-border-radius-base);
  background-color: var(--my-bg-color-page);
  transition: background-color var(--my-transition-duration);
}
</style>
```

## 自定义组件样式

除了全局主题配置，您还可以针对特定组件进行样式自定义：

### 使用 CSS 覆盖

```css
/* 自定义按钮样式 */
.my-button {
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* 自定义特定类型按钮 */
.my-button--primary {
  background: linear-gradient(45deg, var(--my-primary-color), #7a7af9);
}
```

### 使用 SCSS 变量

如果您的项目使用 SCSS，可以利用 SCSS 变量进行更深度的定制：

```scss
// 引入变量文件
@import 'my-ui/styles/variables.scss';

// 覆盖变量
$primary-color: #6366f1;
$border-radius: 6px;

// 引入组件样式
@import 'my-ui/styles/index.scss';
```

## 高级定制

如果您需要更深度的主题定制，可以参考以下方法：

1. 自定义组件：基于 My UI 的基础组件封装自定义组件
2. 扩展主题：创建完整的自定义主题包
3. 二次开发：基于 My UI 源码进行二次开发

更多高级定制方法，请参考 [进阶指南](#) 或联系我们获取支持。 