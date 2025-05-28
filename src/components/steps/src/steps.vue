<template>
  <div
    :class="[
      'my-steps',
      `my-steps--${direction}`,
      `my-steps--${align}`,
      {
        'is-simple': simple
      }
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { provide } from 'vue'
import { stepsProps } from './steps'
import type { StepsProps } from './steps'

defineOptions({
  name: 'MySteps'
})

const props = defineProps(stepsProps)

provide('steps', {
  active: props.active,
  direction: props.direction,
  align: props.align,
  simple: props.simple,
  finishStatus: props.finishStatus,
  processStatus: props.processStatus,
  items: props.items
})
</script>

<style lang="scss">
.my-steps {
  display: flex;
  width: 100%;

  &--horizontal {
    flex-direction: row;
  }

  &--vertical {
    flex-direction: column;
  }

  &--left {
    justify-content: flex-start;
  }

  &--center {
    justify-content: center;
  }

  &--right {
    justify-content: flex-end;
  }

  &.is-simple {
    padding: 13px 8%;
    background-color: var(--my-color-white);
    border-radius: var(--my-border-radius-base);
  }
}
</style> 