<template>
  <div
    ref="selectRef"
    :class="[
      'my-select',
      `my-select--${size}`,
      {
        'is-disabled': disabled,
        'is-clearable': clearable,
        'is-multiple': multiple,
        'is-filterable': filterable,
        'is-loading': loading,
        'is-focus': isFocus
      }
    ]"
    @click="handleClick"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div
      ref="inputRef"
      :class="[
        'my-select__input',
        {
          'is-focus': isFocus
        }
      ]"
    >
      <div
        v-if="multiple"
        class="my-select__tags"
        :style="{ maxWidth: inputWidth - 32 + 'px' }"
      >
        <span
          v-for="item in selectedOptions"
          :key="item.value"
          class="my-select__tag"
          :class="`my-tag--${tagType}`"
        >
          <span class="my-select__tag-text">{{ item.label }}</span>
          <i
            class="my-select__tag-close my-icon-close"
            @click.stop="handleRemoveTag(item)"
          ></i>
        </span>
        <input
          v-if="filterable"
          ref="input"
          v-model="query"
          type="text"
          class="my-select__input-inner"
          :disabled="disabled"
          :placeholder="selectedOptions.length ? '' : placeholder"
          @focus="handleFocus"
          @blur="handleBlur"
          @input="handleInput"
          @keydown="handleKeydown"
        />
      </div>
      <input
        v-else
        ref="input"
        :value="selectedLabel"
        type="text"
        class="my-select__input-inner"
        :disabled="disabled"
        :placeholder="placeholder"
        :readonly="!filterable"
        @focus="handleFocus"
        @blur="handleBlur"
        @input="handleInput"
        @keydown="handleKeydown"
      />
    </div>
    <span
      v-if="clearable && hovering && selectedOptions.length"
      class="my-select__clear"
      @click.stop="handleClear"
    >
      <i :class="clearIcon"></i>
    </span>
    <span
      v-else
      class="my-select__suffix"
      :class="{ 'is-reverse': visible }"
    >
      <i :class="suffixIcon"></i>
    </span>
    <div
      v-show="visible"
      ref="popperRef"
      :class="['my-select__popper', popperClass]"
      :style="popperStyle"
    >
      <div class="my-select__dropdown">
        <div
          v-if="loading"
          class="my-select__loading"
        >
          <i class="my-icon-loading"></i>
          <span>{{ loadingText }}</span>
        </div>
        <div
          v-else-if="filterable && !filteredOptions.length"
          class="my-select__empty"
        >
          {{ noMatchText }}
        </div>
        <div
          v-else-if="!options.length"
          class="my-select__empty"
        >
          {{ noDataText }}
        </div>
        <ul
          v-else
          class="my-select__options"
        >
          <li
            v-for="option in filteredOptions"
            :key="option.value"
            :class="[
              'my-select__option',
              {
                'is-selected': isSelected(option),
                'is-disabled': option.disabled
              }
            ]"
            @click.stop="handleOptionClick(option)"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { selectProps, selectEmits, type SelectOption } from './select'
import { usePopper } from '../../hooks/use-popper'

defineOptions({
  name: 'MySelect'
})

const props = defineProps(selectProps)
const emit = defineEmits(selectEmits)

const selectRef = ref<HTMLElement>()
const inputRef = ref<HTMLElement>()
const input = ref<HTMLInputElement>()
const popperRef = ref<HTMLElement>()
const inputWidth = ref(0)
const hovering = ref(false)
const isFocus = ref(false)
const visible = ref(false)
const query = ref('')
const options = ref<SelectOption[]>([])
const selectedOptions = ref<SelectOption[]>([])

const selectedLabel = computed(() => {
  const option = selectedOptions.value[0]
  return option ? option.label : ''
})

const filteredOptions = computed(() => {
  if (!props.filterable || !query.value) {
    return options.value
  }
  return options.value.filter(option => {
    return option.label.toLowerCase().includes(query.value.toLowerCase())
  })
})

const popperStyle = computed(() => {
  if (!selectRef.value) return {}
  const { width } = selectRef.value.getBoundingClientRect()
  return {
    width: `${width}px`
  }
})

const { update } = usePopper(selectRef, popperRef, {
  placement: 'bottom-start',
  strategy: 'fixed',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 4]
      }
    }
  ]
})

const handleClick = () => {
  if (props.disabled) return
  visible.value = !visible.value
  emit('visibleChange', visible.value)
  if (visible.value) {
    nextTick(() => {
      update()
    })
  }
}

const handleFocus = (evt: FocusEvent) => {
  isFocus.value = true
  emit('focus', evt)
}

const handleBlur = (evt: FocusEvent) => {
  isFocus.value = false
  emit('blur', evt)
}

const handleInput = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  query.value = target.value
  if (props.remote && props.remoteMethod) {
    props.remoteMethod(query.value)
  }
}

const handleKeydown = (evt: KeyboardEvent) => {
  if (evt.key === 'Enter') {
    visible.value = false
    emit('visibleChange', false)
  }
}

const handleOptionClick = (option: SelectOption) => {
  if (option.disabled) return
  if (props.multiple) {
    const index = selectedOptions.value.findIndex(item => item.value === option.value)
    if (index > -1) {
      selectedOptions.value.splice(index, 1)
    } else {
      if (props.multipleLimit && selectedOptions.value.length >= props.multipleLimit) {
        return
      }
      selectedOptions.value.push(option)
    }
    emit('update:modelValue', selectedOptions.value.map(item => item.value))
    emit('change', selectedOptions.value.map(item => item.value))
  } else {
    selectedOptions.value = [option]
    emit('update:modelValue', option.value)
    emit('change', option.value)
    visible.value = false
    emit('visibleChange', false)
  }
}

const handleRemoveTag = (option: SelectOption) => {
  const index = selectedOptions.value.findIndex(item => item.value === option.value)
  if (index > -1) {
    selectedOptions.value.splice(index, 1)
    emit('update:modelValue', selectedOptions.value.map(item => item.value))
    emit('change', selectedOptions.value.map(item => item.value))
    emit('removeTag', option.value)
  }
}

const handleClear = () => {
  selectedOptions.value = []
  emit('update:modelValue', props.multiple ? [] : '')
  emit('change', props.multiple ? [] : '')
  emit('clear')
}

const isSelected = (option: SelectOption) => {
  return selectedOptions.value.some(item => item.value === option.value)
}

const updateInputWidth = () => {
  if (inputRef.value) {
    inputWidth.value = inputRef.value.getBoundingClientRect().width
  }
}

watch(
  () => props.modelValue,
  (val) => {
    if (props.multiple) {
      selectedOptions.value = options.value.filter(option => {
        return (val as (string | number)[]).includes(option.value)
      })
    } else {
      const option = options.value.find(option => option.value === val)
      selectedOptions.value = option ? [option] : []
    }
  },
  { immediate: true }
)

watch(
  () => visible.value,
  (val) => {
    if (val) {
      nextTick(() => {
        update()
      })
    }
  }
)

onMounted(() => {
  updateInputWidth()
  window.addEventListener('resize', updateInputWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateInputWidth)
})
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-select {
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

  &.is-focus {
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

    .my-select__input-inner {
      cursor: not-allowed;
    }
  }

  &__input {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 32px 0 12px;
    cursor: pointer;
  }

  &__input-inner {
    flex: 1;
    width: 100%;
    height: 100%;
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

  &__tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 4px;
    padding: 4px 0;
  }

  &__tag {
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 8px;
    border-radius: $border-radius-base;
    color: #fff;
    font-size: $font-size-small;
    line-height: 1;

    &-text {
      margin-right: 4px;
    }

    &-close {
      font-size: 14px;
      cursor: pointer;
      @include transition(color);

      &:hover {
        color: #fff;
      }
    }
  }

  &__clear,
  &__suffix {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
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

  &__clear {
    right: 0;
  }

  &__suffix {
    right: 0;

    &.is-reverse {
      transform: translateY(-50%) rotate(180deg);
    }
  }

  &__popper {
    position: fixed;
    z-index: 2000;
    background-color: #fff;
    border: 1px solid $border-color-base;
    border-radius: $border-radius-base;
    box-shadow: $box-shadow-light;
  }

  &__dropdown {
    max-height: 274px;
    overflow-y: auto;
  }

  &__loading,
  &__empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100px;
    color: $text-secondary;
    font-size: $font-size-base;
  }

  &__loading {
    i {
      margin-right: 8px;
      font-size: 16px;
      animation: rotating 2s linear infinite;
    }
  }

  &__options {
    margin: 0;
    padding: 4px 0;
    list-style: none;
  }

  &__option {
    padding: 8px 12px;
    color: $text-regular;
    font-size: $font-size-base;
    line-height: 1.5;
    cursor: pointer;
    @include transition(background-color);

    &:hover {
      background-color: $bg-color-light;
    }

    &.is-selected {
      color: $primary-color;
      font-weight: bold;
      background-color: $bg-color-light;
    }

    &.is-disabled {
      color: $text-disabled;
      cursor: not-allowed;
    }
  }
}

@keyframes rotating {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style> 