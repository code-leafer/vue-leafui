import type { ExtractPropTypes, PropType } from 'vue'

export type DropdownTrigger = 'hover' | 'click' | 'contextmenu'
export type DropdownPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'

export interface DropdownItem {
  label: string
  command?: string | number | object
  disabled?: boolean
  divided?: boolean
  icon?: string
}

export const dropdownProps = {
  trigger: {
    type: String as PropType<DropdownTrigger>,
    default: 'hover'
  },
  placement: {
    type: String as PropType<DropdownPlacement>,
    default: 'bottom'
  },
  visible: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array as PropType<DropdownItem[]>,
    default: () => []
  },
  disabled: {
    type: Boolean,
    default: false
  },
  showTimeout: {
    type: Number,
    default: 150
  },
  hideTimeout: {
    type: Number,
    default: 150
  },
  popperClass: {
    type: String,
    default: ''
  },
  popperAppendToBody: {
    type: Boolean,
    default: true
  }
} as const

export const dropdownItemProps = {
  command: {
    type: [String, Number, Object],
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  divided: {
    type: Boolean,
    default: false
  },
  icon: {
    type: String,
    default: ''
  }
} as const

export type DropdownProps = ExtractPropTypes<typeof dropdownProps>
export type DropdownItemProps = ExtractPropTypes<typeof dropdownItemProps> 