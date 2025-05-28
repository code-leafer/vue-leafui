import type { ExtractPropTypes, PropType } from 'vue'

export type TimePickerType = 'time' | 'timerange'

export const timePickerProps = {
  modelValue: {
    type: [String, Array] as PropType<string | string[]>,
    default: ''
  },
  type: {
    type: String as PropType<TimePickerType>,
    default: 'time'
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  },
  valueFormat: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请选择时间'
  },
  startPlaceholder: {
    type: String,
    default: '开始时间'
  },
  endPlaceholder: {
    type: String,
    default: '结束时间'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default'
  },
  name: {
    type: String,
    default: ''
  },
  rangeSeparator: {
    type: String,
    default: '至'
  },
  disabledHours: {
    type: Function as PropType<() => number[]>,
    default: () => []
  },
  disabledMinutes: {
    type: Function as PropType<(hour: number) => number[]>,
    default: () => []
  },
  disabledSeconds: {
    type: Function as PropType<(hour: number, minute: number) => number[]>,
    default: () => []
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const

export type TimePickerProps = ExtractPropTypes<typeof timePickerProps>

export const timePickerEmits = {
  'update:modelValue': (value: string | string[]) => true,
  change: (value: string | string[]) => true,
  blur: (evt: FocusEvent) => true,
  focus: (evt: FocusEvent) => true,
  clear: () => true
}

export type TimePickerEmits = typeof timePickerEmits 