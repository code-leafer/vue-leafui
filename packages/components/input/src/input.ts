import type { ExtractPropTypes, PropType } from 'vue'

export type InputType = 'text' | 'password' | 'number' | 'email' | 'tel' | 'url'
export type InputSize = 'small' | 'default' | 'large'

export const inputProps = {
  type: {
    type: String as PropType<InputType>,
    default: 'text'
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  size: {
    type: String as PropType<InputSize>,
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
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  prefixIcon: {
    type: String,
    default: ''
  },
  suffixIcon: {
    type: String,
    default: ''
  },
  maxlength: {
    type: Number,
    default: undefined
  },
  minlength: {
    type: Number,
    default: undefined
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const

export type InputProps = ExtractPropTypes<typeof inputProps>

export const inputEmits = {
  'update:modelValue': (value: string | number) => true,
  input: (value: string | number) => true,
  change: (value: string | number) => true,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true
}

export type InputEmits = typeof inputEmits 