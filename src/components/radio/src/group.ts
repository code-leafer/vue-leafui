import type { ExtractPropTypes, PropType } from 'vue'

export type RadioGroupSize = 'small' | 'default' | 'large'

export const radioGroupProps = {
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  size: {
    type: String as PropType<RadioGroupSize>,
    default: 'default'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  textColor: {
    type: String,
    default: '#ffffff'
  },
  fill: {
    type: String,
    default: '#409eff'
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const

export type RadioGroupProps = ExtractPropTypes<typeof radioGroupProps>

export const radioGroupEmits = {
  'update:modelValue': (value: string | number | boolean) => true,
  change: (value: string | number | boolean) => true
}

export type RadioGroupEmits = typeof radioGroupEmits 