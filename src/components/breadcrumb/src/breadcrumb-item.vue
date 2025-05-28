<template>
  <div class="my-breadcrumb-item">
    <slot></slot>
    <span class="my-breadcrumb-item__separator" v-if="!isLast">/</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject } from 'vue'

export default defineComponent({
  name: 'MyBreadcrumbItem',
  props: {
    to: {
      type: String,
      default: ''
    }
  },
  setup() {
    const isLast = false; // In a real implementation, you would need to determine if this is the last item
    return {
      isLast
    }
  }
})
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-breadcrumb-item {
  display: inline-flex;
  align-items: center;
  
  &__separator {
    margin: 0 8px;
    color: #c0c4cc;
  }
}
</style> 