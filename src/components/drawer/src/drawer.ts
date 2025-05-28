import type { ExtractPropTypes, PropType } from 'vue'

export type DrawerDirection = 'ltr' | 'rtl' | 'ttb' | 'btt'

export const drawerProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  direction: {
    type: String as PropType<DrawerDirection>,
    default: 'rtl'
  },
  size: {
    type: [String, Number],
    default: '30%'
  },
  appendToBody: {
    type: Boolean,
    default: false
  },
  beforeClose: {
    type: Function as PropType<(done: () => void) => void>,
    default: null
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  },
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  showClose: {
    type: Boolean,
    default: true
  },
  customClass: {
    type: String,
    default: ''
  },
  modalClass: {
    type: String,
    default: ''
  },
  zIndex: {
    type: Number,
    default: 2000
  },
  withHeader: {
    type: Boolean,
    default: true
  }
} as const

export type DrawerProps = ExtractPropTypes<typeof drawerProps> 