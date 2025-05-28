import type { ExtractPropTypes, PropType } from 'vue'

export type FormLabelPosition = 'left' | 'right' | 'top'
export type FormSize = 'small' | 'default' | 'large'

export const formProps = {
  model: {
    type: Object,
    required: true
  },
  rules: {
    type: Object,
    default: () => ({})
  },
  labelPosition: {
    type: String as PropType<FormLabelPosition>,
    default: 'right'
  },
  labelWidth: {
    type: [String, Number],
    default: ''
  },
  labelSuffix: {
    type: String,
    default: ''
  },
  inline: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<FormSize>,
    default: 'default'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  validateOnRuleChange: {
    type: Boolean,
    default: true
  },
  hideRequiredAsterisk: {
    type: Boolean,
    default: false
  },
  showMessage: {
    type: Boolean,
    default: true
  },
  scrollToError: {
    type: Boolean,
    default: false
  }
} as const

export type FormProps = ExtractPropTypes<typeof formProps>

export const formEmits = {
  validate: (prop: string, isValid: boolean, message: string) => true
}

export type FormEmits = typeof formEmits

export interface FormValidateCallback {
  (isValid: boolean, invalidFields?: Record<string, any>): void
}

export interface FormValidateFieldCallback {
  (isValid: boolean, invalidFields?: Record<string, any>): void
}

export interface FormInstance {
  validate: (callback?: FormValidateCallback) => Promise<boolean>
  validateField: (props?: string | string[], callback?: FormValidateFieldCallback) => Promise<void>
  resetFields: () => void
  clearValidate: (props?: string | string[]) => void
  scrollToField: (prop: string) => void
} 