<template>
  <label
    :class="[
      'my-checkbox',
      `my-checkbox--${size}`,
      {
        'is-checked': isChecked,
        'is-disabled': disabled,
        'is-indeterminate': indeterminate,
        'is-border': border
      }
    ]"
  >
    <span
      :class="[
        'my-checkbox__input',
        {
          'is-checked': isChecked,
          'is-disabled': disabled,
          'is-indeterminate': indeterminate
        }
      ]"
    >
      <input
        ref="input"
        type="checkbox"
        :class="['my-checkbox__original']"
        :name="name"
        :disabled="disabled"
        :value="value"
        :checked="isChecked"
        @change="handleChange"
      />
      <span class="my-checkbox__inner"></span>
    </span>
    <span
      v-if="$slots.default || label"
      class="my-checkbox__label"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import { checkboxProps, checkboxEmits } from './checkbox'

defineOptions({
  name: 'MyCheckbox'
})

const props = defineProps(checkboxProps)
const emit = defineEmits(checkboxEmits)

const checkboxGroup = inject('checkboxGroup', {
  modelValue: computed(() => []),
  disabled: false,
  size: 'default'
})

const input = ref<HTMLInputElement>()

const isGroup = computed(() => checkboxGroup.modelValue !== undefined)

const isChecked = computed(() => {
  if (isGroup.value) {
    return checkboxGroup.modelValue.value.includes(props.value)
  }
  return props.modelValue
})

const handleChange = (evt: Event) => {
  if (props.disabled) return
  const target = evt.target as HTMLInputElement
  const value = target.checked
  if (isGroup.value) {
    const newValue = [...checkboxGroup.modelValue.value]
    if (value) {
      newValue.push(props.value)
    } else {
      const index = newValue.indexOf(props.value)
      if (index > -1) {
        newValue.splice(index, 1)
      }
    }
    emit('update:modelValue', newValue)
    emit('change', newValue)
  } else {
    emit('update:modelValue', value)
    emit('change', value)
  }
}
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-checkbox {
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
    border-radius: 2px;
    @include transition(all);

    &::after {
      position: absolute;
      top: 1px;
      left: 4px;
      width: 3px;
      height: 7px;
      border: 1px solid #fff;
      border-left: 0;
      border-top: 0;
      transform: rotate(45deg) scaleY(0);
      @include transition(transform);
    }
  }

  &__label {
    padding-left: 8px;
    line-height: 1;
  }

  &.is-checked {
    .my-checkbox__inner {
      background-color: $primary-color;
      border-color: $primary-color;

      &::after {
        transform: rotate(45deg) scaleY(1);
      }
    }
  }

  &.is-indeterminate {
    .my-checkbox__inner {
      background-color: $primary-color;
      border-color: $primary-color;

      &::after {
        position: absolute;
        top: 6px;
        left: 2px;
        width: 8px;
        height: 1px;
        border: none;
        background-color: #fff;
        transform: none;
      }
    }
  }

  &.is-disabled {
    .my-checkbox__inner {
      background-color: $bg-color-disabled;
      border-color: $border-color-disabled;

      &::after {
        border-color: $text-disabled;
      }
    }

    &.is-checked {
      .my-checkbox__inner {
        background-color: $bg-color-disabled;
        border-color: $border-color-disabled;

        &::after {
          border-color: $text-disabled;
        }
      }
    }

    &.is-indeterminate {
      .my-checkbox__inner {
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