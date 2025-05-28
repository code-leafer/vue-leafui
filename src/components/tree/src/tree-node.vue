<template>
  <div class="my-tree-node">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyTreeNode'
})
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-tree-node {
  padding: 5px 0;
}
</style> 