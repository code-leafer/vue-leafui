# 迁移指南

本指南专为从其他 UI 组件库（如 Element UI、Ant Design Vue 等）迁移到 My UI 的用户而设计，帮助您顺利完成迁移过程。

## 从 Element UI/Element Plus 迁移

My UI 与 Element UI/Element Plus 有类似的设计理念和 API 设计，但也有一些不同之处。

### 安装与引入

Element UI/Element Plus:

```js
// Element UI (Vue 2)
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// Element Plus (Vue 3)
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(ElementPlus)
```

My UI:

```js
import { createApp } from 'vue'
import MyUI from 'my-ui'
import 'my-ui/dist/index.css'
const app = createApp(App)
app.use(MyUI)
```

### 组件前缀对比

Element UI/Element Plus 使用 `el-` 前缀，而 My UI 使用 `my-` 前缀：

```vue
<!-- Element UI/Element Plus -->
<el-button type="primary">按钮</el-button>
<el-input v-model="input" placeholder="请输入内容"></el-input>

<!-- My UI -->
<my-button type="primary">按钮</my-button>
<my-input v-model="input" placeholder="请输入内容"></my-input>
```

### 主要 API 差异

| 组件 | Element UI/Element Plus | My UI | 差异说明 |
| --- | --- | --- | --- |
| Button | `<el-button>` | `<my-button>` | My UI 添加了更多的状态类型 |
| Form | `<el-form>` | `<my-form>` | My UI 简化了表单验证 API |
| Table | `<el-table>` | `<my-table>` | My UI 提供了更简洁的数据加载方式 |
| Select | `<el-select>` | `<my-select>` | My UI 统一了选择器接口 |

### 主题定制对比

Element UI/Element Plus 使用 SCSS 变量进行主题定制，而 My UI 主要使用 CSS 变量：

```scss
// Element UI/Element Plus (SCSS)
$--color-primary: #409EFF;
@import 'element-ui/packages/theme-chalk/src/index.scss';
```

```css
/* My UI (CSS 变量) */
:root {
  --my-primary-color: #409EFF;
}
```

## 从 Ant Design Vue 迁移

My UI 与 Ant Design Vue 在设计风格和组件功能上有一些区别。

### 安装与引入

Ant Design Vue:

```js
// Vue 2
import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

// Vue 3
import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
const app = createApp(App)
app.use(Antd)
```

My UI:

```js
import { createApp } from 'vue'
import MyUI from 'my-ui'
import 'my-ui/dist/index.css'
const app = createApp(App)
app.use(MyUI)
```

### 组件前缀对比

Ant Design Vue 使用 `a-` 前缀，而 My UI 使用 `my-` 前缀：

```vue
<!-- Ant Design Vue -->
<a-button type="primary">按钮</a-button>
<a-input v-model:value="input" placeholder="请输入内容"></a-input>

<!-- My UI -->
<my-button type="primary">按钮</my-button>
<my-input v-model="input" placeholder="请输入内容"></my-input>
```

### 主要 API 差异

| 组件 | Ant Design Vue | My UI | 差异说明 |
| --- | --- | --- | --- |
| Button | `<a-button>` | `<my-button>` | 按钮类型命名不同 |
| Form | `<a-form>` | `<my-form>` | 表单验证和规则写法不同 |
| Layout | `<a-layout>` | `<my-layout>` | My UI 的布局组件配置更灵活 |
| Modal | `<a-modal>` | `<my-modal>` | My UI 提供了更简单的对话框调用方式 |

### 常见组件对应关系

| Ant Design Vue | My UI |
| --- | --- |
| `<a-button>` | `<my-button>` |
| `<a-input>` | `<my-input>` |
| `<a-select>` | `<my-select>` |
| `<a-menu>` | `<my-menu>` |
| `<a-checkbox>` | `<my-checkbox>` |
| `<a-radio>` | `<my-radio>` |
| `<a-table>` | `<my-table>` |
| `<a-date-picker>` | `<my-date-picker>` |
| `<a-modal>` | `<my-modal>` |
| `<a-form>` | `<my-form>` |

## 从 Vuetify 迁移

Vuetify 是一个基于 Material Design 的组件库，与 My UI 在设计风格上有较大差异。

### 安装与引入

Vuetify:

```js
// Vue 2
import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

// Vue 3
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'
const vuetify = createVuetify()
const app = createApp(App)
app.use(vuetify)
```

My UI:

```js
import { createApp } from 'vue'
import MyUI from 'my-ui'
import 'my-ui/dist/index.css'
const app = createApp(App)
app.use(MyUI)
```

### 组件前缀对比

Vuetify 使用 `v-` 前缀，而 My UI 使用 `my-` 前缀：

```vue
<!-- Vuetify -->
<v-btn color="primary">按钮</v-btn>
<v-text-field v-model="input" label="请输入内容"></v-text-field>

<!-- My UI -->
<my-button type="primary">按钮</my-button>
<my-input v-model="input" placeholder="请输入内容"></my-input>
```

### 主要 API 差异

| 组件 | Vuetify | My UI | 差异说明 |
| --- | --- | --- | --- |
| Button | `<v-btn>` | `<my-button>` | 属性名称不同：color → type |
| Input | `<v-text-field>` | `<my-input>` | 属性名称不同：label → placeholder |
| Icon | `<v-icon>` | `<my-icon>` | 图标系统不同 |
| Dialog | `<v-dialog>` | `<my-modal>` | My UI 的对话框更接近传统模态框 |

## 迁移工具和策略

### 批量替换

可以使用 VS Code 的批量替换功能，批量替换组件前缀和常见属性名：

1. 打开替换面板 (Ctrl+H/Cmd+H)
2. 启用正则表达式
3. 搜索：`<el-(\w+)|:el-(\w+)`（针对 Element UI）
4. 替换：`<my-$1|:my-$2`

### 渐进式迁移

对于大型项目，可以采用渐进式迁移策略：

1. 先使用 My UI 和原组件库并存
2. 从常用基础组件（如按钮、输入框）开始替换
3. 逐页面或逐模块迁移
4. 最后移除原组件库依赖

### 兼容层方案

如果有大量自定义组件基于原组件库，可以考虑编写兼容层：

```js
// element-compat.js
import { MyButton, MyInput /* 其他组件 */ } from 'my-ui'

export const ElButton = {
  name: 'ElButton',
  setup(props, { slots }) {
    return () => h(MyButton, mapProps(props), slots)
  }
}

// 映射属性
function mapProps(props) {
  // 处理可能的属性名差异
  return { ...props }
}
```

## 常见问题

### 样式冲突

**问题**：迁移过程中可能遇到样式冲突问题

**解决方案**：
- 使用具体的选择器提高 CSS 优先级
- 使用 CSS 作用域（如 scoped 样式或 CSS Modules）
- 在开发者工具中检查并调试冲突样式

### 功能差异

**问题**：部分组件功能在 My UI 中不存在或实现方式不同

**解决方案**：
- 查阅 My UI 文档，了解替代方案
- 使用组合方式实现类似功能
- 必要时可以基于 My UI 基础组件封装所需功能

### 性能问题

**问题**：迁移后可能出现性能下降

**解决方案**：
- 确保移除了旧组件库的依赖
- 使用 Vue DevTools 检查组件渲染情况
- 使用 My UI 的按需导入功能减小包体积

## 迁移示例

### 表单示例

Element UI 表单:

```vue
<el-form :model="form" :rules="rules" ref="formRef">
  <el-form-item label="用户名" prop="username">
    <el-input v-model="form.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="form.password" type="password"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">提交</el-button>
  </el-form-item>
</el-form>
```

迁移到 My UI:

```vue
<my-form :model="form" :rules="rules" ref="formRef">
  <my-form-item label="用户名" prop="username">
    <my-input v-model="form.username"></my-input>
  </my-form-item>
  <my-form-item label="密码" prop="password">
    <my-input v-model="form.password" type="password"></my-input>
  </my-form-item>
  <my-form-item>
    <my-button type="primary" @click="submitForm">提交</my-button>
  </my-form-item>
</my-form>
```

## 获取帮助

如果在迁移过程中遇到问题，可以通过以下方式获取帮助：

- 查阅 [My UI 文档](/)
- 在 [GitHub](https://github.com/my-ui/my-ui/issues) 提交 Issue
- 加入我们的社区讨论组（微信/Discord）
- 参考[常见问题](/guide/faq)页面 