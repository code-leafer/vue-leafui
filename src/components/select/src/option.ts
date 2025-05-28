import type { ExtractPropTypes, PropType } from 'vue'

export const optionProps = {
  value: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type OptionProps = ExtractPropTypes<typeof optionProps>

export const optionEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type OptionEmits = typeof optionEmits 