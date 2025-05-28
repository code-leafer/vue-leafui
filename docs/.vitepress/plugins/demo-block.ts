/**
 * Demo block plugin for markdown-it
 */

import type MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'

export const demoBlockPlugin = (md: any) => {
  md.use(mdContainer, 'demo', {
    validate(params: string) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },
    render(tokens: any[], idx: number) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      
      if (tokens[idx].nesting === 1) {
        // opening tag
        const description = m && m.length > 1 ? m[1] : ''
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : ''
        
        return `<demo-block>
        ${description ? `<div class="description">${md.render(description)}</div>` : ''}
        <div class="example">
        `
      }
      
      // closing tag
      return '</div></demo-block>\n'
    }
  })
} 