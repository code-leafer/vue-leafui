<template>
  <div
    :class="[
      'my-date-picker',
      `my-date-picker--${size}`,
      {
        'is-disabled': disabled,
        'is-range': isRange
      }
    ]"
  >
    <div
      :class="[
        'my-date-picker__editor-wrap',
        {
          'is-range': isRange
        }
      ]"
      @click="handleClick"
    >
      <input
        v-if="!isRange"
        ref="input"
        :class="['my-date-picker__editor']"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :name="name"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
      <template v-else>
        <input
          ref="startInput"
          :class="['my-date-picker__editor']"
          :value="startDisplayValue"
          :placeholder="startPlaceholder"
          :disabled="disabled"
          :readonly="readonly"
          :name="name"
          @input="handleStartInput"
          @change="handleStartChange"
          @focus="handleStartFocus"
          @blur="handleStartBlur"
        />
        <span class="my-date-picker__range-separator">{{ rangeSeparator }}</span>
        <input
          ref="endInput"
          :class="['my-date-picker__editor']"
          :value="endDisplayValue"
          :placeholder="endPlaceholder"
          :disabled="disabled"
          :readonly="readonly"
          :name="name"
          @input="handleEndInput"
          @change="handleEndChange"
          @focus="handleEndFocus"
          @blur="handleEndBlur"
        />
      </template>
      <span
        v-if="clearable && displayValue"
        class="my-date-picker__clear"
        @click.stop="handleClear"
      >
        <i class="my-icon-close"></i>
      </span>
      <span class="my-date-picker__icon">
        <i class="my-icon-calendar"></i>
      </span>
    </div>
    <div
      v-if="visible"
      class="my-date-picker__panel"
    >
      <date-panel
        v-model="modelValue"
        :type="type"
        :format="format"
        :value-format="valueFormat"
        :disabled-date="disabledDate"
        :first-day-of-week="firstDayOfWeek"
        :shortcuts="shortcuts"
        @change="handlePanelChange"
        @panel-change="handlePanelChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { datePickerProps, datePickerEmits } from './date-picker'
import DatePanel from './panel/date-panel.vue'
import dayjs from 'dayjs'

defineOptions({
  name: 'MyDatePicker'
})

const props = defineProps(datePickerProps)
const emit = defineEmits(datePickerEmits)

const input = ref<HTMLInputElement>()
const startInput = ref<HTMLInputElement>()
const endInput = ref<HTMLInputElement>()
const visible = ref(false)

const isRange = computed(() => {
  return ['daterange', 'datetimerange'].includes(props.type)
})

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  if (props.format) {
    return dayjs(props.modelValue).format(props.format)
  }
  return props.modelValue
})

const startDisplayValue = computed(() => {
  if (!Array.isArray(props.modelValue) || !props.modelValue[0]) return ''
  if (props.format) {
    return dayjs(props.modelValue[0]).format(props.format)
  }
  return props.modelValue[0]
})

const endDisplayValue = computed(() => {
  if (!Array.isArray(props.modelValue) || !props.modelValue[1]) return ''
  if (props.format) {
    return dayjs(props.modelValue[1]).format(props.format)
  }
  return props.modelValue[1]
})

const handleClick = () => {
  if (props.disabled || props.readonly) return
  visible.value = !visible.value
}

const handleInput = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleChange = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  emit('change', target.value)
}

const handleFocus = (evt: FocusEvent) => {
  emit('focus', evt)
}

const handleBlur = (evt: FocusEvent) => {
  emit('blur', evt)
}

const handleStartInput = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  const value = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  value[0] = target.value
  emit('update:modelValue', value)
}

const handleStartChange = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  const value = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  value[0] = target.value
  emit('change', value)
}

const handleStartFocus = (evt: FocusEvent) => {
  emit('focus', evt)
}

const handleStartBlur = (evt: FocusEvent) => {
  emit('blur', evt)
}

const handleEndInput = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  const value = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  value[1] = target.value
  emit('update:modelValue', value)
}

const handleEndChange = (evt: Event) => {
  const target = evt.target as HTMLInputElement
  const value = Array.isArray(props.modelValue) ? [...props.modelValue] : []
  value[1] = target.value
  emit('change', value)
}

const handleEndFocus = (evt: FocusEvent) => {
  emit('focus', evt)
}

const handleEndBlur = (evt: FocusEvent) => {
  emit('blur', evt)
}

const handleClear = () => {
  emit('update:modelValue', isRange.value ? [] : '')
  emit('clear')
}

const handlePanelChange = (value: Date | string | number | (Date | string | number)[]) => {
  emit('update:modelValue', value)
  emit('change', value)
  if (!isRange.value) {
    visible.value = false
  }
}
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-date-picker {
  position: relative;
  display: inline-block;
  width: 220px;
  line-height: 32px;

  &--small {
    width: 180px;
    line-height: 28px;
  }

  &--large {
    width: 260px;
    line-height: 36px;
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &__editor-wrap {
    position: relative;
    display: inline-block;
    width: 100%;
    background-color: #fff;
    border: 1px solid $border-color-base;
    border-radius: $border-radius-base;
    transition: all 0.3s;
    cursor: pointer;

    &:hover {
      border-color: $primary-color;
    }

    &.is-range {
      display: flex;
      align-items: center;
    }
  }

  &__editor {
    width: 100%;
    height: 100%;
    padding: 0 30px 0 15px;
    border: none;
    outline: none;
    background: none;
    font-size: $font-size-base;
    color: $text-regular;
    cursor: pointer;

    &::placeholder {
      color: $text-placeholder;
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  &__range-separator {
    padding: 0 5px;
    color: $text-regular;
  }

  &__clear {
    position: absolute;
    top: 50%;
    right: 30px;
    transform: translateY(-50%);
    color: $text-regular;
    cursor: pointer;
    font-size: 14px;

    &:hover {
      color: $text-secondary;
    }
  }

  &__icon {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    color: $text-regular;
    font-size: 14px;
  }

  &__panel {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 4px;
    z-index: 1000;
  }
}
</style> 