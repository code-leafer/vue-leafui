import type { ExtractPropTypes, PropType } from 'vue'

export type LoadingType = 'circular' | 'spinner'

export const loadingProps = {
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String as PropType<LoadingType>,
    default: 'circular'
  },
  size: {
    type: [String, Number],
    default: 'default'
  },
  fullscreen: {
    type: Boolean,
    default: false
  },
  background: {
    type: String,
    default: ''
  },
  customClass: {
    type: String,
    default: ''
  },
  target: {
    type: [String, Object] as PropType<string | HTMLElement>,
    default: ''
  },
  lock: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: true
  }
} as const

export type LoadingProps = ExtractPropTypes<typeof loadingProps>

export interface LoadingOptions {
  text?: string
  type?: LoadingType
  size?: string | number
  fullscreen?: boolean
  background?: string
  customClass?: string
  target?: string | HTMLElement
  lock?: boolean
  visible?: boolean
}

export interface LoadingInstance {
  close: () => void
  setText: (text: string) => void
  setVisible: (visible: boolean) => void
}

export interface LoadingService {
  (options?: LoadingOptions): LoadingInstance
  close: () => void
} 