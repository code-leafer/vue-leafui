# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

:::demo
```vue
<template>
  <div class="demo-button">
    <my-button>默认按钮</my-button>
    <my-button type="primary">主要按钮</my-button>
    <my-button type="success">成功按钮</my-button>
    <my-button type="warning">警告按钮</my-button>
    <my-button type="danger">危险按钮</my-button>
  </div>
  <div class="demo-button" style="margin-top: 16px">
    <my-button plain>朴素按钮</my-button>
    <my-button type="primary" plain>主要按钮</my-button>
    <my-button type="success" plain>成功按钮</my-button>
    <my-button type="warning" plain>警告按钮</my-button>
    <my-button type="danger" plain>危险按钮</my-button>
  </div>
  <div class="demo-button" style="margin-top: 16px">
    <my-button round>圆角按钮</my-button>
    <my-button type="primary" round>主要按钮</my-button>
    <my-button type="success" round>成功按钮</my-button>
    <my-button type="warning" round>警告按钮</my-button>
    <my-button type="danger" round>危险按钮</my-button>
  </div>
</template>
```
:::

## 禁用状态

按钮不可用状态。

:::demo 通过 `disabled` 属性来控制按钮是否为禁用状态。
```vue
<template>
  <div class="demo-button">
    <my-button disabled>默认按钮</my-button>
    <my-button type="primary" disabled>主要按钮</my-button>
    <my-button type="success" disabled>成功按钮</my-button>
    <my-button type="warning" disabled>警告按钮</my-button>
    <my-button type="danger" disabled>危险按钮</my-button>
  </div>
  <div class="demo-button" style="margin-top: 16px">
    <my-button plain disabled>朴素按钮</my-button>
    <my-button type="primary" plain disabled>主要按钮</my-button>
    <my-button type="success" plain disabled>成功按钮</my-button>
    <my-button type="warning" plain disabled>警告按钮</my-button>
    <my-button type="danger" plain disabled>危险按钮</my-button>
  </div>
</template>
```
:::

## 文字按钮

没有边框和背景色的按钮。

:::demo 使用 `text` 属性来创建文字按钮。
```vue
<template>
  <div class="demo-button">
    <my-button text>文字按钮</my-button>
    <my-button type="primary" text>主要按钮</my-button>
    <my-button type="success" text>成功按钮</my-button>
    <my-button type="warning" text>警告按钮</my-button>
    <my-button type="danger" text>危险按钮</my-button>
  </div>
</template>
```
:::

## 链接按钮

链接样式的按钮，常用于表单或页面底部。

:::demo 使用 `link` 属性来创建链接按钮。
```vue
<template>
  <div class="demo-button">
    <my-button link>链接按钮</my-button>
    <my-button type="primary" link>主要链接</my-button>
    <my-button type="success" link>成功链接</my-button>
    <my-button type="warning" link>警告链接</my-button>
    <my-button type="danger" link>危险链接</my-button>
  </div>
</template>
```
:::

## 加载状态

点击后显示加载状态的按钮。

:::demo 使用 `loading` 属性来显示加载状态。
```vue
<template>
  <div class="demo-button">
    <my-button loading>加载中</my-button>
    <my-button type="primary" loading>加载中</my-button>
    <my-button type="success" loading>加载中</my-button>
    <my-button type="warning" loading>加载中</my-button>
    <my-button type="danger" loading>加载中</my-button>
  </div>
</template>
```
:::

## 不同尺寸

提供三种尺寸，大、默认（中）、小。

:::demo 通过 `size` 属性控制按钮大小。
```vue
<template>
  <div class="demo-button">
    <my-button size="large">大型按钮</my-button>
    <my-button>默认按钮</my-button>
    <my-button size="small">小型按钮</my-button>
  </div>
  <div class="demo-button" style="margin-top: 16px">
    <my-button size="large" type="primary">大型按钮</my-button>
    <my-button type="primary">默认按钮</my-button>
    <my-button size="small" type="primary">小型按钮</my-button>
  </div>
</template>
```
:::

## API

### Attributes

| 属性名      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type      | 类型   | string    | primary / success / warning / danger / info | default |
| size      | 尺寸   | string    | large / default / small  | default |
| plain     | 是否朴素按钮 | boolean | — | false |
| round     | 是否圆角按钮 | boolean | — | false |
| text      | 是否为文字按钮 | boolean | — | false |
| link      | 是否为链接按钮 | boolean | — | false |
| loading   | 是否为加载中状态 | boolean | — | false |
| disabled  | 是否禁用    | boolean | — | false |
| icon      | 图标组件    | string | — | — |

### Events

| 事件名称 | 说明 | 回调参数 |
|---------- |-------- |---------- |
| click  | 点击按钮时的回调 | (event: MouseEvent) => void |

### Slots

| 插槽名称 | 说明 |
|---------- |-------- |
| default  | 按钮内容 |
