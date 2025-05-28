import { App } from 'vue'
import * as components from './components'

// 基础组件
export * from './components/button'
export * from './components/icon'
export * from './components/typography'
export * from './components/divider'
export * from './components/grid'

// 表单组件
export * from './components/input'
export * from './components/textarea'
export * from './components/select'
export * from './components/checkbox'
export * from './components/radio'
export * from './components/switch'
export * from './components/date-picker'
export * from './components/upload'
export * from './components/form'

// 数据展示组件
export * from './components/table'
export * from './components/list'
export * from './components/tag'
export * from './components/badge'
export * from './components/tooltip'
export * from './components/popover'
export * from './components/collapse'
export * from './components/tabs'
export * from './components/carousel'
export * from './components/tree'

// 反馈组件
export * from './components/modal'
export * from './components/drawer'
export * from './components/message'
export * from './components/notification'
export * from './components/loading'
export * from './components/skeleton'
export * from './components/progress'

// 导航组件
export * from './components/breadcrumb'
export * from './components/menu'
export * from './components/pagination'
export * from './components/steps'

/**
 * 组件库版本
 */
export const version = '0.1.0'

/**
 * 组件库安装函数
 * @param app Vue应用实例
 */
export const install = (app: App): void => {
  Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
  })
}

export default {
  version,
  install
} 