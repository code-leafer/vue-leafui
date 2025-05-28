import type { ExtractPropTypes, PropType } from 'vue'

export type ButtonType = 'primary' | 'success' | 'warning' | 'danger' | 'info'
export type ButtonSize = 'large' | 'default' | 'small'

export const buttonProps = {
  type: {
    type: String as PropType<ButtonType>,
    default: 'default',
    validator: (val: string) => {
      return ['default', 'primary', 'success', 'warning', 'danger', 'info'].includes(val)
    }
  },
  size: {
    type: String as PropType<ButtonSize>,
    default: 'default',
    validator: (val: string) => {
      return ['large', 'default', 'small'].includes(val)
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  },
  round: {
    type: Boolean,
    default: false
  },
  plain: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false
  },
  link: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  }
} as const

export type ButtonProps = ExtractPropTypes<typeof buttonProps>

export const buttonEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type ButtonEmits = typeof buttonEmits 