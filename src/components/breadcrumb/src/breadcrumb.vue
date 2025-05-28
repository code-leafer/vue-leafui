<template>
  <div class="my-breadcrumb">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MyBreadcrumb'
})
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-breadcrumb {
  display: flex;
  align-items: center;
}
</style> 