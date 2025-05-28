import { defineConfig } from 'vitepress'
import { enUS, zhCN } from './lang/index.js'
import path from 'path'
import { demoBlockPlugin } from './plugins/demo-block.js'

// 改进插件处理虚拟模块
function myUIComponentsPlugin() {
  return {
    name: 'my-ui-components-resolver',
    resolveId(id) {
      // 扩展别名处理范围
      if (id.startsWith('@utils') || id === '@utils') {
        return `\0virtual:${id}`
      }
      
      if (id.includes('utils/') || id.includes('/utils/')) {
        return `\0virtual:${id}`
      }
      
      return null
    },
    load(id) {
      if (id === '\0virtual:@utils' || id.startsWith('\0virtual:@utils/')) {
        // 创建完整的工具模块
        return `
          export const withInstall = (component) => {
            component.install = (app) => {
              const name = component.name || component.__name || 'UnknownComponent'
              app.component(name, component)
            }
            return component
          }
          
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
          
          export default { withInstall, generateId, getPropByPath }
        `
      }
      
      if (id.includes('\0virtual:utils/') || id.includes('\0virtual:/utils/')) {
        // 为各种utils路径创建虚拟模块
        if (id.includes('with-install')) {
          return `
            export const withInstall = (component) => {
              component.install = (app) => {
                const name = component.name || component.__name || 'UnknownComponent'
                app.component(name, component)
              }
              return component
            }
            export default withInstall
          `
        }
        
        return `
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
          export default { generateId, getPropByPath }
        `
      }
      
      return null
    }
  }
}

export default defineConfig({
  title: 'My UI',
  description: 'Vue3 组件库',
  lang: 'zh-CN',
  lastUpdated: true,
  
  // 配置 Vite
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../src'),
        '@utils': path.resolve(__dirname, './utils'),
        '@components': path.resolve(__dirname, '../../src/components'),
        '@styles': path.resolve(__dirname, '../../src/styles'),
      }
    },
    // 添加缺失的CSS预处理器选项以包含变量
    css: {
      preprocessorOptions: {
        scss: {
          // 提供默认变量值解决Sass变量未定义问题
          additionalData: `
            // 定义基础变量
            $primary-color: #409EFF;
            $success-color: #67C23A;
            $warning-color: #E6A23C;
            $danger-color: #F56C6C;
            $info-color: #909399;
            
            // 定义错误日志中提到的缺失变量
            $box-shadow-light: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
            
            // 导入项目变量和混合器
            @import "@styles/variables.scss";
            @import "@styles/mixins.scss";
          `
      }
    }
  },
    // 禁用 HMR overlay 以防止错误显示在浏览器中
    server: {
      hmr: {
        overlay: false
      }
    },
    // 添加自定义插件解析导入
    plugins: [
      myUIComponentsPlugin()
    ],
    // 优化依赖
    optimizeDeps: {
      include: ['vue', '@vueuse/core'],
      exclude: ['my-ui']
    },
    // SSR 特定选项
    ssr: {
      // 避免 SSR 处理问题依赖
      noExternal: ['my-ui', /vue-components/]
    }
  },
  
  // 在这里我们简化markdown处理配置
  markdown: {
    lineNumbers: true,  // 添加行号
    config: (md) => {
      // 使用any类型绕过TypeScript严格类型检查
      demoBlockPlugin(md as any)
    },
    // 主题配置
    theme: {
      light: 'github-light',
      dark: 'github-dark'
    },
    // 自定义容器
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详情'
    }
  },
  
  locales: {
    root: {
      label: '中文',
      lang: 'zh-CN',
      link: '/',
      ...zhCN
    }
  },
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: '指南', link: '/guide/installation', activeMatch: '^/guide/' },
      { text: '组件', link: '/components/button/', activeMatch: '^/components/' },
      { text: '资源', link: '/guide/resources', activeMatch: '^/guide/resources' },
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: '基础',
          items: [
            { text: '安装', link: '/guide/installation' },
            { text: '快速开始', link: '/guide/quickstart' },
            { text: '设计原则', link: '/guide/design' },
          ],
        },
        {
          text: '进阶',
          items: [
            { text: '主题定制', link: '/guide/theme' },
            { text: '国际化', link: '/guide/i18n' },
            { text: '迁移指南', link: '/guide/migration' },
            { text: '风格指南', link: '/guide/style-guide' },
          ],
        },
        {
          text: '开发者专区',
          items: [
            { text: '贡献指南', link: '/guide/contribution' },
          ],
        },
        {
          text: '其他',
          items: [
            { text: '常见问题', link: '/guide/faq' },
            { text: '资源', link: '/guide/resources' },
            { text: '更新日志', link: '/guide/changelog' },
          ],
        },
      ],
      '/components/': [
        {
          text: '基础组件',
          items: [
            { text: 'Button 按钮', link: '/components/button/' },
            { text: 'Icon 图标', link: '/components/icon/' },
          ],
        },
        {
          text: '表单组件',
          items: [
            { text: 'Input 输入框', link: '/components/input/' },
            { text: 'Switch 开关', link: '/components/switch/' },
          ],
        },
        {
          text: '数据展示组件',
          items: [
            { text: 'Tooltip 文字提示', link: '/components/tooltip/' },
          ],
        },
        {
          text: '反馈组件',
          items: [
            { text: 'Loading 加载', link: '/components/loading/' },
          ],
        },
        {
          text: '导航组件',
          items: [
            { text: 'Tabs 标签页', link: '/components/tabs/' },
          ],
        },
      ],
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-org/my-ui' },
    ],
    
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-present My UI Contributors',
    },
    
    algolia: {
      appId: '...',
      apiKey: '...',
      indexName: 'my-ui',
    },
    
    search: {
      provider: 'local'
    }
  },
}) 