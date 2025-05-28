import type { ExtractPropTypes, PropType } from 'vue'

export type FormItemValidateState = '' | 'success' | 'error' | 'validating'

export const formItemProps = {
  label: {
    type: String,
    default: ''
  },
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  prop: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  rules: {
    type: [Object, Array] as PropType<Record<string, any> | Record<string, any>[]>,
    default: () => ({})
  },
  error: {
    type: String,
    default: ''
  },
  validateStatus: {
    type: String as PropType<FormItemValidateState>,
    default: ''
  },
  for: {
    type: String,
    default: ''
  },
  inlineMessage: {
    type: Boolean,
    default: false
  },
  showMessage: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'default'
  }
} as const

export type FormItemProps = ExtractPropTypes<typeof formItemProps>

export const formItemEmits = {
  validate: (prop: string, isValid: boolean, message: string) => true
}

export type FormItemEmits = typeof formItemEmits

export interface FormItemValidateCallback {
  (isValid: boolean, invalidFields?: Record<string, any>): void
}

export interface FormItemInstance {
  validate: (trigger?: string, callback?: FormItemValidateCallback) => Promise<boolean>
  resetField: () => void
  clearValidate: () => void
} 