import type { ExtractPropTypes, PropType } from 'vue'

export type CheckboxGroupSize = 'small' | 'default' | 'large'

export const checkboxGroupProps = {
  modelValue: {
    type: Array as PropType<(string | number)[]>,
    default: () => []
  },
  size: {
    type: String as PropType<CheckboxGroupSize>,
    default: 'default'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  min: {
    type: Number,
    default: undefined
  },
  max: {
    type: Number,
    default: undefined
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

export type CheckboxGroupProps = ExtractPropTypes<typeof checkboxGroupProps>

export const checkboxGroupEmits = {
  'update:modelValue': (value: (string | number)[]) => true,
  change: (value: (string | number)[]) => true
}

export type CheckboxGroupEmits = typeof checkboxGroupEmits 