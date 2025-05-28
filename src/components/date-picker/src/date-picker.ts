import type { ExtractPropTypes, PropType } from 'vue'

export type DatePickerType = 'year' | 'month' | 'date' | 'datetime' | 'week' | 'datetimerange' | 'daterange'
export type DatePickerSize = 'small' | 'default' | 'large'

export const datePickerProps = {
  modelValue: {
    type: [Date, String, Number, Array] as PropType<Date | string | number | (Date | string | number)[]>,
    default: ''
  },
  type: {
    type: String as PropType<DatePickerType>,
    default: 'date'
  },
  size: {
    type: String as PropType<DatePickerSize>,
    default: 'default'
  },
  placeholder: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: true
  },
  readonly: {
    type: Boolean,
    default: false
  },
  format: {
    type: String,
    default: ''
  },
  valueFormat: {
    type: String,
    default: ''
  },
  rangeSeparator: {
    type: String,
    default: '-'
  },
  startPlaceholder: {
    type: String,
    default: '开始日期'
  },
  endPlaceholder: {
    type: String,
    default: '结束日期'
  },
  name: {
    type: String,
    default: ''
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const

export type DatePickerProps = ExtractPropTypes<typeof datePickerProps>

export const datePickerEmits = {
  'update:modelValue': (value: Date | string | number | (Date | string | number)[]) => true,
  change: (value: Date | string | number | (Date | string | number)[]) => true,
  blur: (evt: FocusEvent) => true,
  focus: (evt: FocusEvent) => true,
  clear: () => true
}

export type DatePickerEmits = typeof datePickerEmits 