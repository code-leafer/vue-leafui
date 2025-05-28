# 风格指南

为了让您的应用程序代码更易于维护和阅读，我们建议遵循以下风格指南，这些建议基于 Vue.js 的官方风格指南，并针对 My UI 组件库做了特定的调整。

## 组件命名

### 组件标签名称

使用 My UI 组件时，我们建议遵循以下命名约定：

- **使用连字符命名法**：所有 My UI 组件都使用连字符连接的小写标签名，如 `<my-button>`、`<my-input>`
- **保持前缀一致**：始终使用 `my-` 前缀以区分 My UI 组件和原生 HTML 元素

```vue
<!-- 推荐 -->
<my-button type="primary">提交</my-button>
<my-input v-model="username"></my-input>

<!-- 不推荐 -->
<MyButton type="primary">提交</MyButton>
<myInput v-model="username"></myInput>
```

### 自定义组件

当您基于 My UI 创建自己的组件时，我们建议：

- **使用 PascalCase 命名自定义组件**：这样可以与 My UI 组件区分
- **避免单个单词命名**：防止与现有或未来的 HTML 元素冲突

```vue
<!-- 推荐 -->
<UserProfile />
<OrderTable />

<!-- 不推荐 -->
<user-profile></user-profile>
<order></order>
```

## 属性命名与使用

### 属性命名规范

- **使用小驼峰命名法**：对于自定义属性，使用小驼峰命名法
- **布尔属性**：对于布尔类型的属性，使用 `is-*` 或 `has-*` 前缀命名

```vue
<!-- 推荐 -->
<my-button :isDisabled="true" :hasIcon="true"></my-button>

<!-- 不推荐 -->
<my-button :disabled_prop="true" :icon_visible="true"></my-button>
```

### 属性顺序

为了保持代码一致性，建议按以下顺序书写属性：

1. 定义 (`is-*`)
2. 列表渲染 (`v-for`)
3. 条件渲染 (`v-if`, `v-else-if`, `v-else`, `v-show`, `v-cloak`)
4. 双向绑定 (`v-model`)
5. 其他属性 (按字母顺序)
6. 事件 (`@click`, `@input` 等)
7. 内容 (`v-html`, `v-text`)

```vue
<my-input
  v-if="isVisible"
  v-model="userData.name"
  :placeholder="$t('form.namePlaceholder')"
  :rules="nameRules"
  @input="validateName"
></my-input>
```

## 事件处理

### 事件命名

- **使用 kebab-case 命名事件**：遵循 Vue.js 的惯例
- **避免缩写**：事件名应该是完整的词组，表明其功能

```vue
<!-- 推荐 -->
<my-form @submit-success="handleSubmitSuccess"></my-form>

<!-- 不推荐 -->
<my-form @submitOk="handleSubmitSuccess"></my-form>
```

### 事件处理函数命名

- **使用 `handle*` 前缀**：事件处理函数使用 `handle` 前缀，后接事件描述
- **保持一致性**：组件内部使用统一的命名方式

```vue
<script setup>
// 推荐
const handleClick = () => {
  // ...
}

const handleSubmit = () => {
  // ...
}

// 不推荐
const onClick = () => {
  // ...
}

const submitForm = () => {
  // ...
}
</script>
```

## 表单相关规范

### 表单元素绑定

- **始终使用 v-model**：对于表单元素，始终使用 `v-model` 进行双向绑定
- **表单验证**：使用 My UI 的表单验证机制，避免自定义验证逻辑

```vue
<!-- 推荐 -->
<my-form :model="form" :rules="rules" ref="formRef">
  <my-form-item prop="name" label="姓名">
    <my-input v-model="form.name"></my-input>
  </my-form-item>
</my-form>

<!-- 不推荐 -->
<my-form>
  <my-form-item label="姓名">
    <my-input :value="form.name" @input="form.name = $event"></my-input>
  </my-form-item>
</my-form>
```

### 表单提交

- **使用表单引用进行验证**：使用组件实例方法进行表单验证
- **处理验证结果**：使用 Promise 或回调函数处理验证结果

```vue
<script setup>
import { ref } from 'vue'

const formRef = ref(null)
const form = ref({ name: '', email: '' })

const handleSubmit = async () => {
  try {
    await formRef.value.validate()
    // 验证通过，提交表单
    submitFormData(form.value)
  } catch (error) {
    // 验证失败，处理错误
    console.error('表单验证失败', error)
  }
}
</script>
```

## 响应式数据处理

### 使用组合式 API

当使用 Vue 3 和 My UI 时，我们建议使用组合式 API：

- **使用 ref 和 reactive**：根据数据类型选择适当的响应式 API
- **解构时保持响应性**：解构 reactive 对象时，使用 `toRefs` 保持响应性

```vue
<script setup>
import { ref, reactive, toRefs } from 'vue'

// 推荐
const count = ref(0)
const form = reactive({
  name: '',
  email: ''
})

// 需要解构时
const { name, email } = toRefs(form)

// 不推荐
const state = {
  count: 0,
  name: '',
  email: ''
}
</script>
```

### 计算属性

- **使用计算属性**：对于依赖其他数据的派生状态，使用计算属性
- **保持简单性**：计算属性应该是纯函数，避免副作用

```vue
<script setup>
import { ref, computed } from 'vue'

const firstName = ref('')
const lastName = ref('')

// 推荐
const fullName = computed(() => {
  return `${firstName.value} ${lastName.value}`.trim()
})

// 不推荐
const getFullName = () => {
  return `${firstName.value} ${lastName.value}`.trim()
}
</script>
```

## 组件通信

### Props 定义

- **明确类型**：为每个 prop 明确指定类型
- **提供默认值**：尽可能为非必需的 props 提供默认值
- **使用 camelCase 命名 props**：与 JavaScript 变量命名保持一致

```vue
<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  // 推荐
  title: {
    type: String,
    required: true
  },
  showHeader: {
    type: Boolean,
    default: true
  },
  userData: {
    type: Object,
    default: () => ({})
  },
  
  // 不推荐
  'item-list': Array, // 没有指定默认值和是否必需
  flag: Boolean // 命名不清晰
})
</script>
```

### 组件事件

- **明确事件数据**：触发事件时，提供必要的数据
- **使用 emits 选项**：明确声明组件可能触发的事件

```vue
<script setup>
import { defineEmits } from 'vue'

const emit = defineEmits(['update:modelValue', 'change', 'blur'])

function handleInput(value) {
  emit('update:modelValue', value)
  emit('change', {
    value,
    timestamp: Date.now()
  })
}
</script>
```

## 样式规范

### 组件样式隔离

- **使用 scoped 样式**：为组件样式添加 scoped 属性，避免样式泄漏
- **使用 CSS 变量**：利用 My UI 提供的 CSS 变量进行样式定制

```vue
<style scoped>
/* 推荐 */
.component-container {
  color: var(--my-text-color-primary);
  background-color: var(--my-bg-color);
}

/* 不推荐 */
.component-container {
  color: #303133; /* 硬编码颜色值 */
}
</style>
```

### 样式命名

- **使用 BEM 命名**：采用 Block-Element-Modifier 命名规范
- **避免使用 ID 选择器**：优先使用类选择器

```vue
<style scoped>
/* 推荐 */
.user-card {
  /* 块样式 */
}

.user-card__header {
  /* 元素样式 */
}

.user-card--highlighted {
  /* 修饰符样式 */
}

/* 不推荐 */
#user-card {
  /* 使用 ID 选择器 */
}

.header {
  /* 命名不够具体，可能导致冲突 */
}
</style>
```

## 最佳实践

### 组件封装

- **保持组件单一职责**：一个组件应该只做一件事
- **提取重复逻辑**：将重复的逻辑提取到可复用的组合函数中

```vue
<!-- 推荐：单一职责组件 -->
<UserAvatar :src="user.avatar" :size="size" />
<UserInfo :name="user.name" :email="user.email" />

<!-- 不推荐：职责过多的组件 -->
<UserCard 
  :avatar="user.avatar" 
  :name="user.name" 
  :email="user.email"
  :roles="user.roles"
  :lastLogin="user.lastLogin"
  :status="user.status"
  @edit="handleEdit"
  @delete="handleDelete"
/>
```

### 性能优化

- **合理使用 v-show 和 v-if**：根据显示/隐藏频率选择适当的指令
- **避免不必要的计算**：使用 computed 和 watch 时注意依赖项
- **使用 defineAsyncComponent**：对于大型组件，使用异步加载

```vue
<script setup>
import { defineAsyncComponent } from 'vue'

// 推荐：异步加载大型组件
const HeavyComponent = defineAsyncComponent(() => 
  import('./HeavyComponent.vue')
)
</script>

<template>
  <!-- 根据显示/隐藏频率选择 -->
  <div v-if="rarely">仅在满足条件时才渲染的内容</div>
  <div v-show="frequently">经常切换显示状态的内容</div>
</template>
```

### 国际化

- **使用 My UI 国际化方案**：配合 Vue I18n 使用 My UI 的国际化功能
- **避免硬编码文本**：所有用户可见的文本应使用国际化函数

```vue
<template>
  <!-- 推荐 -->
  <my-button>{{ $t('buttons.submit') }}</my-button>
  
  <!-- 不推荐 -->
  <my-button>提交</my-button>
</template>
```

## 可访问性指南

为了确保您的应用程序对所有用户可访问，包括使用辅助技术的用户，请遵循以下准则：

- **提供替代文本**：为图像和图标提供有意义的替代文本
- **使用语义化标签**：使用适当的 HTML 标签表达内容的语义
- **确保键盘可访问性**：所有交互元素应该可以通过键盘访问
- **使用适当的颜色对比度**：确保文本和背景之间有足够的对比度

```vue
<!-- 推荐 -->
<my-button aria-label="提交表单">
  <my-icon name="check" aria-hidden="true"></my-icon>
  提交
</my-button>

<!-- 不推荐 -->
<my-button>
  <my-icon name="check"></my-icon>
</my-button>
```

## 总结

遵循本风格指南，可以帮助您创建一致、可维护且高质量的代码，提高团队协作效率，并确保最终用户获得良好的体验。

My UI 组件库的设计考虑了上述最佳实践，遵循这些规范可以充分发挥组件库的优势，构建出色的应用程序。 