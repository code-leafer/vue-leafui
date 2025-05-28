<template>
  <label
    :class="[
      'my-radio',
      `my-radio--${size}`,
      {
        'is-checked': isChecked,
        'is-disabled': disabled,
        'is-border': border
      }
    ]"
  >
    <span
      :class="[
        'my-radio__input',
        {
          'is-checked': isChecked,
          'is-disabled': disabled
        }
      ]"
    >
      <input
        ref="input"
        type="radio"
        :class="['my-radio__original']"
        :name="name"
        :disabled="disabled"
        :value="value"
        :checked="isChecked"
        @change="handleChange"
      />
      <span class="my-radio__inner"></span>
    </span>
    <span
      v-if="$slots.default || label"
      class="my-radio__label"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import { radioProps, radioEmits } from './radio'

defineOptions({
  name: 'MyRadio'
})

const props = defineProps(radioProps)
const emit = defineEmits(radioEmits)

const radioGroup = inject('radioGroup', {
  modelValue: computed(() => ''),
  disabled: false,
  size: 'default'
})

const input = ref<HTMLInputElement>()

const isGroup = computed(() => radioGroup.modelValue !== undefined)

const isChecked = computed(() => {
  if (isGroup.value) {
    return radioGroup.modelValue.value === props.value
  }
  return props.modelValue === props.value
})

const handleChange = (evt: Event) => {
  if (props.disabled) return
  const target = evt.target as HTMLInputElement
  const value = target.value
  if (isGroup.value) {
    emit('update:modelValue', value)
    emit('change', value)
  } else {
    emit('update:modelValue', value)
    emit('change', value)
  }
}
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-radio {
  display: inline-flex;
  align-items: center;
  margin-right: 30px;
  font-size: $font-size-base;
  font-weight: $font-weight-regular;
  color: $text-regular;
  cursor: pointer;
  user-select: none;

  &--small {
    font-size: $font-size-small;
  }

  &--large {
    font-size: $font-size-large;
  }

  &.is-disabled {
    color: $text-disabled;
    cursor: not-allowed;
  }

  &.is-border {
    padding: 9px 20px 9px 10px;
    border: 1px solid $border-color-base;
    border-radius: $border-radius-base;
    @include transition(all);

    &:hover {
      border-color: $primary-color;
    }

    &.is-checked {
      border-color: $primary-color;
    }

    &.is-disabled {
      border-color: $border-color-disabled;
      background-color: $bg-color-disabled;
    }
  }

  &__input {
    position: relative;
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    outline: none;
    cursor: pointer;

    &.is-disabled {
      cursor: not-allowed;
    }
  }

  &__original {
    position: absolute;
    z-index: -1;
    margin: 0;
    opacity: 0;
    outline: none;
  }

  &__inner {
    position: relative;
    display: inline-block;
    width: 14px;
    height: 14px;
    background-color: #fff;
    border: 1px solid $border-color-base;
    border-radius: 50%;
    @include transition(all);

    &::after {
      position: absolute;
      top: 3px;
      left: 3px;
      width: 6px;
      height: 6px;
      background-color: #fff;
      border-radius: 50%;
      transform: scale(0);
      @include transition(transform);
    }
  }

  &__label {
    padding-left: 8px;
    line-height: 1;
  }

  &.is-checked {
    .my-radio__inner {
      background-color: $primary-color;
      border-color: $primary-color;

      &::after {
        transform: scale(1);
      }
    }
  }

  &.is-disabled {
    .my-radio__inner {
      background-color: $bg-color-disabled;
      border-color: $border-color-disabled;

      &::after {
        background-color: $text-disabled;
      }
    }

    &.is-checked {
      .my-radio__inner {
        background-color: $bg-color-disabled;
        border-color: $border-color-disabled;

        &::after {
          background-color: $text-disabled;
        }
      }
    }
  }
}
</style> 