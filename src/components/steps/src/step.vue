<template>
  <div class="my-step">
    <div class="my-step__line"></div>
    <div class="my-step__icon">
      <slot name="icon">
        <div class="my-step__icon-inner">{{ index + 1 }}</div>
      </slot>
    </div>
    <div class="my-step__main">
      <div class="my-step__title">
        <slot></slot>
      </div>
      <div class="my-step__description">
        <slot name="description"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyStep',
  props: {
    index: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: 'wait',
      validator: (val: string) => ['wait', 'process', 'finish', 'error'].includes(val)
    }
  }
})
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-step {
  position: relative;
  display: flex;
  flex: 1;
  
  &__line {
    position: absolute;
    left: 0;
    top: 11px;
    height: 1px;
    width: 100%;
    background-color: #e4e7ed;
  }
  
  &__icon {
    position: relative;
    z-index: 1;
    width: 24px;
    height: 24px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    
    &-inner {
      font-size: 12px;
      line-height: 1;
    }
  }
  
  &__main {
    color: #303133;
  }
  
  &__title {
    font-size: 16px;
    line-height: 24px;
  }
  
  &__description {
    margin-top: 4px;
    font-size: 12px;
    color: #909399;
  }
}
</style> 