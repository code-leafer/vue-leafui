import type { ExtractPropTypes, PropType } from 'vue'

export type RadioSize = 'small' | 'default' | 'large'

export const radioProps = {
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  label: {
    type: [String, Number, Boolean],
    default: ''
  },
  size: {
    type: String as PropType<RadioSize>,
    default: 'default'
  },
  disabled: {
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
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const

export type RadioProps = ExtractPropTypes<typeof radioProps>

export const radioEmits = {
  'update:modelValue': (value: string | number | boolean) => true,
  change: (value: string | number | boolean) => true
}

export type RadioEmits = typeof radioEmits 