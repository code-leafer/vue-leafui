<template>
  <transition
    :name="disableTransitions ? '' : 'my-zoom-in-center'"
    @before-leave="handleClose"
  >
    <span
      v-show="visible"
      :class="[
        'my-tag',
        type ? `my-tag--${type}` : '',
        `my-tag--${effect}`,
        `my-tag--${size}`,
        {
          'is-hit': hit,
          'is-round': round
        }
      ]"
      :style="tagStyle"
    >
      <slot />
      <i
        v-if="closable"
        class="my-tag__close"
        @click="handleClose"
      >
        ×
      </i>
    </span>
  </transition>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { tagProps } from './tag'

defineOptions({
  name: 'MyTag'
})

const props = defineProps(tagProps)
const emit = defineEmits(['close'])

const visible = ref(true)

const tagStyle = computed(() => {
  if (props.color) {
    if (props.effect === 'plain') {
      return {
        color: props.color,
        borderColor: props.color
      }
    }
    return {
      backgroundColor: props.color,
      borderColor: props.color,
      color: '#fff'
    }
  }
  return {}
})

const handleClose = (event: MouseEvent) => {
  event.stopPropagation()
  visible.value = false
  emit('close', event)
}
</script>

<style lang="scss">
.my-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  padding: 0 10px;
  font-size: var(--my-font-size-base);
  line-height: 1;
  color: var(--my-text-color-regular);
  background-color: var(--my-fill-color-blank);
  border: 1px solid var(--my-border-color-light);
  border-radius: var(--my-border-radius-base);
  box-sizing: border-box;
  white-space: nowrap;

  &__close {
    margin-left: 6px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: var(--my-color-primary);
    }
  }

  &--success {
    background-color: var(--my-color-success-light-9);
    border-color: var(--my-color-success-light-8);
    color: var(--my-color-success);

    &.my-tag--dark {
      background-color: var(--my-color-success);
      border-color: var(--my-color-success);
      color: var(--my-color-white);
    }

    &.my-tag--plain {
      background-color: var(--my-color-white);
      border-color: var(--my-color-success);
      color: var(--my-color-success);
    }
  }

  &--info {
    background-color: var(--my-color-info-light-9);
    border-color: var(--my-color-info-light-8);
    color: var(--my-color-info);

    &.my-tag--dark {
      background-color: var(--my-color-info);
      border-color: var(--my-color-info);
      color: var(--my-color-white);
    }

    &.my-tag--plain {
      background-color: var(--my-color-white);
      border-color: var(--my-color-info);
      color: var(--my-color-info);
    }
  }

  &--warning {
    background-color: var(--my-color-warning-light-9);
    border-color: var(--my-color-warning-light-8);
    color: var(--my-color-warning);

    &.my-tag--dark {
      background-color: var(--my-color-warning);
      border-color: var(--my-color-warning);
      color: var(--my-color-white);
    }

    &.my-tag--plain {
      background-color: var(--my-color-white);
      border-color: var(--my-color-warning);
      color: var(--my-color-warning);
    }
  }

  &--danger {
    background-color: var(--my-color-danger-light-9);
    border-color: var(--my-color-danger-light-8);
    color: var(--my-color-danger);

    &.my-tag--dark {
      background-color: var(--my-color-danger);
      border-color: var(--my-color-danger);
      color: var(--my-color-white);
    }

    &.my-tag--plain {
      background-color: var(--my-color-white);
      border-color: var(--my-color-danger);
      color: var(--my-color-danger);
    }
  }

  &--small {
    height: 24px;
    padding: 0 8px;
    font-size: var(--my-font-size-small);
  }

  &--large {
    height: 40px;
    padding: 0 16px;
    font-size: var(--my-font-size-large);
  }

  &.is-hit {
    border-color: var(--my-color-primary);
  }

  &.is-round {
    border-radius: 16px;
  }
}

.my-zoom-in-center-enter-active,
.my-zoom-in-center-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
}

.my-zoom-in-center-enter-from,
.my-zoom-in-center-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style> 