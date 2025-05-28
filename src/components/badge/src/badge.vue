<template>
  <div class="my-badge">
    <slot />
    <sup
      v-if="!hidden"
      :class="[
        'my-badge__content',
        `my-badge__content--${type}`,
        {
          'is-fixed': !!$slots.default,
          'is-dot': dot
        }
      ]"
      :style="badgeStyle"
    >
      <slot
        v-if="!dot"
        name="content"
      >
        {{ displayValue }}
      </slot>
    </sup>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { badgeProps } from './badge'

defineOptions({
  name: 'MyBadge'
})

const props = defineProps(badgeProps)

const displayValue = computed(() => {
  if (props.dot) return ''

  if (typeof props.value === 'number' && typeof props.max === 'number') {
    return props.value > props.max ? `${props.max}+` : props.value
  }

  return props.value
})

const badgeStyle = computed(() => {
  if (props.dot) return {}

  return {
    backgroundColor: props.type === 'primary' ? 'var(--my-color-primary)' :
      props.type === 'success' ? 'var(--my-color-success)' :
      props.type === 'warning' ? 'var(--my-color-warning)' :
      props.type === 'info' ? 'var(--my-color-info)' :
      'var(--my-color-danger)'
  }
})
</script>

<style lang="scss">
.my-badge {
  position: relative;
  vertical-align: middle;
  display: inline-block;

  &__content {
    background-color: var(--my-color-danger);
    border-radius: 10px;
    color: var(--my-color-white);
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: var(--my-font-size-small);
    height: 18px;
    padding: 0 6px;
    white-space: nowrap;
    border: 1px solid var(--my-color-white);

    &.is-fixed {
      position: absolute;
      top: 0;
      right: 10px;
      transform: translateY(-50%) translateX(100%);

      &.is-dot {
        right: 5px;
        top: 5px;
      }
    }

    &.is-dot {
      height: 8px;
      width: 8px;
      padding: 0;
      right: 0;
      border-radius: 50%;
    }

    &--primary {
      background-color: var(--my-color-primary);
    }

    &--success {
      background-color: var(--my-color-success);
    }

    &--warning {
      background-color: var(--my-color-warning);
    }

    &--info {
      background-color: var(--my-color-info);
    }

    &--danger {
      background-color: var(--my-color-danger);
    }
  }
}
</style> 