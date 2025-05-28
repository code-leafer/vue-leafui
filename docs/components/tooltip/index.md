# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

在这里使用模拟的 Tooltip 组件。

<div class="example">
  <div class="tooltip-example">
    <div class="tooltip-trigger">
      鼠标悬停查看提示
      <div class="tooltip-content">这是一个提示文本</div>
    </div>
  </div>
</div>

```vue
<my-tooltip content="这是一个提示文本">
  <my-button>鼠标悬停查看提示</my-button>
</my-tooltip>
```

## API

### 属性

| 参数           | 说明                     | 类型    | 可选值                                                      | 默认值     |
| -------------- | ------------------------ | ------- | ----------------------------------------------------------- | ---------- |
| content        | 显示的内容，也可通过插槽 | string  | —                                                           | —          |
| placement      | Tooltip 的出现位置       | string  | top/top-start/top-end/bottom/bottom-start/bottom-end/left/right | bottom     |
| effect         | 提供的主题               | string  | dark/light                                                  | dark       |
| disabled       | Tooltip 是否可用         | boolean | —                                                           | false      |

### 事件

| 事件名称 | 说明               | 回调参数 |
| -------- | ------------------ | -------- |
| show     | 显示时触发         | —        |
| hide     | 隐藏时触发         | —        |

### 插槽

| 插槽名  | 说明                         |
| ------- | ---------------------------- |
| —       | Tooltip 触发的元素           |
| content | 自定义内容，会覆盖 content 属性 |
