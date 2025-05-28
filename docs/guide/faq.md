# 常见问题

这里收集了使用 My UI 时常见的问题和解答。如果您在使用过程中遇到问题，可以先查阅本页面。

## 安装和使用相关

### Q: 如何按需引入组件？

**A**: My UI 支持多种按需引入方式：

1. **手动引入**：直接从包中引入需要的组件

```js
import { MyButton, MyInput } from 'my-ui'
import 'my-ui/es/button/style'
import 'my-ui/es/input/style'
```

2. **使用自动导入插件**：

```js
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { MyUIResolver } from 'my-ui/resolvers'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [MyUIResolver()],
    }),
    Components({
      resolvers: [MyUIResolver()],
    }),
  ],
})
```

### Q: 为什么我的项目中使用 My UI 出现样式丢失问题？

**A**: 可能的原因和解决方案：

1. 确认已引入样式文件：`import 'my-ui/dist/index.css'`
2. 检查是否有 CSS 重置样式覆盖了组件样式
3. 检查项目中的 CSS 优先级是否较高
4. 确认构建工具配置正确，没有排除 CSS 文件

### Q: 如何在 Nuxt 3 项目中使用 My UI？

**A**: 在 Nuxt 3 项目中使用 My UI，需要进行以下配置：

```js
// nuxt.config.js
export default defineNuxtConfig({
  modules: ['@nuxtjs/myui'],
  myui: {
    // 配置选项
    importStyle: true,
    components: ['Button', 'Input'] // 按需引入组件
  },
  // 或者手动配置
  build: {
    transpile: ['my-ui']
  }
})
```

## 组件相关问题

### Q: 如何自定义组件主题？

**A**: My UI 提供了多种主题定制方式：

1. **CSS 变量覆盖**：在全局样式中覆盖 CSS 变量
2. **使用 API 设置主题**：通过 `MyUI.setTheme()` 方法设置
3. **使用 SCSS 覆盖**：如果使用 SCSS，可以在引入前覆盖变量

详细指南请参考 [主题定制](/guide/theme) 文档。

### Q: Form 表单如何进行自定义校验？

**A**: 可以通过自定义校验规则函数实现：

```js
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (ruleForm.checkPass !== '') {
      // 对第二个密码框单独验证
      formRef.value.validateField('checkPass')
    }
    callback()
  }
}

const rules = {
  pass: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: validatePass, trigger: 'blur' }
  ]
}
```

### Q: Table 组件如何实现服务端分页？

**A**: 使用 Table 组件的 `remote` 属性，并监听分页事件：

```vue
<template>
  <my-table
    :data="tableData"
    :total="total"
    :page-size="pageSize"
    :current-page="currentPage"
    remote
    @page-change="handlePageChange"
    @size-change="handleSizeChange"
  >
    <!-- 表格列配置 -->
  </my-table>
</template>

<script setup>
import { ref } from 'vue'

const tableData = ref([])
const total = ref(0)
const pageSize = ref(10)
const currentPage = ref(1)

// 获取表格数据
async function fetchTableData() {
  const { data, total: totalCount } = await api.getList({
    page: currentPage.value,
    pageSize: pageSize.value
  })
  tableData.value = data
  total.value = totalCount
}

// 页码变化
const handlePageChange = (page) => {
  currentPage.value = page
  fetchTableData()
}

// 每页条数变化
const handleSizeChange = (size) => {
  pageSize.value = size
  currentPage.value = 1
  fetchTableData()
}

// 初始加载数据
fetchTableData()
</script>
```

### Q: 如何在 Modal 中使用表单？

**A**: 在 Modal 中使用表单时，需要注意以下几点：

1. 确保表单的提交不会触发 Modal 的关闭
2. 在 Modal 关闭后重置表单
3. 表单验证后再关闭 Modal

```vue
<template>
  <my-button @click="openModal">打开表单</my-button>
  
  <my-modal v-model="modalVisible" title="表单" @close="resetForm">
    <my-form :model="form" :rules="rules" ref="formRef">
      <!-- 表单内容 -->
    </my-form>
    
    <template #footer>
      <my-button @click="modalVisible = false">取消</my-button>
      <my-button type="primary" @click="submitForm">确定</my-button>
    </template>
  </my-modal>
</template>

<script setup>
import { ref } from 'vue'

const modalVisible = ref(false)
const form = ref({ /* 表单数据 */ })
const formRef = ref(null)

const openModal = () => {
  modalVisible.value = true
}

const submitForm = async () => {
  try {
    await formRef.value.validate()
    // 表单验证通过，提交表单
    // ...
    modalVisible.value = false
  } catch (error) {
    // 表单验证失败
    console.error('表单验证失败', error)
  }
}

const resetForm = () => {
  formRef.value?.resetFields()
}
</script>
```

## 性能优化

### Q: 如何减小打包体积？

**A**: 可以通过以下方式减小 My UI 在项目中的打包体积：

1. **按需引入组件**：仅引入需要的组件和样式
2. **使用 Tree Shaking**：确保构建工具支持并开启 Tree Shaking
3. **优化依赖**：检查并移除不必要的依赖
4. **配置 Babel 插件**：使用 `babel-plugin-import` 实现自动按需引入

### Q: Table 组件数据量大时如何优化性能？

**A**: 对于大数据量表格，可以采用以下优化措施：

1. **虚拟滚动**：使用 `virtual` 属性启用虚拟滚动
2. **分页加载**：使用分页控制一次加载的数据量
3. **懒加载**：对于树形表格，使用懒加载方式加载子节点
4. **减少不必要的渲染**：使用 `v-memo` 或 `memo` 包装组件避免不必要的重渲染

```vue
<my-table
  :data="tableData"
  :total="total"
  :page-size="10"
  pagination
  virtual
  height="400px"
>
  <!-- 表格列 -->
</my-table>
```

## 浏览器兼容性

### Q: My UI 支持哪些浏览器？

**A**: My UI 支持以下浏览器的现代版本：

- Chrome
- Firefox
- Safari
- Edge
- Opera

由于使用了现代 JavaScript 特性和 CSS 变量，My UI 不支持 IE 浏览器。

### Q: 在低版本浏览器中使用 My UI 时出现样式问题，如何解决？

**A**: 建议使用 Autoprefixer 和 PostCSS 处理 CSS 兼容性问题：

```js
// postcss.config.js
module.exports = {
  plugins: [
    require('autoprefixer')({
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'not ie <= 11'
      ]
    })
  ]
}
```

## 其他常见问题

### Q: 如何将 My UI 与其他 UI 库一起使用？

**A**: 可以同时使用多个 UI 库，但需要注意以下几点：

1. **样式冲突**：不同库的样式可能会冲突，需要适当隔离
2. **组件命名冲突**：避免组件名冲突，可以使用组件别名
3. **功能重复**：避免引入功能重复的组件，增加不必要的体积

```js
// 使用别名解决命名冲突
import { Button as MyButton } from 'my-ui'
import { Button as OtherButton } from 'other-ui'
```

### Q: 在 TypeScript 项目中使用 My UI 时，如何获得完整的类型提示？

**A**: My UI 提供了完整的 TypeScript 类型定义。确保按以下方式导入：

```ts
// 自动获得类型提示
import { MyButton } from 'my-ui'

// 如果需要手动导入类型
import type { ButtonProps, ButtonInstance } from 'my-ui'
```

对于使用 Volar 插件的 Vue 项目，可以启用组件类型自动导入：

```json
// tsconfig.json
{
  "compilerOptions": {
    "types": ["my-ui/global"]
  }
}
```

### Q: 如何参与 My UI 的开发和贡献？

**A**: 我们非常欢迎社区贡献！您可以通过以下方式参与：

1. 在 GitHub 上 Fork 仓库并提交 Pull Request
2. 报告 Bug 或提出功能建议
3. 改进文档或编写教程
4. 参与社区讨论

详细的贡献指南请参考我们的 [贡献指南](https://github.com/my-ui/my-ui/blob/main/CONTRIBUTING.md)。

### Q: 是否支持服务端渲染 (SSR)？

**A**: 是的，My UI 完全支持服务端渲染。在 Nuxt.js 等 SSR 框架中使用时，需要进行适当配置：

```js
// nuxt.config.js (Nuxt 3)
export default defineNuxtConfig({
  build: {
    transpile: ['my-ui']
  }
})
```

如果您有其他问题，欢迎在 [GitHub Issues](https://github.com/my-ui/my-ui/issues) 中提问或查看已有的问题解答。 