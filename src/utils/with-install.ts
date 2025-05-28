import type { App, Component, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

/**
 * Enhanced withInstall utility that adds better error handling and compatibility
 * @param comp The component to be registered
 * @param extraProps Additional properties to add to the component
 * @returns Component with install method
 */
export const withInstall = <T extends Component>(
  comp: T, 
  extraProps?: Record<string, any>
): SFCWithInstall<T> => {
  // Cast component to have the install method
  const component = comp as SFCWithInstall<T>
  
  // Add install method to the component
  component.install = function (app: App) {
    try {
      // Get component name safely
      const name = (comp as any).name
      
      if (!name) {
        console.warn('[My UI] Component is missing name definition, registration might not work properly')
      }
      
      app.component(name, comp)
      
      // Register additional components if provided
      if (extraProps) {
        for (const [key, value] of Object.entries(extraProps)) {
          if ((value as any).name) {
            app.component((value as any).name, value)
          }
        }
      }
    } catch (error) {
      console.error('[My UI] Failed to install component:', error)
    }
  }
  
  // Add any extra properties
  if (extraProps) {
    for (const [key, value] of Object.entries(extraProps)) {
      component[key as keyof SFCWithInstall<T>] = value as any
    }
  }
  
  return component
} 