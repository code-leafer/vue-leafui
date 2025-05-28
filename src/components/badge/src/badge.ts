import type { ExtractPropTypes, PropType } from 'vue'

export type BadgeType = 'primary' | 'success' | 'warning' | 'info' | 'danger'
export type BadgePosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export const badgeProps = {
  value: {
    type: [String, Number],
    default: ''
  },
  max: {
    type: Number,
    default: 99
  },
  type: {
    type: String as PropType<BadgeType>,
    default: 'danger'
  },
  dot: {
    type: Boolean,
    default: false
  },
  hidden: {
    type: Boolean,
    default: false
  },
  position: {
    type: String as PropType<BadgePosition>,
    default: 'top-right'
  }
} as const

export type BadgeProps = ExtractPropTypes<typeof badgeProps> 