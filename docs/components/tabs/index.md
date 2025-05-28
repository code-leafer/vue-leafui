# Tabs 标签页

在同一区域内组织内容，一次可查看一个视图。

## 基础用法

基础的、简洁的标签页。

:::demo
```vue
<template>
  <my-tabs v-model="activeTab">
    <my-tab-pane label="标签1" name="tab1">标签1内容</my-tab-pane>
    <my-tab-pane label="标签2" name="tab2">标签2内容</my-tab-pane>
    <my-tab-pane label="标签3" name="tab3">标签3内容</my-tab-pane>
  </my-tabs>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('tab1')
</script>
```
:::

## 卡片样式

卡片样式的标签页。

:::demo 设置 `type="card"` 可以显示卡片样式的标签页。
```vue
<template>
  <my-tabs v-model="activeCard" type="card">
    <my-tab-pane label="卡片1" name="card1">卡片1内容</my-tab-pane>
    <my-tab-pane label="卡片2" name="card2">卡片2内容</my-tab-pane>
    <my-tab-pane label="卡片3" name="card3">卡片3内容</my-tab-pane>
  </my-tabs>
</template>

<script setup>
import { ref } from 'vue'

const activeCard = ref('card1')
</script>
```
:::

## 边框卡片样式

带有边框的卡片样式标签页。

:::demo 设置 `type="border-card"` 可以显示带有边框的卡片样式。
```vue
<template>
  <my-tabs v-model="activeBorderCard" type="border-card">
    <my-tab-pane label="边框卡片1" name="border1">边框卡片1内容</my-tab-pane>
    <my-tab-pane label="边框卡片2" name="border2">边框卡片2内容</my-tab-pane>
    <my-tab-pane label="边框卡片3" name="border3">边框卡片3内容</my-tab-pane>
  </my-tabs>
</template>

<script setup>
import { ref } from 'vue'

const activeBorderCard = ref('border1')
</script>
```
:::

## 位置

可以通过 `tab-position` 设置标签的位置。

:::demo 标签一共有四个方向的设置 `tab-position="top|right|bottom|left"`，默认为 `top`。
```vue
<template>
  <my-radio-group v-model="tabPosition" style="margin-bottom: 20px;">
    <my-radio-button label="top">顶部</my-radio-button>
    <my-radio-button label="right">右侧</my-radio-button>
    <my-radio-button label="bottom">底部</my-radio-button>
    <my-radio-button label="left">左侧</my-radio-button>
  </my-radio-group>

  <my-tabs v-model="activePosition" :tab-position="tabPosition">
    <my-tab-pane label="位置1" name="pos1">位置1内容</my-tab-pane>
    <my-tab-pane label="位置2" name="pos2">位置2内容</my-tab-pane>
    <my-tab-pane label="位置3" name="pos3">位置3内容</my-tab-pane>
  </my-tabs>
</template>

<script setup>
import { ref } from 'vue'

const tabPosition = ref('top')
const activePosition = ref('pos1')
</script>
```
:::

## 自定义标签页

可以自定义标签页内容。

:::demo
```vue
<template>
  <my-tabs v-model="activeCustom">
    <my-tab-pane name="custom1">
      <template #label>
        <my-icon name="home"></my-icon>
        <span>首页</span>
      </template>
      首页内容
    </my-tab-pane>
    <my-tab-pane name="custom2">
      <template #label>
        <my-icon name="user"></my-icon>
        <span>用户</span>
      </template>
      用户内容
    </my-tab-pane>
  </my-tabs>
</template>

<script setup>
import { ref } from 'vue'

const activeCustom = ref('custom1')
</script>
```
:::

## 动态编辑标签页

可以动态添加或关闭标签页。

:::demo
```vue
<template>
  <my-tabs 
    v-model="editableTabsValue" 
    type="card" 
    editable
    @tab-add="addTab"
    @tab-remove="removeTab"
  >
    <my-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{ item.content }}
    </my-tab-pane>
  </my-tabs>
</template>

<script setup>
import { ref } from 'vue'

let tabIndex = 2
const editableTabsValue = ref('tab1')
const editableTabs = ref([
  {
    title: '标签1',
    name: 'tab1',
    content: '标签1内容'
  },
  {
    title: '标签2',
    name: 'tab2',
    content: '标签2内容'
  }
])

const addTab = () => {
  const newTabName = `tab${++tabIndex}`
  editableTabs.value.push({
    title: `新标签${tabIndex}`,
    name: newTabName,
    content: `新标签${tabIndex}内容`
  })
  editableTabsValue.value = newTabName
}

const removeTab = (targetName) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter(tab => tab.name !== targetName)
}
</script>
```
:::

## 懒加载

仅在激活选项卡时才渲染对应内容。

:::demo 默认情况下，标签内容会被渲染为 DOM。设置 `lazy` 属性为 `true` 以启用懒加载。
```vue
<template>
  <my-tabs v-model="activeLazy" lazy>
    <my-tab-pane label="懒加载1" name="lazy1">懒加载内容1</my-tab-pane>
    <my-tab-pane label="懒加载2" name="lazy2">懒加载内容2</my-tab-pane>
    <my-tab-pane label="懒加载3" name="lazy3">懒加载内容3</my-tab-pane>
  </my-tabs>
</template>

<script setup>
import { ref } from 'vue'

const activeLazy = ref('lazy1')
</script>
```
:::

## API

### Tabs Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| model-value / v-model | 绑定值，选中选项卡的 name | string | — | 第一个选项卡的 name |
| type | 风格类型 | string | card/border-card | — |
| tab-position | 选项卡所在位置 | string | top/right/bottom/left | top |
| editable | 标签是否可增加删除 | boolean | — | false |
| stretch | 标签的宽度是否自撑开 | boolean | — | false |
| lazy | 是否延迟渲染内容 | boolean | — | false |

### Tabs Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| tab-click | tab 被选中时触发 | (pane: TabPane, event: Event) |
| tab-change | 激活的标签页发生变化时触发 | (name: string) |
| tab-remove | 点击 tab 移除按钮后触发 | (name: string) |
| tab-add | 点击 tab 新增按钮后触发 | — |

### TabPane Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| label | 选项卡标题 | string | — | — |
| name | 与选项卡绑定值 value 对应的标识符，表示选项卡别名 | string | — | 该选项卡在父标签中的顺序值 |
| disabled | 是否禁用 | boolean | — | false |
| lazy | 标签页是否延迟加载 | boolean | — | false |

### TabPane Slots

| 插槽名 | 说明 |
| --- | --- |
| default | 默认内容 |
| label | 自定义标签页标题 | 