<template>
  <component
    :is="tag"
    ref="typographyRef"
    :class="[
      'my-typography',
      `my-typography--${type}`,
      `my-typography--${weight}`,
      {
        'is-ellipsis': ellipsis === true,
        'is-underline': underline,
        'is-delete': deleted,
        'is-mark': mark,
        'is-code': code,
        'is-disabled': disabled
      }
    ]"
    :style="ellipsisStyle"
    @click="handleClick"
  >
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { typographyProps, typographyEmits } from './typography'

defineOptions({
  name: 'MyTypography'
})

const props = defineProps(typographyProps)
const emit = defineEmits(typographyEmits)

const typographyRef = ref<HTMLElement>()

const ellipsisStyle = computed(() => {
  if (typeof props.ellipsis === 'number') {
    return {
      display: '-webkit-box',
      '-webkit-line-clamp': props.ellipsis,
      '-webkit-box-orient': 'vertical',
      overflow: 'hidden'
    }
  }
  return {}
})

const handleClick = (evt: MouseEvent) => {
  if (props.disabled) return
  emit('click', evt)
}
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-typography {
  margin: 0;
  color: $text-regular;
  @include transition(color);

  &--primary {
    color: $text-primary;
  }

  &--secondary {
    color: $text-secondary;
  }

  &--success {
    color: $success-color;
  }

  &--warning {
    color: $warning-color;
  }

  &--danger {
    color: $danger-color;
  }

  &--normal {
    font-weight: 400;
  }

  &--medium {
    font-weight: 500;
  }

  &--semibold {
    font-weight: 600;
  }

  &--bold {
    font-weight: 700;
  }

  &.is-ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &.is-underline {
    text-decoration: underline;
  }

  &.is-delete {
    text-decoration: line-through;
  }

  &.is-mark {
    background-color: $warning-color-light;
    padding: 0 4px;
  }

  &.is-code {
    background-color: $bg-color-light;
    padding: 2px 4px;
    border-radius: $border-radius-small;
    font-family: monospace;
  }

  &.is-disabled {
    color: $text-disabled;
    cursor: not-allowed;
  }
}
</style> 