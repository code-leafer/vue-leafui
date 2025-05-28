import { createVNode, render } from 'vue'
import type { App } from 'vue'
import Notification from './notification.vue'
import type { NotificationOptions, NotificationInstance } from './notification'

let seed = 1
const instances: NotificationInstance[] = []
const GAP_SIZE = 16

const createNotification = (options: NotificationOptions): NotificationInstance => {
  const id = `notification_${seed++}`
  const container = document.createElement('div')
  const position = options.position || 'top-right'

  const props = {
    ...options,
    id,
    onClose: () => {
      close(id)
      options.onClose?.()
    }
  }

  const vnode = createVNode(Notification, props)
  render(vnode, container)
  document.body.appendChild(container)

  const instance = vnode.component?.exposed as NotificationInstance
  if (instance) {
    instance.id = id
    instances.push(instance)
    verticalOffset(position)
  }

  return instance
}

const close = (id: string) => {
  const idx = instances.findIndex(instance => instance.id === id)
  if (idx === -1) return

  const instance = instances[idx]
  if (!instance) return

  instances.splice(idx, 1)
  const position = instance.position || 'top-right'
  verticalOffset(position)
}

const closeAll = () => {
  instances.forEach(instance => {
    instance.close()
  })
}

const verticalOffset = (position: string) => {
  const filteredInstances = instances.filter(instance => instance.position === position)
  filteredInstances.forEach((instance, index) => {
    const verticalOffset = index * (instance.height + GAP_SIZE)
    instance.verticalOffset = verticalOffset
  })
}

const notification = (options: NotificationOptions | string) => {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  return createNotification(options)
}

notification.success = (options: NotificationOptions | string) => {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  options.type = 'success'
  return createNotification(options)
}

notification.warning = (options: NotificationOptions | string) => {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  options.type = 'warning'
  return createNotification(options)
}

notification.info = (options: NotificationOptions | string) => {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  options.type = 'info'
  return createNotification(options)
}

notification.error = (options: NotificationOptions | string) => {
  if (typeof options === 'string') {
    options = {
      message: options
    }
  }
  options.type = 'error'
  return createNotification(options)
}

notification.closeAll = closeAll

export { notification }
export default notification 