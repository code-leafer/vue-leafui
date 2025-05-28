import type { ExtractPropTypes, PropType } from 'vue'

export interface ListItem {
  id: string | number
  title: string
  description?: string
  avatar?: string
  disabled?: boolean
  [key: string]: any
}

export const listProps = {
  data: {
    type: Array as PropType<ListItem[]>,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  finished: {
    type: Boolean,
    default: false
  },
  error: {
    type: Boolean,
    default: false
  },
  immediateCheck: {
    type: Boolean,
    default: true
  },
  offset: {
    type: Number,
    default: 300
  },
  direction: {
    type: String as PropType<'up' | 'down'>,
    default: 'down'
  }
} as const

export type ListProps = ExtractPropTypes<typeof listProps>

export const listItemProps = {
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type ListItemProps = ExtractPropTypes<typeof listItemProps> 