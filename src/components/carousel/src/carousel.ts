import type { ExtractPropTypes, PropType } from 'vue'

export type CarouselTrigger = 'hover' | 'click'
export type CarouselIndicatorPosition = 'outside' | 'none'

export const carouselProps = {
  height: {
    type: String,
    default: ''
  },
  initialIndex: {
    type: Number,
    default: 0
  },
  trigger: {
    type: String as PropType<CarouselTrigger>,
    default: 'hover'
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3000
  },
  indicatorPosition: {
    type: String as PropType<CarouselIndicatorPosition>,
    default: ''
  },
  arrow: {
    type: String,
    default: 'hover'
  },
  type: {
    type: String,
    default: ''
  },
  loop: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    default: 'horizontal'
  }
} as const

export type CarouselProps = ExtractPropTypes<typeof carouselProps>

export const carouselItemProps = {
  name: {
    type: String,
    default: ''
  },
  label: {
    type: [String, Number],
    default: ''
  }
} as const

export type CarouselItemProps = ExtractPropTypes<typeof carouselItemProps> 