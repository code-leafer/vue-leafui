<template>
  <li
    :class="[
      'my-select-option',
      {
        'is-selected': isSelected,
        'is-disabled': disabled
      }
    ]"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </li>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { optionProps, optionEmits } from './option'

defineOptions({
  name: 'MySelectOption'
})

const props = defineProps(optionProps)
const emit = defineEmits(optionEmits)

const select = inject('select', {
  modelValue: computed(() => ''),
  multiple: false
})

const isSelected = computed(() => {
  if (select.multiple) {
    return (select.modelValue.value as (string | number)[]).includes(props.value)
  }
  return select.modelValue.value === props.value
})

const handleClick = (evt: MouseEvent) => {
  if (props.disabled) return
  emit('click', evt)
}
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-select-option {
  padding: 8px 12px;
  color: $text-regular;
  font-size: $font-size-base;
  line-height: 1.5;
  cursor: pointer;
  @include transition(background-color);

  &:hover {
    background-color: $bg-color-light;
  }

  &.is-selected {
    color: $primary-color;
    font-weight: bold;
    background-color: $bg-color-light;
  }

  &.is-disabled {
    color: $text-disabled;
    cursor: not-allowed;
  }
}
</style> 