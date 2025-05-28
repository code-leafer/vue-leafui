import type { ExtractPropTypes, PropType } from 'vue'

export type NotificationType = 'success' | 'warning' | 'info' | 'error'

export const notificationProps = {
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String as PropType<NotificationType>,
    default: 'info'
  },
  duration: {
    type: Number,
    default: 4500
  },
  position: {
    type: String as PropType<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>,
    default: 'top-right'
  },
  showClose: {
    type: Boolean,
    default: true
  },
  customClass: {
    type: String,
    default: ''
  },
  onClose: {
    type: Function as PropType<() => void>,
    default: () => {}
  }
} as const

export type NotificationProps = ExtractPropTypes<typeof notificationProps>

export interface NotificationOptions {
  title?: string
  message?: string
  type?: NotificationType
  duration?: number
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'
  showClose?: boolean
  customClass?: string
  onClose?: () => void
}

export interface NotificationInstance {
  id?: string
  position?: string
  height?: number
  verticalOffset?: number
  close: () => void
  setMessage: (message: string) => void
  setTitle: (title: string) => void
} 