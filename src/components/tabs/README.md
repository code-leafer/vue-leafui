# Tabs 标签页

用于分隔内容上有关联但属于不同类别的数据集合。

## 基本用法

标签页默认选中第一项，你也可以通过 `v-model` 设置当前激活的标签页。

```vue
<template>
  <my-tabs v-model="activeTab">
    <my-tab-pane label="标签1" name="tab1">内容1</my-tab-pane>
    <my-tab-pane label="标签2" name="tab2">内容2</my-tab-pane>
    <my-tab-pane label="标签3" name="tab3">内容3</my-tab-pane>
  </my-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('tab1')
</script>
```

## 卡片风格

将 `type` 设置为 `card` 可以显示卡片风格的标签页。

```vue
<template>
  <my-tabs v-model="activeTab" type="card">
    <my-tab-pane label="标签1" name="tab1">内容1</my-tab-pane>
    <my-tab-pane label="标签2" name="tab2">内容2</my-tab-pane>
    <my-tab-pane label="标签3" name="tab3">内容3</my-tab-pane>
  </my-tabs>
</template>
```

## 带边框卡片风格

将 `type` 设置为 `border-card` 可以显示带边框的卡片风格标签页。

```vue
<template>
  <my-tabs v-model="activeTab" type="border-card">
    <my-tab-pane label="标签1" name="tab1">内容1</my-tab-pane>
    <my-tab-pane label="标签2" name="tab2">内容2</my-tab-pane>
    <my-tab-pane label="标签3" name="tab3">内容3</my-tab-pane>
  </my-tabs>
</template>
```

## 位置

可以通过 `position` 设置标签的位置，支持 `top`、`right`、`bottom`、`left` 四个方向。

```vue
<template>
  <my-tabs v-model="activeTab" position="left">
    <my-tab-pane label="标签1" name="tab1">内容1</my-tab-pane>
    <my-tab-pane label="标签2" name="tab2">内容2</my-tab-pane>
    <my-tab-pane label="标签3" name="tab3">内容3</my-tab-pane>
  </my-tabs>
</template>
```

## 可关闭

设置 `closable` 属性可以允许关闭标签页，关闭时会触发 `tab-remove` 事件。

```vue
<template>
  <my-tabs v-model="activeTab" closable @tab-remove="handleRemove">
    <my-tab-pane label="标签1" name="tab1">内容1</my-tab-pane>
    <my-tab-pane label="标签2" name="tab2">内容2</my-tab-pane>
    <my-tab-pane label="标签3" name="tab3">内容3</my-tab-pane>
  </my-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('tab1')

const handleRemove = (tab, index) => {
  console.log(tab, index)
}
</script>
```

## 可新增

设置 `addable` 属性可以允许新增标签页，新增时会触发 `tab-add` 事件。

```vue
<template>
  <my-tabs v-model="activeTab" addable @tab-add="handleAdd">
    <my-tab-pane 
      v-for="tab in tabs" 
      :key="tab.name" 
      :label="tab.label" 
      :name="tab.name"
    >
      {{ tab.content }}
    </my-tab-pane>
  </my-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = ref([
  { label: '标签1', name: 'tab1', content: '内容1' },
  { label: '标签2', name: 'tab2', content: '内容2' }
])
const activeTab = ref('tab1')

const handleAdd = () => {
  const newTab = {
    label: `标签${tabs.value.length + 1}`,
    name: `tab${tabs.value.length + 1}`,
    content: `内容${tabs.value.length + 1}`
  }
  tabs.value.push(newTab)
  activeTab.value = newTab.name
}
</script>
```

## 禁用

可以设置 `disabled` 属性来禁用指定的标签页。

```vue
<template>
  <my-tabs v-model="activeTab">
    <my-tab-pane label="标签1" name="tab1">内容1</my-tab-pane>
    <my-tab-pane label="标签2" name="tab2" disabled>内容2</my-tab-pane>
    <my-tab-pane label="标签3" name="tab3">内容3</my-tab-pane>
  </my-tabs>
</template>
```

## 懒加载

可以设置 `lazy` 属性来开启懒加载，只有在激活标签时才渲染对应内容。

```vue
<template>
  <my-tabs v-model="activeTab">
    <my-tab-pane label="标签1" name="tab1">内容1</my-tab-pane>
    <my-tab-pane label="标签2" name="tab2" lazy>内容2（懒加载）</my-tab-pane>
    <my-tab-pane label="标签3" name="tab3">内容3</my-tab-pane>
  </my-tabs>
</template>
```

## MyTabs Props

| 属性       | 说明             | 类型                                       | 默认值   |
| ---------- | ---------------- | ------------------------------------------ | -------- |
| modelValue | 当前激活的标签页 | string \| number                          | ''       |
| type       | 标签页样式       | 'line' \| 'card' \| 'border-card'         | 'line'   |
| closable   | 是否可关闭       | boolean                                   | false    |
| addable    | 是否可新增       | boolean                                   | false    |
| editable   | 可关闭和新增     | boolean                                   | false    |
| position   | 标签位置         | 'top' \| 'right' \| 'bottom' \| 'left'    | 'top'    |
| stretch    | 标签是否自适应宽度 | boolean                                 | false    |

## MyTabPane Props

| 属性      | 说明         | 类型             | 默认值 |
| --------- | ------------ | ---------------- | ------ |
| label     | 标签标题     | string           | —      |
| name      | 标签标识     | string \| number | —      |
| disabled  | 是否禁用     | boolean          | false  |
| closable  | 是否可关闭   | boolean          | false  |
| lazy      | 是否懒加载   | boolean          | false  |

## MyTabs 事件

| 事件名           | 说明               | 回调参数                  |
| ---------------- | ------------------ | ------------------------- |
| update:modelValue | 切换标签页时触发   | (name: string \| number)  |
| tab-click        | 点击标签页时触发   | (tab: TabPaneInstance)     |
| tab-remove       | 关闭标签页时触发   | (tab: TabPaneInstance, index: number) |
| tab-add          | 点击新增按钮时触发 | —                         | 