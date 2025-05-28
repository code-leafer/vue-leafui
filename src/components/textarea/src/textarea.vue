<template>
  <div
    ref="textareaRef"
    :class="[
      'my-textarea',
      `my-textarea--${size}`,
      {
        'is-disabled': disabled,
        'is-readonly': readonly,
        'is-clearable': clearable
      }
    ]"
  >
    <textarea
      ref="textarea"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :minlength="minlength"
      :rows="rows"
      :style="{
        resize,
        height: textareaHeight
      }"
      class="my-textarea__inner"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    ></textarea>
    <template v-if="clearable && modelValue">
      <i class="my-textarea__clear-icon my-icon-close" @click="handleClear"></i>
    </template>
    <div v-if="showWordLimit && maxlength" class="my-textarea__word-limit">
      {{ modelValue.length }}/{{ maxlength }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { textareaProps, textareaEmits } from './textarea'

defineOptions({
  name: 'MyTextarea'
})

const props = defineProps(textareaProps)
const emit = defineEmits(textareaEmits)

const textareaRef = ref<HTMLElement>()
const textarea = ref<HTMLTextAreaElement>()
const textareaHeight = ref<string>('')

const updateHeight = async () => {
  if (!props.autosize || !textarea.value) return

  const el = textarea.value
  el.style.height = 'auto'

  const minRows = typeof props.autosize === 'object' ? props.autosize.minRows : undefined
  const maxRows = typeof props.autosize === 'object' ? props.autosize.maxRows : undefined

  const lineHeight = parseInt(getComputedStyle(el).lineHeight)
  const minHeight = minRows ? lineHeight * minRows : undefined
  const maxHeight = maxRows ? lineHeight * maxRows : undefined

  const scrollHeight = el.scrollHeight
  let height = scrollHeight

  if (minHeight) {
    height = Math.max(height, minHeight)
  }
  if (maxHeight) {
    height = Math.min(height, maxHeight)
  }

  textareaHeight.value = `${height}px`
}

const handleInput = (evt: Event) => {
  const target = evt.target as HTMLTextAreaElement
  const value = target.value
  emit('update:modelValue', value)
  emit('input', value)
  nextTick(updateHeight)
}

const handleChange = (evt: Event) => {
  const target = evt.target as HTMLTextAreaElement
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
  nextTick(updateHeight)
}

watch(
  () => props.modelValue,
  () => {
    nextTick(updateHeight)
  }
)

onMounted(() => {
  nextTick(updateHeight)
})
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-textarea {
  position: relative;
  display: inline-block;
  width: 100%;
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
    font-size: $font-size-small;
  }

  &--default {
    font-size: $font-size-base;
  }

  &--large {
    font-size: $font-size-large;
  }

  &.is-disabled {
    background-color: $bg-color-disabled;
    border-color: $border-color-disabled;
    color: $text-disabled;
    cursor: not-allowed;

    .my-textarea__inner {
      cursor: not-allowed;
    }
  }

  &.is-readonly {
    background-color: $bg-color-light;
    border-color: $border-color-base;
    cursor: not-allowed;

    .my-textarea__inner {
      cursor: not-allowed;
    }
  }

  &__inner {
    display: block;
    width: 100%;
    padding: 8px 12px;
    background: none;
    border: none;
    outline: none;
    color: $text-regular;
    font-size: inherit;
    line-height: 1.5;
    overflow: auto;

    &::placeholder {
      color: $text-placeholder;
    }
  }

  &__clear-icon {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: $text-secondary;
    font-size: 14px;
    cursor: pointer;
    @include transition(color);

    &:hover {
      color: $text-primary;
    }
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