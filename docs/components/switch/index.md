# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

:::demo 绑定 `v-model` 到一个 `Boolean` 类型的变量。

```vue
<template>
  <my-switch v-model="value" />
</template>

<script setup>
import { ref } from 'vue'

const value = ref(true)
</script>
```

:::

## 禁用状态

:::demo 设置 `disabled` 属性，接受一个 `Boolean`，设置 `true` 即可禁用。

```vue
<template>
  <my-switch v-model="value1" disabled />
  <my-switch v-model="value2" disabled />
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(false)
</script>
```

:::

## 文字描述

:::demo 使用 `active-text` 属性与 `inactive-text` 属性来设置开关的文字描述。

```vue
<template>
  <my-switch
    v-model="value1"
    active-text="开启"
    inactive-text="关闭"
  />
  <br />
  <my-switch
    v-model="value2"
    active-text="打开"
    inactive-text="关闭"
    style="margin-top: 20px"
  />
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(false)
</script>
```

:::

## 自定义颜色

:::demo 使用 `active-color` 属性与 `inactive-color` 属性来设置开关的背景色。

```vue
<template>
  <my-switch
    v-model="value1"
    active-color="#13ce66"
    inactive-color="#ff4949"
  />
  <br />
  <my-switch
    v-model="value2"
    active-color="#409EFF"
    inactive-color="#C0CCDA"
    style="margin-top: 20px"
  />
</template>

<script setup>
import { ref } from 'vue'

const value1 = ref(true)
const value2 = ref(false)
</script>
```

:::

## 扩展的 value 类型

:::demo 设置 `active-value` 和 `inactive-value` 属性，接受 `Boolean`、`String` 或 `Number` 类型的值。

```vue
<template>
  <my-switch
    v-model="value"
    active-value="100"
    inactive-value="0"
  />
  <span style="margin-left: 10px">{{ value }}</span>
</template>

<script setup>
import { ref } from 'vue'

const value = ref('100')
</script>
```

:::

## 属性

| 属性名              | 说明                                     | 类型                      | 可选值 | 默认值  |
| ------------------ | --------------------------------------- | ------------------------- | ----- | ------- |
| value / v-model    | 绑定值                                   | boolean / string / number | —     | —       |
| disabled           | 是否禁用                                  | boolean                   | —     | false   |
| active-text        | switch 打开时的文字描述                   | string                    | —     | —       |
| inactive-text      | switch 关闭时的文字描述                   | string                    | —     | —       |
| active-color       | switch 打开时的背景色                     | string                    | —     | #409EFF |
| inactive-color     | switch 关闭时的背景色                     | string                    | —     | #C0CCDA |
| active-value       | switch 打开时的值                         | boolean / string / number | —     | true    |
| inactive-value     | switch 关闭时的值                         | boolean / string / number | —     | false   |
| name               | switch 对应的 name 属性                   | string                    | —     | —       |

## 事件

| 事件名称 | 说明                          | 回调参数      |
| ------- | ----------------------------- | ------------ |
| change  | switch 状态发生变化时的回调函数 | 新状态的值    |
``` 