import type { ExtractPropTypes, PropType } from 'vue'

export type MessageType = 'success' | 'warning' | 'info' | 'error'

export const messageProps = {
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String as PropType<MessageType>,
    default: 'info'
  },
  duration: {
    type: Number,
    default: 3000
  },
  showClose: {
    type: Boolean,
    default: false
  },
  center: {
    type: Boolean,
    default: false
  },
  offset: {
    type: Number,
    default: 20
  },
  onClose: {
    type: Function as PropType<() => void>,
    default: null
  }
} as const

export type MessageProps = ExtractPropTypes<typeof messageProps>

export interface MessageOptions {
  message?: string
  type?: MessageType
  duration?: number
  showClose?: boolean
  center?: boolean
  offset?: number
  onClose?: () => void
}

export interface MessageInstance {
  close: () => void
}

export interface MessageService {
  (options: MessageOptions | string): MessageInstance
  success: (message: string, duration?: number) => MessageInstance
  warning: (message: string, duration?: number) => MessageInstance
  info: (message: string, duration?: number) => MessageInstance
  error: (message: string, duration?: number) => MessageInstance
} 