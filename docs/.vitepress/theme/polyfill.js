// This file provides mock implementations for various imports that might fail
// during the build or runtime of the documentation site

// Mock withInstall utility
export const withInstall = (component) => {
  component.install = (app) => {
    const name = component.name || component.__name || 'UnknownComponent'
    app.component(name, component)
  }
  return component
}

// Mock utils
export const generateId = () => {
  return Math.random().toString(36).substring(2, 10)
}

export const getPropByPath = (obj, path) => {
  const keys = path.split('.')
  let temp = obj
  for (const key of keys) {
    if (!temp) return {}
    temp = temp[key]
  }
  return temp
}

// Mock other utilities
export const isObject = (val) => val !== null && typeof val === 'object'
export const isFunction = (val) => typeof val === 'function'
export const isString = (val) => typeof val === 'string'
export const isNumber = (val) => typeof val === 'number'
export const isBoolean = (val) => typeof val === 'boolean'
export const isUndefined = (val) => typeof val === 'undefined'

// Default export for convenience
export default {
  withInstall,
  generateId,
  getPropByPath,
  isObject,
  isFunction,
  isString,
  isNumber,
  isBoolean,
  isUndefined
} 