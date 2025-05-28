<template>
  <div
    :class="[
      'my-radio-group',
      `my-radio-group--${size}`
    ]"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { provide, computed } from 'vue'
import { radioGroupProps, radioGroupEmits } from './group'

defineOptions({
  name: 'MyRadioGroup'
})

const props = defineProps(radioGroupProps)
const emit = defineEmits(radioGroupEmits)

provide('radioGroup', {
  modelValue: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  size: computed(() => props.size),
  textColor: computed(() => props.textColor),
  fill: computed(() => props.fill)
})
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-radio-group {
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