import { createVNode, render } from 'vue'
import type { App } from 'vue'
import Loading from './loading.vue'
import type { LoadingOptions, LoadingInstance, LoadingService } from './loading'

let loadingInstance: LoadingInstance | null = null
let loadingContainer: HTMLDivElement | null = null

const createLoading = (options: LoadingOptions = {}): LoadingInstance => {
  if (loadingContainer) {
    loadingContainer.remove()
  }

  loadingContainer = document.createElement('div')
  const vnode = createVNode(Loading, {
    ...options,
    onClose: () => {
      render(null, loadingContainer!)
      loadingContainer?.remove()
      loadingContainer = null
      loadingInstance = null
    }
  })

  render(vnode, loadingContainer)

  if (options.target) {
    const target = typeof options.target === 'string'
      ? document.querySelector(options.target)
      : options.target

    if (target) {
      target.appendChild(loadingContainer)
    } else {
      document.body.appendChild(loadingContainer)
    }
  } else {
    document.body.appendChild(loadingContainer)
  }

  loadingInstance = vnode.component?.exposed as LoadingInstance
  return loadingInstance
}

const loading: LoadingService = (options?: LoadingOptions) => {
  return createLoading(options)
}

loading.close = () => {
  loadingInstance?.close()
}

export const LoadingPlugin = {
  install(app: App) {
    app.config.globalProperties.$loading = loading
  }
}

export default loading 