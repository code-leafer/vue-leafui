import type { ExtractPropTypes, PropType } from 'vue'

export type ProgressType = 'line' | 'circle' | 'dashboard'
export type ProgressStatus = 'success' | 'exception' | 'warning'

export const progressProps = {
  percentage: {
    type: Number,
    default: 0,
    validator: (val: number) => val >= 0 && val <= 100
  },
  type: {
    type: String as PropType<ProgressType>,
    default: 'line'
  },
  strokeWidth: {
    type: Number,
    default: 6
  },
  textInside: {
    type: Boolean,
    default: false
  },
  status: {
    type: String as PropType<ProgressStatus>,
    default: ''
  },
  color: {
    type: [String, Array, Function] as PropType<string | string[] | ((percentage: number) => string)>,
    default: ''
  },
  width: {
    type: Number,
    default: 126
  },
  showText: {
    type: Boolean,
    default: true
  },
  format: {
    type: Function as PropType<(percentage: number) => string>,
    default: (percentage: number) => `${percentage}%`
  }
} as const

export type ProgressProps = ExtractPropTypes<typeof progressProps> 