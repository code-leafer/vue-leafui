import Prism from 'prismjs'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-markdown'
import escapeHtml from 'escape-html'

// Add Vue language support
const scriptReg = /<script(?:\s[^>]*)?>([\s\S]*)<\/script>/
const scriptSetupReg = /<script\s+setup(?:\s[^>]*)?>([\s\S]*)<\/script>/
const templateReg = /<template(?:\s[^>]*)?>([\s\S]*)<\/template>/
const styleReg = /<style(?:\s[^>]*)?>([\s\S]*)<\/style>/

// 自定义 Vue 代码高亮
Prism.languages.vue = {
  ...Prism.languages.markup,
  template: {
    pattern: templateReg,
    inside: {
      'template-tag': /^<template[^>]*>|<\/template>$/,
      'template-content': {
        pattern: /[\s\S]+/,
        inside: Prism.languages.html
      }
    }
  },
  script: {
    pattern: scriptReg,
    inside: {
      'script-tag': /^<script[^>]*>|<\/script>$/,
      'script-content': {
        pattern: /[\s\S]+/,
        inside: Prism.languages.javascript
      }
    }
  },
  'script-setup': {
    pattern: scriptSetupReg,
    inside: {
      'script-tag': /^<script[^>]*>|<\/script>$/,
      'script-content': {
        pattern: /[\s\S]+/,
        inside: Prism.languages.javascript
      }
    }
  },
  style: {
    pattern: styleReg,
    inside: {
      'style-tag': /^<style[^>]*>|<\/style>$/,
      'style-content': {
        pattern: /[\s\S]+/,
        inside: Prism.languages.css
      }
    }
  },
  comment: /<!--[\s\S]*?-->/
}

export const highlight = (str: string, lang: string) => {
  if (!lang || !Prism.languages[lang]) {
    return escapeHtml(str)
  }

  try {
    return Prism.highlight(str, Prism.languages[lang], lang)
  } catch (err) {
    console.warn(`Failed to highlight code block with language "${lang}"`)
    return escapeHtml(str)
  }
} 