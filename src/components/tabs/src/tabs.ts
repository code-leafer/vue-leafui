import type { ExtractPropTypes, PropType } from 'vue'

export type TabsType = 'line' | 'card' | 'border-card'
export type TabsPosition = 'top' | 'right' | 'bottom' | 'left'

export interface TabPaneInstance {
  label: string
  name: string | number
  disabled?: boolean
  closable?: boolean
  lazy?: boolean
}

export const tabsProps = {
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String as PropType<TabsType>,
    default: 'line'
  },
  closable: {
    type: Boolean,
    default: false
  },
  addable: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
  position: {
    type: String as PropType<TabsPosition>,
    default: 'top'
  },
  stretch: {
    type: Boolean,
    default: false
  }
} as const

export type TabsProps = ExtractPropTypes<typeof tabsProps>

export const tabPaneProps = {
  label: {
    type: String,
    required: true
  },
  name: {
    type: [String, Number],
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  },
  lazy: {
    type: Boolean,
    default: false
  }
} as const

export type TabPaneProps = ExtractPropTypes<typeof tabPaneProps>

export interface TabsContext {
  modelValue: string | number
  registerTab: (tab: TabPaneInstance) => void
  unregisterTab: (tab: TabPaneInstance) => void
} 