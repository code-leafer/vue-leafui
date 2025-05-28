<template>
  <div class="my-menu-item">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyMenuItem',
  props: {
    index: {
      type: String,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-menu-item {
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #f5f7fa;
  }
  
  &.is-active {
    color: #409eff;
    background-color: #ecf5ff;
  }
  
  &.is-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
</style> 