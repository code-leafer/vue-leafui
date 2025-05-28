import { createVNode, render } from 'vue'
import type { App } from 'vue'
import Message from './message.vue'
import type { MessageOptions, MessageInstance, MessageService } from './message'

let messageInstance: MessageInstance | null = null
let messageContainer: HTMLDivElement | null = null

const createMessage = (options: MessageOptions): MessageInstance => {
  if (messageContainer) {
    messageContainer.remove()
  }

  messageContainer = document.createElement('div')
  const vnode = createVNode(Message, {
    ...options,
    onClose: () => {
      options.onClose?.()
      render(null, messageContainer!)
      messageContainer?.remove()
      messageContainer = null
      messageInstance = null
    }
  })

  render(vnode, messageContainer)
  document.body.appendChild(messageContainer)
  messageInstance = vnode.component?.exposed as MessageInstance
  return messageInstance
}

const message: MessageService = (options: MessageOptions | string) => {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  return createMessage(options)
}

message.success = (message: string, duration?: number) => {
  return createMessage({
    message,
    type: 'success',
    duration
  })
}

message.warning = (message: string, duration?: number) => {
  return createMessage({
    message,
    type: 'warning',
    duration
  })
}

message.info = (message: string, duration?: number) => {
  return createMessage({
    message,
    type: 'info',
    duration
  })
}

message.error = (message: string, duration?: number) => {
  return createMessage({
    message,
    type: 'error',
    duration
  })
}

export const MessagePlugin = {
  install(app: App) {
    app.config.globalProperties.$message = message
  }
}

export default message 