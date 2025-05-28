<template>
  <div
    :class="[
      'my-time-picker',
      `my-time-picker--${size}`,
      {
        'is-disabled': disabled,
        'is-range': isRange
      }
    ]"
  >
    <div
      :class="[
        'my-time-picker__editor-wrap',
        {
          'is-range': isRange
        }
      ]"
      @click="handleClick"
    >
      <input
        v-if="!isRange"
        ref="input"
        :class="['my-time-picker__editor']"
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
          :class="['my-time-picker__editor']"
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
        <span class="my-time-picker__range-separator">{{ rangeSeparator }}</span>
        <input
          ref="endInput"
          :class="['my-time-picker__editor']"
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
        class="my-time-picker__clear"
        @click.stop="handleClear"
      >
        <i class="my-icon-close"></i>
      </span>
      <span class="my-time-picker__icon">
        <i class="my-icon-time"></i>
      </span>
    </div>
    <div
      v-if="visible"
      class="my-time-picker__panel"
    >
      <div class="my-time-picker__panel-content">
        <div class="my-time-picker__panel-column">
          <div
            v-for="hour in hours"
            :key="hour"
            :class="[
              'my-time-picker__panel-cell',
              {
                'is-disabled': isHourDisabled(hour),
                'is-selected': isHourSelected(hour)
              }
            ]"
            @click="handleHourClick(hour)"
          >
            {{ hour }}
          </div>
        </div>
        <div class="my-time-picker__panel-column">
          <div
            v-for="minute in minutes"
            :key="minute"
            :class="[
              'my-time-picker__panel-cell',
              {
                'is-disabled': isMinuteDisabled(minute),
                'is-selected': isMinuteSelected(minute)
              }
            ]"
            @click="handleMinuteClick(minute)"
          >
            {{ minute }}
          </div>
        </div>
        <div class="my-time-picker__panel-column">
          <div
            v-for="second in seconds"
            :key="second"
            :class="[
              'my-time-picker__panel-cell',
              {
                'is-disabled': isSecondDisabled(second),
                'is-selected': isSecondSelected(second)
              }
            ]"
            @click="handleSecondClick(second)"
          >
            {{ second }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { timePickerProps, timePickerEmits } from './time-picker'
import dayjs from 'dayjs'

defineOptions({
  name: 'MyTimePicker'
})

const props = defineProps(timePickerProps)
const emit = defineEmits(timePickerEmits)

const input = ref<HTMLInputElement>()
const startInput = ref<HTMLInputElement>()
const endInput = ref<HTMLInputElement>()
const visible = ref(false)

const isRange = computed(() => {
  return props.type === 'timerange'
})

const displayValue = computed(() => {
  if (!props.modelValue) return ''
  if (props.format) {
    return dayjs(props.modelValue, 'HH:mm:ss').format(props.format)
  }
  return props.modelValue
})

const startDisplayValue = computed(() => {
  if (!Array.isArray(props.modelValue) || !props.modelValue[0]) return ''
  if (props.format) {
    return dayjs(props.modelValue[0], 'HH:mm:ss').format(props.format)
  }
  return props.modelValue[0]
})

const endDisplayValue = computed(() => {
  if (!Array.isArray(props.modelValue) || !props.modelValue[1]) return ''
  if (props.format) {
    return dayjs(props.modelValue[1], 'HH:mm:ss').format(props.format)
  }
  return props.modelValue[1]
})

const hours = computed(() => {
  return Array.from({ length: 24 }, (_, i) => i)
})

const minutes = computed(() => {
  return Array.from({ length: 60 }, (_, i) => i)
})

const seconds = computed(() => {
  return Array.from({ length: 60 }, (_, i) => i)
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

const isHourDisabled = (hour: number) => {
  return props.disabledHours().includes(hour)
}

const isMinuteDisabled = (minute: number) => {
  const hour = dayjs(props.modelValue, 'HH:mm:ss').hour()
  return props.disabledMinutes(hour).includes(minute)
}

const isSecondDisabled = (second: number) => {
  const hour = dayjs(props.modelValue, 'HH:mm:ss').hour()
  const minute = dayjs(props.modelValue, 'HH:mm:ss').minute()
  return props.disabledSeconds(hour, minute).includes(second)
}

const isHourSelected = (hour: number) => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.some(value => dayjs(value, 'HH:mm:ss').hour() === hour)
  }
  return dayjs(props.modelValue, 'HH:mm:ss').hour() === hour
}

const isMinuteSelected = (minute: number) => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.some(value => dayjs(value, 'HH:mm:ss').minute() === minute)
  }
  return dayjs(props.modelValue, 'HH:mm:ss').minute() === minute
}

const isSecondSelected = (second: number) => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.some(value => dayjs(value, 'HH:mm:ss').second() === second)
  }
  return dayjs(props.modelValue, 'HH:mm:ss').second() === second
}

const handleHourClick = (hour: number) => {
  if (isHourDisabled(hour)) return
  const value = dayjs(props.modelValue, 'HH:mm:ss').hour(hour).format('HH:mm:ss')
  emit('update:modelValue', value)
  emit('change', value)
  if (!isRange.value) {
    visible.value = false
  }
}

const handleMinuteClick = (minute: number) => {
  if (isMinuteDisabled(minute)) return
  const value = dayjs(props.modelValue, 'HH:mm:ss').minute(minute).format('HH:mm:ss')
  emit('update:modelValue', value)
  emit('change', value)
  if (!isRange.value) {
    visible.value = false
  }
}

const handleSecondClick = (second: number) => {
  if (isSecondDisabled(second)) return
  const value = dayjs(props.modelValue, 'HH:mm:ss').second(second).format('HH:mm:ss')
  emit('update:modelValue', value)
  emit('change', value)
  if (!isRange.value) {
    visible.value = false
  }
}
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-time-picker {
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

  &__panel-content {
    display: flex;
    background-color: #fff;
    border: 1px solid $border-color-base;
    border-radius: $border-radius-base;
    box-shadow: $box-shadow-light;
  }

  &__panel-column {
    width: 60px;
    max-height: 200px;
    overflow-y: auto;
    border-right: 1px solid $border-color-base;

    &:last-child {
      border-right: none;
    }
  }

  &__panel-cell {
    padding: 8px 0;
    text-align: center;
    font-size: $font-size-base;
    color: $text-regular;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: $primary-color;
      background-color: rgba($primary-color, 0.1);
    }

    &.is-disabled {
      color: $text-disabled;
      cursor: not-allowed;
    }

    &.is-selected {
      color: #fff;
      background-color: $primary-color;
    }
  }
}
</style> 