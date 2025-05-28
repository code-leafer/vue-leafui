import type { ExtractPropTypes, PropType } from 'vue'

export const iconProps = {
  name: {
    type: String,
    required: true
  },
  size: {
    type: [String, Number],
    default: 16
  },
  color: {
    type: String,
    default: ''
  }
} as const

export type IconProps = ExtractPropTypes<typeof iconProps> 