import type { ExtractPropTypes, PropType } from 'vue'

export type SelectSize = 'small' | 'default' | 'large'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
  children?: SelectOption[]
}

export const selectProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<string | number | (string | number)[]>,
    default: ''
  },
  size: {
    type: String as PropType<SelectSize>,
    default: 'default'
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  multiple: {
    type: Boolean,
    default: false
  },
  collapseTags: {
    type: Boolean,
    default: false
  },
  collapseTagsTooltip: {
    type: Boolean,
    default: false
  },
  multipleLimit: {
    type: Number,
    default: 0
  },
  name: {
    type: String,
    default: ''
  },
  filterable: {
    type: Boolean,
    default: false
  },
  filterMethod: {
    type: Function as PropType<(query: string) => void>,
    default: undefined
  },
  remote: {
    type: Boolean,
    default: false
  },
  remoteMethod: {
    type: Function as PropType<(query: string) => void>,
    default: undefined
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: '加载中'
  },
  noMatchText: {
    type: String,
    default: '无匹配数据'
  },
  noDataText: {
    type: String,
    default: '无数据'
  },
  popperClass: {
    type: String,
    default: ''
  },
  popperAppendToBody: {
    type: Boolean,
    default: true
  },
  automaticDropdown: {
    type: Boolean,
    default: false
  },
  clearIcon: {
    type: String,
    default: 'my-icon-close'
  },
  suffixIcon: {
    type: String,
    default: 'my-icon-arrow-down'
  },
  tagType: {
    type: String as PropType<'success' | 'info' | 'warning' | 'danger'>,
    default: 'info'
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const

export type SelectProps = ExtractPropTypes<typeof selectProps>

export const selectEmits = {
  'update:modelValue': (value: string | number | (string | number)[]) => true,
  change: (value: string | number | (string | number)[]) => true,
  blur: (evt: FocusEvent) => evt instanceof FocusEvent,
  focus: (evt: FocusEvent) => evt instanceof FocusEvent,
  clear: () => true,
  visibleChange: (visible: boolean) => true,
  removeTag: (value: string | number) => true
}

export type SelectEmits = typeof selectEmits 