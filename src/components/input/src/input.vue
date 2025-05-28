<template>
  <div
    ref="inputRef"
    :class="[
      'my-input',
      `my-input--${size}`,
      {
        'is-disabled': disabled,
        'is-readonly': readonly,
        'is-clearable': clearable,
        'is-show-password': showPassword,
        'has-prefix': prefixIcon,
        'has-suffix': suffixIcon || clearable || showPassword
      }
    ]"
  >
    <template v-if="prefixIcon">
      <i :class="['my-input__prefix-icon', prefixIcon]"></i>
    </template>
    <input
      ref="input"
      :type="inputType"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      class="my-input__inner"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <template v-if="suffixIcon">
      <i :class="['my-input__suffix-icon', suffixIcon]"></i>
    </template>
    <template v-if="clearable && modelValue">
      <i class="my-input__clear-icon my-icon-close" @click="handleClear"></i>
    </template>
    <template v-if="showPassword">
      <i
        :class="[
          'my-input__password-icon',
          passwordVisible ? 'my-icon-view' : 'my-icon-hide'
        ]"
        @click="handlePasswordToggle"
      ></i>
    </template>
    <div v-if="showWordLimit && maxlength" class="my-input__word-limit">
      {{ modelValue.length }}/{{ maxlength }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { inputProps, inputEmits } from './input'

defineOptions({
  name: 'MyInput'
})

const props = defineProps(inputProps)
const emit = defineEmits(inputEmits)

const inputRef = ref<HTMLElement>()
const input = ref<HTMLInputElement>()
const passwordVisible = ref(false)

const inputType = computed(() => {
  if (props.type === 'password' && props.showPassword) {
    return passwordVisible.value ? 'text' : 'password'
  }
  return props.type
})

const handleInput = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  const value = target.value
  emit('update:modelValue', value)
  emit('input', value)
}

const handleChange = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  const value = target.value
  emit('change', value)
}

const handleFocus = (evt: FocusEvent) => {
  emit('focus', evt)
}

const handleBlur = (evt: FocusEvent) => {
  emit('blur', evt)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
  emit('change', '')
}

const handlePasswordToggle = () => {
  passwordVisible.value = !passwordVisible.value
}

watch(
  () => props.modelValue,
  (val) => {
    if (props.type === 'number') {
      const value = val === '' ? '' : Number(val)
      if (value !== val) {
        emit('update:modelValue', value)
      }
    }
  }
)
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-input {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 100%;
  line-height: 1;
  background-color: #fff;
  border: 1px solid $border-color-base;
  border-radius: $border-radius-base;
  @include transition(all);

  &:hover {
    border-color: $border-color-hover;
  }

  &:focus-within {
    border-color: $primary-color;
  }

  &--small {
    height: 32px;
    font-size: $font-size-small;
  }

  &--default {
    height: 40px;
    font-size: $font-size-base;
  }

  &--large {
    height: 48px;
    font-size: $font-size-large;
  }

  &.is-disabled {
    background-color: $bg-color-disabled;
    border-color: $border-color-disabled;
    color: $text-disabled;
    cursor: not-allowed;

    .my-input__inner {
      cursor: not-allowed;
    }
  }

  &.is-readonly {
    background-color: $bg-color-light;
    border-color: $border-color-base;
    cursor: not-allowed;

    .my-input__inner {
      cursor: not-allowed;
    }
  }

  &__inner {
    flex: 1;
    width: 100%;
    height: 100%;
    padding: 0 12px;
    background: none;
    border: none;
    outline: none;
    color: $text-regular;
    font-size: inherit;
    line-height: inherit;

    &::placeholder {
      color: $text-placeholder;
    }
  }

  &__prefix-icon,
  &__suffix-icon,
  &__clear-icon,
  &__password-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 100%;
    color: $text-secondary;
    font-size: 16px;
    cursor: pointer;
    @include transition(color);

    &:hover {
      color: $text-primary;
    }
  }

  &__prefix-icon {
    margin-right: -12px;
  }

  &__suffix-icon,
  &__clear-icon,
  &__password-icon {
    margin-left: -12px;
  }

  &__word-limit {
    position: absolute;
    right: 12px;
    bottom: -20px;
    font-size: $font-size-small;
    color: $text-secondary;
  }
}
</style> 