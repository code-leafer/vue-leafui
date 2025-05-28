<template>
  <div
    :class="[
      'my-checkbox-group',
      `my-checkbox-group--${size}`
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, computed } from 'vue'
import { checkboxGroupProps, checkboxGroupEmits } from './group'

defineOptions({
  name: 'MyCheckboxGroup'
})

const props = defineProps(checkboxGroupProps)
const emit = defineEmits(checkboxGroupEmits)

provide('checkboxGroup', {
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  size: computed(() => props.size),
  min: computed(() => props.min),
  max: computed(() => props.max),
  textColor: computed(() => props.textColor),
  fill: computed(() => props.fill)
})
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-checkbox-group {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  line-height: 1;

  &--small {
    font-size: $font-size-small;
  }

  &--large {
    font-size: $font-size-large;
  }
}
</style> 