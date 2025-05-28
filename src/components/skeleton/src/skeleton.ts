import type { ExtractPropTypes, PropType } from 'vue'

export type SkeletonItemType = 'image' | 'p' | 'text' | 'button' | 'circle' | 'rect'

export const skeletonProps = {
  animated: {
    type: Boolean,
    default: false
  },
  count: {
    type: Number,
    default: 1
  },
  rows: {
    type: Number,
    default: 3
  },
  loading: {
    type: Boolean,
    default: true
  },
  throttle: {
    type: Number,
    default: 0
  }
} as const

export const skeletonItemProps = {
  variant: {
    type: String as PropType<SkeletonItemType>,
    default: 'text'
  },
  animated: {
    type: Boolean,
    default: false
  }
} as const

export type SkeletonProps = ExtractPropTypes<typeof skeletonProps>
export type SkeletonItemProps = ExtractPropTypes<typeof skeletonItemProps> 