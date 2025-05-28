import type { ExtractPropTypes, PropType } from 'vue'

export type ModalSize = 'small' | 'default' | 'large'

export const modalProps = {
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: '50%'
  },
  size: {
    type: String as PropType<ModalSize>,
    default: 'default'
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  top: {
    type: [String, Number],
    default: '15vh'
  },
  modal: {
    type: Boolean,
    default: true
  },
  appendToBody: {
    type: Boolean,
    default: false
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  customClass: {
    type: String,
    default: ''
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
  beforeClose: {
    type: Function as PropType<(done: () => void) => void>,
    default: null
  },
  center: {
    type: Boolean,
    default: false
  },
  destroyOnClose: {
    type: Boolean,
    default: false
  }
} as const

export type ModalProps = ExtractPropTypes<typeof modalProps>

export const modalEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true
}

export type ModalEmits = typeof modalEmits 