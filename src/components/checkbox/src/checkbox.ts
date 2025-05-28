import type { ExtractPropTypes, PropType } from 'vue'

export type CheckboxSize = 'small' | 'default' | 'large'

export const checkboxProps = {
  modelValue: {
    type: [Boolean, Array] as PropType<boolean | (string | number)[]>,
    default: false
  },
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  size: {
    type: String as PropType<CheckboxSize>,
    default: 'default'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  indeterminate: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ''
  },
  value: {
    type: [String, Number, Boolean],
    default: ''
  },
  border: {
    type: Boolean,
    default: false
  },
  checked: {
    type: Boolean,
    default: false
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const

export type CheckboxProps = ExtractPropTypes<typeof checkboxProps>

export const checkboxEmits = {
  'update:modelValue': (value: boolean | (string | number)[]) => true,
  change: (value: boolean | (string | number)[]) => true
}

export type CheckboxEmits = typeof checkboxEmits 