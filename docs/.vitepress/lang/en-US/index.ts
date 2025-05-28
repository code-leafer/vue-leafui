import navLocale from './nav.json' assert { type: 'json' }

export const enUS = {
  description: 'Vue3 Component Library',
  themeConfig: {
    nav: [
      { text: navLocale.guide, link: '/en-US/guide/installation', activeMatch: '^/en-US/guide/' },
      { text: navLocale.components, link: '/en-US/components/button', activeMatch: '^/en-US/components/' },
    ],
    
    sidebar: {
      '/en-US/guide/': [
        {
          text: navLocale.basic,
          items: [
            { text: navLocale.installation, link: '/en-US/guide/installation' },
            { text: navLocale.quickstart, link: '/en-US/guide/quickstart' },
          ],
        },
      ],
      '/en-US/components/': [
        {
          text: navLocale.basic,
          items: [
            { text: `${navLocale.button}`, link: '/en-US/components/button' },
            { text: `${navLocale.icon}`, link: '/en-US/components/icon' },
            { text: `${navLocale.typography}`, link: '/en-US/components/typography' },
            { text: `${navLocale.divider}`, link: '/en-US/components/divider' },
            { text: `${navLocale.grid}`, link: '/en-US/components/grid' },
          ],
        },
        {
          text: navLocale.form,
          items: [
            { text: `${navLocale.input}`, link: '/en-US/components/input' },
            { text: `${navLocale.textarea}`, link: '/en-US/components/textarea' },
            { text: `${navLocale.select}`, link: '/en-US/components/select' },
            { text: `${navLocale.checkbox}`, link: '/en-US/components/checkbox' },
            { text: `${navLocale.radio}`, link: '/en-US/components/radio' },
            { text: `${navLocale.switch}`, link: '/en-US/components/switch' },
            { text: `${navLocale.datepicker}`, link: '/en-US/components/date-picker' },
            { text: `${navLocale.timepicker}`, link: '/en-US/components/time-picker' },
            { text: `${navLocale.upload}`, link: '/en-US/components/upload' },
            { text: `${navLocale.form}`, link: '/en-US/components/form' },
          ],
        },
        {
          text: navLocale.data,
          items: [
            { text: `${navLocale.table}`, link: '/en-US/components/table' },
            { text: `${navLocale.list}`, link: '/en-US/components/list' },
            { text: `${navLocale.tabs}`, link: '/en-US/components/tabs' },
            { text: `${navLocale.carousel}`, link: '/en-US/components/carousel' },
            { text: `${navLocale.tree}`, link: '/en-US/components/tree' },
            { text: `${navLocale.tag}`, link: '/en-US/components/tag' },
            { text: `${navLocale.badge}`, link: '/en-US/components/badge' },
            { text: `${navLocale.collapse}`, link: '/en-US/components/collapse' },
            { text: `${navLocale.tooltip}`, link: '/en-US/components/tooltip' },
            { text: `${navLocale.popover}`, link: '/en-US/components/popover' },
          ],
        },
        {
          text: navLocale.feedback,
          items: [
            { text: `${navLocale.modal}`, link: '/en-US/components/modal' },
            { text: `${navLocale.message}`, link: '/en-US/components/message' },
            { text: `${navLocale.loading}`, link: '/en-US/components/loading' },
            { text: `${navLocale.notification}`, link: '/en-US/components/notification' },
            { text: `${navLocale.progress}`, link: '/en-US/components/progress' },
            { text: `${navLocale.skeleton}`, link: '/en-US/components/skeleton' },
            { text: `${navLocale.drawer}`, link: '/en-US/components/drawer' },
          ],
        },
        {
          text: navLocale.navigation,
          items: [
            { text: `${navLocale.menu}`, link: '/en-US/components/menu' },
            { text: `${navLocale.pagination}`, link: '/en-US/components/pagination' },
            { text: `${navLocale.breadcrumb}`, link: '/en-US/components/breadcrumb' },
            { text: `${navLocale.steps}`, link: '/en-US/components/steps' },
            { text: `${navLocale.dropdown}`, link: '/en-US/components/dropdown' },
          ],
        },
      ],
    },
  }
} 