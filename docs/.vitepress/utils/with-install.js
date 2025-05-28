/**
 * 为组件添加install方法，用于注册为Vue插件
 */
export const withInstall = (component) => {
  component.install = (app) => {
    const name = component.name || component.__name || 'UnknownComponent'
    app.component(name, component)
  }
  return component
}

export default withInstall 