import navLocale from './nav.json' assert { type: 'json' }

export const zhCN = {
  description: 'Vue3 组件库',
  themeConfig: {
    nav: [
      { text: navLocale.guide, link: '/guide/installation', activeMatch: '^/guide/' },
      { text: navLocale.components, link: '/components/button', activeMatch: '^/components/' },
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: navLocale.basic,
          items: [
            { text: navLocale.installation, link: '/guide/installation' },
            { text: navLocale.quickstart, link: '/guide/quickstart' },
          ],
        },
      ],
      '/components/': [
        {
          text: navLocale.basic,
          items: [
            { text: `${navLocale.button} Button`, link: '/components/button' },
            { text: `${navLocale.icon} Icon`, link: '/components/icon' },
            { text: `${navLocale.typography} Typography`, link: '/components/typography' },
            { text: `${navLocale.divider} Divider`, link: '/components/divider' },
            { text: `${navLocale.grid} Grid`, link: '/components/grid' },
          ],
        },
        {
          text: navLocale.form,
          items: [
            { text: `${navLocale.input} Input`, link: '/components/input' },
            { text: `${navLocale.textarea} Textarea`, link: '/components/textarea' },
            { text: `${navLocale.select} Select`, link: '/components/select' },
            { text: `${navLocale.checkbox} Checkbox`, link: '/components/checkbox' },
            { text: `${navLocale.radio} Radio`, link: '/components/radio' },
            { text: `${navLocale.switch} Switch`, link: '/components/switch' },
            { text: `${navLocale.datepicker} DatePicker`, link: '/components/date-picker' },
            { text: `${navLocale.timepicker} TimePicker`, link: '/components/time-picker' },
            { text: `${navLocale.upload} Upload`, link: '/components/upload' },
            { text: `${navLocale.form} Form`, link: '/components/form' },
          ],
        },
        {
          text: navLocale.data,
          items: [
            { text: `${navLocale.table} Table`, link: '/components/table' },
            { text: `${navLocale.list} List`, link: '/components/list' },
            { text: `${navLocale.tabs} Tabs`, link: '/components/tabs' },
            { text: `${navLocale.carousel} Carousel`, link: '/components/carousel' },
            { text: `${navLocale.tree} Tree`, link: '/components/tree' },
            { text: `${navLocale.tag} Tag`, link: '/components/tag' },
            { text: `${navLocale.badge} Badge`, link: '/components/badge' },
            { text: `${navLocale.collapse} Collapse`, link: '/components/collapse' },
            { text: `${navLocale.tooltip} Tooltip`, link: '/components/tooltip' },
            { text: `${navLocale.popover} Popover`, link: '/components/popover' },
          ],
        },
        {
          text: navLocale.feedback,
          items: [
            { text: `${navLocale.modal} Modal`, link: '/components/modal' },
            { text: `${navLocale.message} Message`, link: '/components/message' },
            { text: `${navLocale.loading} Loading`, link: '/components/loading' },
            { text: `${navLocale.notification} Notification`, link: '/components/notification' },
            { text: `${navLocale.progress} Progress`, link: '/components/progress' },
            { text: `${navLocale.skeleton} Skeleton`, link: '/components/skeleton' },
            { text: `${navLocale.drawer} Drawer`, link: '/components/drawer' },
          ],
        },
        {
          text: navLocale.navigation,
          items: [
            { text: `${navLocale.menu} Menu`, link: '/components/menu' },
            { text: `${navLocale.pagination} Pagination`, link: '/components/pagination' },
            { text: `${navLocale.breadcrumb} Breadcrumb`, link: '/components/breadcrumb' },
            { text: `${navLocale.steps} Steps`, link: '/components/steps' },
            { text: `${navLocale.dropdown} Dropdown`, link: '/components/dropdown' },
          ],
        },
      ],
    },
  }
} 