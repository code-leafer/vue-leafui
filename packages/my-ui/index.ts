import installer from './defaults'
export * from './component'
export * from './constants'
export * from '@my-ui/hooks'
export * from '@my-ui/directives'

export const install = installer.install
export const version = installer.version
export default installer 