<template>
  <button
    :class="[
      'my-button',
      `my-button--${type}`,
      `my-button--${size}`,
      {
        'is-plain': plain,
        'is-round': round,
        'is-circle': circle,
        'is-loading': loading,
        'is-disabled': disabled
      }
    ]"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    @click="handleClick"
  >
    <i v-if="loading" class="my-icon-loading"></i>
    <i v-else-if="icon" :class="typeof icon === 'string' ? icon : ''"></i>
    <component v-else-if="typeof icon !== 'string' && icon" :is="icon" />
    <span v-if="$slots.default">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { buttonProps, buttonEmits } from './button'

defineOptions({
  name: 'MyButton'
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const handleClick = (evt: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', evt)
}
</script> 