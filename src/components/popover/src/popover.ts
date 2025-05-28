import type { ExtractPropTypes, PropType } from 'vue'

export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual'
export type PopoverPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'

export const popoverProps = {
  trigger: {
    type: String as PropType<PopoverTrigger>,
    default: 'click'
  },
  placement: {
    type: String as PropType<PopoverPlacement>,
    default: 'bottom'
  },
  visible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  content: {
    type: String,
    default: ''
  },
  width: {
    type: [String, Number],
    default: 'auto'
  },
  popperClass: {
    type: String,
    default: ''
  },
  popperAppendToBody: {
    type: Boolean,
    default: true
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  showTimeout: {
    type: Number,
    default: 200
  },
  hideTimeout: {
    type: Number,
    default: 200
  },
  tabindex: {
    type: [String, Number],
    default: 0
  }
} as const

export type PopoverProps = ExtractPropTypes<typeof popoverProps> 