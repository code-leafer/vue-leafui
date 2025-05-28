import { withInstall } from './with-install'

export { withInstall }

export const generateId = () => Math.random().toString(36).substring(2, 10)

export const getPropByPath = (obj, path) => {
  const keys = path.split('.')
  let temp = obj
  for (const key of keys) {
    if (!temp) return {}
    temp = temp[key]
  }
  return temp
}

export default {
  withInstall,
  generateId,
  getPropByPath
} 