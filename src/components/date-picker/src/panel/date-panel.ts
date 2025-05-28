import type { ExtractPropTypes, PropType } from 'vue'

export type DatePanelType = 'year' | 'month' | 'date' | 'datetime' | 'week' | 'datetimerange' | 'daterange'

export const datePanelProps = {
  modelValue: {
    type: [Date, String, Number, Array] as PropType<Date | string | number | (Date | string | number)[]>,
    default: ''
  },
  type: {
    type: String as PropType<DatePanelType>,
    default: 'date'
  },
  format: {
    type: String,
    default: ''
  },
  valueFormat: {
    type: String,
    default: ''
  },
  disabledDate: {
    type: Function as PropType<(date: Date) => boolean>,
    default: () => false
  },
  firstDayOfWeek: {
    type: Number,
    default: 1
  },
  shortcuts: {
    type: Array as PropType<{ text: string; value: Date | (() => Date) }[]>,
    default: () => []
  }
} as const

export type DatePanelProps = ExtractPropTypes<typeof datePanelProps>

export const datePanelEmits = {
  'update:modelValue': (value: Date | string | number | (Date | string | number)[]) => true,
  change: (value: Date | string | number | (Date | string | number)[]) => true,
  'panel-change': (date: Date, type: string) => true
}

export type DatePanelEmits = typeof datePanelEmits 