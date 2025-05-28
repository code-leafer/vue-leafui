import type { ExtractPropTypes, PropType } from 'vue'

export type TagType = 'success' | 'info' | 'warning' | 'danger'
export type TagSize = 'small' | 'default' | 'large'
export type TagEffect = 'light' | 'dark' | 'plain'

export const tagProps = {
  type: {
    type: String as PropType<TagType>,
    default: ''
  },
  size: {
    type: String as PropType<TagSize>,
    default: 'default'
  },
  effect: {
    type: String as PropType<TagEffect>,
    default: 'light'
  },
  closable: {
    type: Boolean,
    default: false
  },
  disableTransitions: {
    type: Boolean,
    default: false
  },
  hit: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: ''
  },
  round: {
    type: Boolean,
    default: false
  }
} as const

export type TagProps = ExtractPropTypes<typeof tagProps> 