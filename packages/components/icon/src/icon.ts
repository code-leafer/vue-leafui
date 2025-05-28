import type { ExtractPropTypes, PropType } from 'vue'

export type IconSize = 'small' | 'medium' | 'large' | number
export type IconColor = string

export const iconProps = {
  name: {
    type: String,
    required: true
  },
  size: {
    type: [String, Number] as PropType<IconSize>,
    default: 'medium'
  },
  color: {
    type: String as PropType<IconColor>,
    default: ''
  },
  spin: {
    type: Boolean,
    default: false
  },
  rotate: {
    type: Number,
    default: 0
  }
} as const

export type IconProps = ExtractPropTypes<typeof iconProps>

export const iconEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type IconEmits = typeof iconEmits 