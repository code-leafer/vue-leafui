declare module 'markdown-it-container' {
  import MarkdownIt from 'markdown-it'
  
  interface ContainerOptions {
    marker?: string
    validate?: (params: string) => boolean
    render?: (tokens: any[], idx: number, options: any, env: any, slf: any) => string
  }
  
  function container(md: any, name: string, options: ContainerOptions): void
  
  export default container
} 