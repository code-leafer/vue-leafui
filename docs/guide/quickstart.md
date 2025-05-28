# 快速开始

本节将介绍如何在项目中使用 My UI 组件库。

## 安装

### 使用包管理器安装

我们推荐使用包管理器（如 NPM、Yarn 或 PNPM）安装 My UI：

```bash
# 使用 npm
npm install my-ui-lib

# 使用 yarn
yarn add my-ui-lib

# 使用 pnpm
pnpm add my-ui-lib
```

## 完整引入

如果你想要完整引入所有组件，可以在入口文件中导入并使用：

```ts
// main.ts
import { createApp } from 'vue'
import MyUI from 'my-ui-lib'
import 'my-ui-lib/dist/index.css'
import App from './App.vue'

const app = createApp(App)
app.use(MyUI)
app.mount('#app')
```

这样会注册所有组件为全局组件，可以在任何地方直接使用。

## 按需引入

如果你只想引入部分组件以减小打包体积，可以直接导入对应组件：

### 方式一：直接导入（推荐）

```vue
<template>
  <my-button type="primary">按钮</my-button>
  <my-input v-model="inputValue" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'
import { MyButton, MyInput } from 'my-ui-lib'
import 'my-ui-lib/dist/index.css'

const inputValue = ref('')
</script>
```

### 方式二：在组件中注册

```vue
<template>
  <div>
    <my-button type="primary">按钮</my-button>
    <my-input v-model="inputValue" placeholder="请输入内容" />
  </div>
</template>

<script>
import { MyButton, MyInput } from 'my-ui-lib'
import 'my-ui-lib/dist/index.css'

export default {
  components: {
    MyButton,
    MyInput
  },
  data() {
    return {
      inputValue: ''
    }
  }
}
</script>
```

### 方式三：通过 app.component 注册

```ts
import { createApp } from 'vue'
import App from './App.vue'
import { MyButton, MyInput } from 'my-ui-lib'
import 'my-ui-lib/dist/index.css'

const app = createApp(App)
app.component('MyButton', MyButton)
app.component('MyInput', MyInput)
app.mount('#app')
```

## 自动导入（推荐）

使用 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components) 可以实现组件的自动导入。

安装相关依赖：

```bash
npm install -D unplugin-vue-components
```

在 Vite 或 Webpack 配置中添加：

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { MyUIResolver } from 'my-ui-lib/resolvers'

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

之后你可以直接在模板中使用组件，无需导入：

```vue
<template>
  <my-button type="primary">按钮</my-button>
  <my-input v-model="inputValue" placeholder="请输入"></my-input>
</template>

<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>
```

## 在项目中使用组件

以下是一些常用组件的使用示例：

### 按钮组件

```vue
<template>
  <div class="button-demo">
    <!-- 基础按钮 -->
    <my-button>默认按钮</my-button>
    <my-button type="primary">主要按钮</my-button>
    <my-button type="success">成功按钮</my-button>
    <my-button type="warning">警告按钮</my-button>
    <my-button type="danger">危险按钮</my-button>
    
    <!-- 朴素按钮 -->
    <my-button plain>朴素按钮</my-button>
    <my-button type="primary" plain>主要按钮</my-button>
    
    <!-- 圆角按钮 -->
    <my-button round>圆角按钮</my-button>
    
    <!-- 禁用状态 -->
    <my-button disabled>禁用按钮</my-button>
    
    <!-- 加载状态 -->
    <my-button loading>加载中</my-button>
    
    <!-- 不同尺寸 -->
    <my-button size="large">大型按钮</my-button>
    <my-button>默认按钮</my-button>
    <my-button size="small">小型按钮</my-button>
    
    <!-- 带图标 -->
    <my-button icon="my-icon-edit">编辑</my-button>
    
    <!-- 事件处理 -->
    <my-button @click="handleClick">点击事件</my-button>
  </div>
</template>

<script setup>
const handleClick = () => {
  alert('按钮被点击了！')
}
</script>
```

### 输入框组件

```vue
<template>
  <div class="input-demo">
    <!-- 基础输入框 -->
    <my-input v-model="input1" placeholder="请输入内容" />
    
    <!-- 禁用状态 -->
    <my-input v-model="input2" disabled placeholder="禁用状态" />
    
    <!-- 可清空 -->
    <my-input v-model="input3" clearable placeholder="可清空" />
    
    <!-- 密码框 -->
    <my-input v-model="password" show-password placeholder="请输入密码" />
    
    <!-- 带图标 -->
    <my-input v-model="input4" prefix-icon="my-icon-search" placeholder="搜索" />
    
    <!-- 不同尺寸 -->
    <my-input v-model="input5" size="large" placeholder="大型输入框" />
    <my-input v-model="input6" placeholder="默认输入框" />
    <my-input v-model="input7" size="small" placeholder="小型输入框" />
    
    <!-- 字数限制 -->
    <my-input v-model="input8" maxlength="20" show-word-limit placeholder="最多输入20个字符" />
    
    <!-- 事件处理 -->
    <my-input 
      v-model="input9" 
      placeholder="监听事件" 
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('可清空内容')
const password = ref('')
const input4 = ref('')
const input5 = ref('')
const input6 = ref('')
const input7 = ref('')
const input8 = ref('')
const input9 = ref('')

const handleInput = (value) => {
  console.log('输入值:', value)
}

const handleFocus = (event) => {
  console.log('获得焦点:', event)
}

const handleBlur = (event) => {
  console.log('失去焦点:', event)
}

const handleClear = () => {
  console.log('内容已清空')
}
</script>

<style scoped>
.input-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
}
</style>
```

## 关于组件属性和事件

每个组件都有特定的属性和事件，可以参考对应组件的文档页面获取详细信息：

- [Button 按钮](/components/button/)
- [Input 输入框](/components/input/)
- [其他组件...]

## 主题定制

关于组件库的主题定制，请参考[主题定制指南](/guide/theme.html)。 