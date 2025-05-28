import type { ExtractPropTypes, PropType } from 'vue'

export type TooltipEffect = 'dark' | 'light'
export type TooltipPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'

export const tooltipProps = {
  content: {
    type: String,
    default: ''
  },
  effect: {
    type: String as PropType<TooltipEffect>,
    default: 'dark'
  },
  placement: {
    type: String as PropType<TooltipPlacement>,
    default: 'bottom'
  },
  visible: {
    type: Boolean,
    default: undefined
  },
  disabled: {
    type: Boolean,
    default: false
  },
  offset: {
    type: Number,
    default: 0
  },
  transition: {
    type: String,
    default: 'my-fade-in-linear'
  },
  popperOptions: {
    type: Object,
    default: () => ({})
  },
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  },
  showArrow: {
    type: Boolean,
    default: true
  },
  persistent: {
    type: Boolean,
    default: false
  },
  trigger: {
    type: String as PropType<'hover' | 'click' | 'focus' | 'manual'>,
    default: 'hover'
  },
  popperClass: {
    type: String,
    default: ''
  },
  enterable: {
    type: Boolean,
    default: true
  },
  tabindex: {
    type: [String, Number],
    default: 0
  }
} as const

export type TooltipProps = ExtractPropTypes<typeof tooltipProps>

export interface TooltipInstance {
  updatePopper: () => void
  showPopper: () => void
  hidePopper: () => void
  handleFocus: () => void
  handleBlur: () => void
  handleMouseEnter: () => void
  handleMouseLeave: () => void
  handleClick: () => void
  handleKeydown: (e: KeyboardEvent) => void
} 