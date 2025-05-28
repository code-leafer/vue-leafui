# Icon 图标

提供一套常用的图标集合。

## 基础用法

直接通过设置类名来使用即可。

::: tip
基础的图标用法展示。
:::

<div class="example">
  <div class="demo-icon">
    <my-icon name="user" />
    <my-icon name="setting" />
    <my-icon name="plus" />
    <my-icon name="minus" />
    <my-icon name="check" />
    <my-icon name="close" />
    <my-icon name="info" />
    <my-icon name="warning" />
    <my-icon name="error" />
    <my-icon name="success" />
  </div>
</div>

```vue
<template>
  <div class="demo-icon">
    <my-icon name="user" />
    <my-icon name="setting" />
    <my-icon name="plus" />
    <my-icon name="minus" />
    <my-icon name="check" />
    <my-icon name="close" />
    <my-icon name="info" />
    <my-icon name="warning" />
    <my-icon name="error" />
    <my-icon name="success" />
  </div>
</template>

<style>
.demo-icon {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.demo-icon .my-icon {
  font-size: 24px;
  color: #666;
}
</style>
```

## 图标颜色

使用 `color` 属性设置图标颜色。

::: tip
可以设置图标的颜色。
:::

<div class="example">
  <div class="demo-icon-color">
    <my-icon name="info" color="#409EFF" />
    <my-icon name="success" color="#67C23A" />
    <my-icon name="warning" color="#E6A23C" />
    <my-icon name="error" color="#F56C6C" />
  </div>
</div>

```vue
<template>
  <div class="demo-icon-color">
    <my-icon name="info" color="#409EFF" />
    <my-icon name="success" color="#67C23A" />
    <my-icon name="warning" color="#E6A23C" />
    <my-icon name="error" color="#F56C6C" />
  </div>
</template>

<style>
.demo-icon-color {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.demo-icon-color .my-icon {
  font-size: 24px;
}
</style>
```

## 图标大小

使用 `size` 属性设置图标大小。

::: tip
可以设置图标的大小。
:::

<div class="example">
  <div class="demo-icon-size">
    <my-icon name="info" size="16px" />
    <my-icon name="info" size="24px" />
    <my-icon name="info" size="32px" />
    <my-icon name="info" size="48px" />
  </div>
</div>

```vue
<template>
  <div class="demo-icon-size">
    <my-icon name="info" size="16px" />
    <my-icon name="info" size="24px" />
    <my-icon name="info" size="32px" />
    <my-icon name="info" size="48px" />
  </div>
</template>

<style>
.demo-icon-size {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>
```

## 属性

| 属性名  | 说明     | 类型   | 可选值                | 默认值 |
| ------- | -------- | ------ | --------------------- | ------ |
| name    | 图标名称 | string | 参考上面的图标集合      | -      |
| color   | 图标颜色 | string | -                     | -      |
| size    | 图标大小 | string | -                     | -      |

## 事件

| 事件名称 | 说明                  | 回调参数       |
| -------- | --------------------- | -------------- |
| click    | 点击图标时触发         | Event          |