import type { ExtractPropTypes, PropType } from 'vue'

export type SwitchSize = 'small' | 'default' | 'large'

export const switchProps = {
  modelValue: {
    type: [Boolean, String, Number],
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<SwitchSize>,
    default: 'default'
  },
  width: {
    type: [String, Number],
    default: ''
  },
  activeText: {
    type: String,
    default: ''
  },
  inactiveText: {
    type: String,
    default: ''
  },
  activeValue: {
    type: [Boolean, String, Number],
    default: true
  },
  inactiveValue: {
    type: [Boolean, String, Number],
    default: false
  },
  activeColor: {
    type: String,
    default: '#409eff'
  },
  inactiveColor: {
    type: String,
    default: '#c0c4cc'
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

export type SwitchProps = ExtractPropTypes<typeof switchProps>

export const switchEmits = {
  'update:modelValue': (value: boolean | string | number) => true,
  change: (value: boolean | string | number) => true
}

export type SwitchEmits = typeof switchEmits 