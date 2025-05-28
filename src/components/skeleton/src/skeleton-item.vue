<template>
  <div class="my-skeleton-item">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MySkeletonItem'
})
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-skeleton-item {
  background-color: #f2f2f2;
  border-radius: 4px;
}
</style> 