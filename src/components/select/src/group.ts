import type { ExtractPropTypes } from 'vue'

export const groupProps = {
  label: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type GroupProps = ExtractPropTypes<typeof groupProps> 