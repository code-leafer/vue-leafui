import type { App, Component } from 'vue'

// Helper for installation
export type WithInstall<T> = T & {
  install(app: App): void
}

export const withInstall = <T extends Component>(component: T) => {
  (component as WithInstall<T>).install = (app: App) => {
    const { name } = component
    if (!name) {
      throw new Error('Component must have a name!')
    }
    app.component(name, component)
  }
  return component as WithInstall<T>
}

// For multiple components installation
export const withInstallFunc = <T>(fn: T, name: string) => {
  (fn as any).install = (app: App) => {
    app.config.globalProperties[name] = fn
  }
  return fn as T & { install(app: App): void }
} 