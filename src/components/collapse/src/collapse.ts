import type { ExtractPropTypes, PropType } from 'vue'

export type CollapseModelValue = string | number | (string | number)[]

export const collapseProps = {
  modelValue: {
    type: [String, Number, Array] as PropType<CollapseModelValue>,
    default: () => []
  },
  accordion: {
    type: Boolean,
    default: false
  }
} as const

export type CollapseProps = ExtractPropTypes<typeof collapseProps>

export const collapseItemProps = {
  name: {
    type: [String, Number],
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps> 