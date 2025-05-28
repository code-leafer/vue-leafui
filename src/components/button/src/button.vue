<template>
  <button
    ref="buttonRef"
    :class="[
      'my-button',
      `my-button--${type}`,
      `my-button--${size}`,
      {
        'is-disabled': disabled,
        'is-loading': loading,
        'is-round': round,
        'is-plain': plain,
        'is-text': text,
        'is-link': link
      }
    ]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <template v-if="loading">
      <i class="my-icon-loading"></i>
    </template>
    <i v-else-if="icon" :class="icon"></i>
    <span v-if="$slots.default" :class="{ 'my-button__text--expand': shouldAddSpace }">
      <slot></slot>
    </span>
  </button>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { buttonProps, buttonEmits } from './button'

defineOptions({
  name: 'MyButton'
})

const props = defineProps(buttonProps)
const emit = defineEmits(buttonEmits)

const buttonRef = ref<HTMLButtonElement>()

const shouldAddSpace = computed(() => {
  return props.icon || props.loading
})

const handleClick = (evt: MouseEvent) => {
  if (props.disabled || props.loading) return
  emit('click', evt)
}
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid $border-color-base;
  border-radius: $border-radius-base;
  padding: 12px 20px;
  font-size: $font-size-base;
  color: $text-regular;
  background-color: #fff;
  @include transition(all);

  &:hover {
    color: $primary-color;
    border-color: mix($primary-color, #fff, 20%);
    background-color: mix($primary-color, #fff, 90%);
  }

  &:active {
    color: mix($primary-color, #000, 10%);
    border-color: mix($primary-color, #000, 10%);
    outline: none;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &.is-loading {
    position: relative;
    pointer-events: none;
    opacity: 0.8;

    .my-icon-loading {
      animation: rotating 2s linear infinite;
    }
  }

  &.is-round {
    border-radius: 20px;
  }

  &.is-plain {
    background: #fff;
    border-color: $border-color-base;
    color: $text-regular;

    &:hover {
      color: $primary-color;
      border-color: $primary-color;
      background-color: #fff;
    }
  }

  &.is-text {
    border-color: transparent;
    background: transparent;
    padding-left: 0;
    padding-right: 0;

    &:hover {
      color: $primary-color;
      background-color: transparent;
    }
  }

  &.is-link {
    border-color: transparent;
    background: transparent;
    color: $primary-color;
    padding-left: 0;
    padding-right: 0;

    &:hover {
      color: mix($primary-color, #000, 10%);
    }
  }

  &--primary {
    color: #fff;
    background-color: $primary-color;
    border-color: $primary-color;

    &:hover {
      background: mix($primary-color, #fff, 20%);
      border-color: mix($primary-color, #fff, 20%);
      color: #fff;
    }
  }

  &--success {
    color: #fff;
    background-color: $success-color;
    border-color: $success-color;

    &:hover {
      background: mix($success-color, #fff, 20%);
      border-color: mix($success-color, #fff, 20%);
      color: #fff;
    }
  }

  &--warning {
    color: #fff;
    background-color: $warning-color;
    border-color: $warning-color;

    &:hover {
      background: mix($warning-color, #fff, 20%);
      border-color: mix($warning-color, #fff, 20%);
      color: #fff;
    }
  }

  &--danger {
    color: #fff;
    background-color: $danger-color;
    border-color: $danger-color;

    &:hover {
      background: mix($danger-color, #fff, 20%);
      border-color: mix($danger-color, #fff, 20%);
      color: #fff;
    }
  }

  &--small {
    padding: 8px 15px;
    font-size: $font-size-small;
  }

  &--large {
    padding: 16px 25px;
    font-size: $font-size-large;
  }

  &__text--expand {
    margin-left: 5px;
  }
}

@keyframes rotating {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 