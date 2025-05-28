# Loading 加载

用于数据加载过程中展示动画。

## 基础用法

以服务的方式调用 Loading 加载效果。

<div class="example">
  <div class="loading-example">
    <div class="loading-container">
      <div class="loading-spinner"></div>
      <div class="loading-text">加载中...</div>
    </div>
  </div>
</div>

```vue
<template>
  <my-button @click="openLoading">显示 Loading</my-button>
</template>

<script>
export default {
  methods: {
    openLoading() {
      const loading = this.$loading({
        text: '加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      
      setTimeout(() => {
        loading.close()
      }, 2000)
    }
  }
}
</script>
```

## 作为指令使用

通过在组件上添加 `v-loading` 指令。

<div class="example">
  <div class="loading-example">
    <div class="loading-container loading-with-container">
      <div class="loading-spinner"></div>
      <div class="content-text">内容区域</div>
    </div>
  </div>
</div>

```vue
<template>
  <div v-loading="loading" class="loading-container">
    内容区域
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    }
  }
}
</script>
```

## API

### Loading Service

| 方法名    | 说明                                                     | 参数                               | 返回值        |
| --------- | -------------------------------------------------------- | ---------------------------------- | ------------- |
| $loading  | 创建一个 Loading 实例，可以通过返回的实例关闭此 Loading | options 参数见下表                 | Loading 实例  |

### Service 选项

| 参数           | 说明                    | 类型     | 可选值        | 默认值      |
| -------------- | ----------------------- | -------- | ------------- | ----------- |
| target         | Loading 需要覆盖的 DOM 节点 | object  | —             | document.body |
| body           | 同 target              | object   | —             | document.body |
| text           | 显示在加载图标下方的加载文案 | string   | —             | —           |
| background     | 遮罩背景色             | string   | —             | —           |

### Loading 指令

| 指令名     | 说明                                | 类型     | 参数                                     |
| ---------- | ----------------------------------- | -------- | ---------------------------------------- |
| v-loading  | 添加 loading 效果                  | boolean   | —                                        |

### Loading 指令参数

| 参数                       | 说明                         | 类型     | 可选值                | 默认值 |
| -------------------------- | ---------------------------- | -------- | --------------------- | ------ |
| element-loading-text       | 显示在加载图标下方的加载文案 | string   | —                     | —      |
| element-loading-background | 背景遮罩的颜色              | string   | —                     | —      |
