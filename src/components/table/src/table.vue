<template>
  <div class="my-table">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyTable'
})
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-table {
  width: 100%;
  border-collapse: collapse;
}
</style> 