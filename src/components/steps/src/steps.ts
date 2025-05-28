import type { ExtractPropTypes, PropType } from 'vue'

export type StepStatus = 'wait' | 'process' | 'finish' | 'error' | 'success'
export type StepDirection = 'horizontal' | 'vertical'
export type StepAlign = 'left' | 'center' | 'right'

export interface StepItem {
  title: string
  description?: string
  icon?: string
  status?: StepStatus
}

export const stepsProps = {
  active: {
    type: Number,
    default: 0
  },
  direction: {
    type: String as PropType<StepDirection>,
    default: 'horizontal'
  },
  align: {
    type: String as PropType<StepAlign>,
    default: 'left'
  },
  simple: {
    type: Boolean,
    default: false
  },
  finishStatus: {
    type: String as PropType<StepStatus>,
    default: 'finish'
  },
  processStatus: {
    type: String as PropType<StepStatus>,
    default: 'process'
  },
  items: {
    type: Array as PropType<StepItem[]>,
    default: () => []
  }
} as const

export const stepProps = {
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  status: {
    type: String as PropType<StepStatus>,
    default: ''
  },
  index: {
    type: Number,
    required: true
  }
} as const

export type StepsProps = ExtractPropTypes<typeof stepsProps>
export type StepProps = ExtractPropTypes<typeof stepProps> 