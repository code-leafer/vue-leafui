<template>
  <div
    :class="[
      'my-switch',
      `my-switch--${size}`,
      {
        'is-disabled': disabled,
        'is-checked': isChecked,
        'is-loading': loading
      }
    ]"
    :style="switchStyle"
    @click="handleClick"
  >
    <input
      ref="input"
      type="checkbox"
      :class="['my-switch__input']"
      :name="name"
      :disabled="disabled"
      :value="modelValue"
      :checked="isChecked"
    />
    <span
      v-if="activeText || inactiveText"
      :class="['my-switch__label', 'my-switch__label--left']"
      v-show="!isChecked"
    >
      {{ inactiveText }}
    </span>
    <span class="my-switch__core" :style="coreStyle">
      <div v-if="loading" class="my-switch__loading">
        <i class="my-icon-loading"></i>
      </div>
    </span>
    <span
      v-if="activeText || inactiveText"
      :class="['my-switch__label', 'my-switch__label--right']"
      v-show="isChecked"
    >
      {{ activeText }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { switchProps, switchEmits } from './switch'

defineOptions({
  name: 'MySwitch'
})

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const input = ref<HTMLInputElement>()

const isChecked = computed(() => {
  return props.modelValue === props.activeValue
})

const switchStyle = computed(() => {
  return {
    width: props.width ? `${props.width}px` : ''
  }
})

const coreStyle = computed(() => {
  return {
    backgroundColor: isChecked.value ? props.activeColor : props.inactiveColor
  }
})

const handleClick = () => {
  if (props.disabled || props.loading) return
  const newValue = isChecked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-switch {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-size: $font-size-base;
  line-height: 1;
  height: 32px;
  vertical-align: middle;

  &--small {
    height: 24px;
  }

  &--large {
    height: 40px;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &__input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    margin: 0;
  }

  &__label {
    transition: 0.2s;
    height: 20px;
    display: inline-block;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    vertical-align: middle;
    color: $text-regular;

    &--left {
      margin-right: 10px;
    }

    &--right {
      margin-left: 10px;
    }
  }

  &__core {
    display: inline-flex;
    position: relative;
    align-items: center;
    min-width: 40px;
    height: 20px;
    border: 1px solid transparent;
    outline: none;
    border-radius: 10px;
    box-sizing: border-box;
    background: $border-color-base;
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
    vertical-align: middle;

    &::after {
      content: '';
      position: absolute;
      top: 1px;
      left: 1px;
      border-radius: 100%;
      transition: all 0.3s;
      width: 16px;
      height: 16px;
      background-color: #fff;
    }
  }

  &.is-checked {
    .my-switch__core {
      &::after {
        left: 100%;
        margin-left: -17px;
      }
    }
  }

  &.is-loading {
    .my-switch__core {
      &::after {
        width: 14px;
        height: 14px;
        left: 2px;
        top: 2px;
      }
    }
  }

  &__loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 12px;
  }
}
</style> 