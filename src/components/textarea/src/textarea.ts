import type { ExtractPropTypes, PropType } from 'vue'

export type TextareaSize = 'small' | 'default' | 'large'

export const textareaProps = {
  modelValue: {
    type: String,
    default: ''
  },
  size: {
    type: String as PropType<TextareaSize>,
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
  showWordLimit: {
    type: Boolean,
    default: false
  },
  maxlength: {
    type: Number,
    default: undefined
  },
  minlength: {
    type: Number,
    default: undefined
  },
  rows: {
    type: Number,
    default: 3
  },
  resize: {
    type: String as PropType<'none' | 'both' | 'horizontal' | 'vertical'>,
    default: 'none'
  },
  autosize: {
    type: [Boolean, Object] as PropType<boolean | { minRows?: number; maxRows?: number }>,
    default: false
  }
} as const

export type TextareaProps = ExtractPropTypes<typeof textareaProps>

export const textareaEmits = {
  'update:modelValue': (value: string) => true,
  input: (value: string) => true,
  change: (value: string) => true,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true
}

export type TextareaEmits = typeof textareaEmits 