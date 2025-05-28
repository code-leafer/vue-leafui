<template>
  <div
    :class="[
      'my-select-group',
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div class="my-select-group__title">{{ label }}</div>
    <ul class="my-select-group__options">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { groupProps } from './group'

defineOptions({
  name: 'MySelectGroup'
})

defineProps(groupProps)
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-select-group {
  &__title {
    padding: 8px 12px;
    color: $text-secondary;
    font-size: $font-size-small;
    line-height: 1.5;
  }

  &__options {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &.is-disabled {
    .my-select-group__title {
      color: $text-disabled;
    }
  }
}
</style> 