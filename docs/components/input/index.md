# Input 输入框

通过鼠标或键盘输入字符。

## 基础用法

:::demo
```vue
<template>
  <my-input v-model="input" placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>
```
:::

## 禁用状态

通过 `disabled` 属性指定是否禁用 input 组件

:::demo
```vue
<template>
  <my-input v-model="input" disabled placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>
```
:::

## 只读状态

通过 `readonly` 属性指定是否为只读状态。

:::demo
```vue
<template>
  <my-input v-model="input" readonly placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'

const input = ref('只读内容')
</script>
```
:::

## 可清空

使用 `clearable` 属性即可得到一个可清空的输入框

:::demo
```vue
<template>
  <my-input v-model="input" clearable placeholder="请输入内容" />
</template>

<script setup>
import { ref } from 'vue'

const input = ref('可清空内容')
</script>
```
:::

## 密码框

使用 `show-password` 属性即可得到一个可切换显示隐藏的密码框

:::demo
```vue
<template>
  <my-input v-model="input" show-password placeholder="请输入密码" />
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>
```
:::

## 带图标的输入框

通过 `prefix-icon` 和 `suffix-icon` 属性可以在输入框前后添加图标。

:::demo
```vue
<template>
  <div class="demo-input-suffix">
    <my-input v-model="input1" prefix-icon="my-icon-search" placeholder="请输入内容" />
    <my-input v-model="input2" suffix-icon="my-icon-calendar" placeholder="请选择日期" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input1 = ref('')
const input2 = ref('')
</script>

<style>
.demo-input-suffix {
  display: flex;
  width: 100%;
  gap: 10px;
}
</style>
```
:::

## 不同尺寸

通过 `size` 属性指定输入框的尺寸，支持 `large`、`default` 和 `small` 三种尺寸。

:::demo
```vue
<template>
  <div class="demo-input-size">
    <my-input v-model="input1" size="large" placeholder="请输入内容" />
    <my-input v-model="input2" placeholder="请输入内容" />
    <my-input v-model="input3" size="small" placeholder="请输入内容" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input1 = ref('')
const input2 = ref('')
const input3 = ref('')
</script>

<style>
.demo-input-size {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
```
:::

## 显示输入字数统计

:::demo 通过设置 `show-word-limit` 属性和 `maxlength` 属性，可以显示输入的字数统计。
```vue
<template>
  <my-input
    v-model="input"
    maxlength="20"
    show-word-limit
    placeholder="请输入内容"
  />
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
</script>
```
:::

## API

### Attributes

| 属性名        | 说明         | 类型                       | 可选值                    | 默认值  |
|-------------|------------|--------------------------|------------------------|------|
| type        | 类型         | string                   | text / password / number / email / tel / url | text |
| model-value / v-model | 绑定值       | string / number           | —                  | —    |
| placeholder | 输入框占位文本    | string                   | —                      | —    |
| size        | 输入框尺寸      | string                   | large / default / small  | default |
| disabled    | 是否禁用       | boolean                  | —                      | false |
| readonly    | 是否只读       | boolean                  | —                      | false |
| clearable   | 是否可清空      | boolean                  | —                      | false |
| show-password | 是否显示切换密码图标 | boolean                  | —                      | false |
| prefix-icon | 输入框头部图标    | string                   | —                      | —    |
| suffix-icon | 输入框尾部图标    | string                   | —                      | —    |
| maxlength   | 最大输入长度     | number                   | —                      | —    |
| minlength   | 最小输入长度     | number                   | —                      | —    |
| show-word-limit | 是否显示输入字数统计 | boolean                  | —                      | false |
| validate-event | 输入时是否触发表单的校验 | boolean                  | —                      | true  |

### Events

| 事件名称  | 说明                    | 回调参数                  |
|-------|------------------------|------------------------|
| input | 在 Input 值改变时触发        | (value: string/number) => void |
| change | 仅在输入框失去焦点或用户按下回车时触发 | (value: string/number) => void |
| focus | 在 Input 获得焦点时触发       | (event: FocusEvent) => void |
| blur  | 在 Input 失去焦点时触发       | (event: FocusEvent) => void |
| clear | 在点击由 `clearable` 属性生成的清空按钮时触发 | () => void |

### Methods

| 方法名   | 说明              | 参数 |
|-------|-----------------|--|
| focus | 使 input 获取焦点     | - |
| blur  | 使 input 失去焦点     | - |
| select | 选中 input 中的文字    | - |
``` 