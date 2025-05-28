import type { ExtractPropTypes, PropType } from 'vue'

export type MenuMode = 'horizontal' | 'vertical'
export type MenuTrigger = 'hover' | 'click'

export interface MenuItem {
  index: string
  title: string
  route?: string
  icon?: string
  disabled?: boolean
  children?: MenuItem[]
}

export const menuProps = {
  mode: {
    type: String as PropType<MenuMode>,
    default: 'vertical'
  },
  collapse: {
    type: Boolean,
    default: false
  },
  backgroundColor: {
    type: String,
    default: '#ffffff'
  },
  textColor: {
    type: String,
    default: '#303133'
  },
  activeTextColor: {
    type: String,
    default: '#409eff'
  },
  defaultActive: {
    type: String,
    default: ''
  },
  defaultOpeneds: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  uniqueOpened: {
    type: Boolean,
    default: false
  },
  router: {
    type: Boolean,
    default: false
  },
  route: {
    type: String,
    default: ''
  },
  collapseTransition: {
    type: Boolean,
    default: true
  }
} as const

export const menuItemProps = {
  index: {
    type: String,
    required: true
  },
  route: {
    type: [String, Object] as PropType<string | Record<string, any>>,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export const subMenuProps = {
  index: {
    type: String,
    required: true
  },
  showTimeout: {
    type: Number,
    default: 300
  },
  hideTimeout: {
    type: Number,
    default: 300
  },
  disabled: {
    type: Boolean,
    default: false
  },
  popperClass: {
    type: String,
    default: ''
  },
  popperAppendToBody: {
    type: Boolean,
    default: true
  },
  expandCloseIcon: {
    type: String,
    default: 'my-icon-arrow-down'
  },
  expandOpenIcon: {
    type: String,
    default: 'my-icon-arrow-up'
  },
  collapseCloseIcon: {
    type: String,
    default: 'my-icon-arrow-right'
  },
  collapseOpenIcon: {
    type: String,
    default: 'my-icon-arrow-down'
  }
} as const

export type MenuProps = ExtractPropTypes<typeof menuProps>
export type MenuItemProps = ExtractPropTypes<typeof menuItemProps>
export type SubMenuProps = ExtractPropTypes<typeof subMenuProps> 