import type { ExtractPropTypes, PropType } from 'vue'

export type TypographyType = 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
export type TypographyTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold'

export const typographyProps = {
  type: {
    type: String as PropType<TypographyType>,
    default: 'primary'
  },
  tag: {
    type: String as PropType<TypographyTag>,
    default: 'p'
  },
  weight: {
    type: String as PropType<TypographyWeight>,
    default: 'normal'
  },
  ellipsis: {
    type: [Boolean, Number] as PropType<boolean | number>,
    default: false
  },
  underline: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  },
  mark: {
    type: Boolean,
    default: false
  },
  code: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
} as const

export type TypographyProps = ExtractPropTypes<typeof typographyProps>

export const typographyEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type TypographyEmits = typeof typographyEmits 