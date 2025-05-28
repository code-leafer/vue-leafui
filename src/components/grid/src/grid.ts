import type { ExtractPropTypes, PropType } from 'vue'

export type GridGutter = number | [number, number]
export type GridJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between'
export type GridAlign = 'top' | 'middle' | 'bottom'

export const gridProps = {
  gutter: {
    type: [Number, Array] as PropType<GridGutter>,
    default: 0
  },
  justify: {
    type: String as PropType<GridJustify>,
    default: 'start'
  },
  align: {
    type: String as PropType<GridAlign>,
    default: 'top'
  },
  wrap: {
    type: Boolean,
    default: true
  }
} as const

export type GridProps = ExtractPropTypes<typeof gridProps>

export const gridItemProps = {
  span: {
    type: Number,
    default: 24
  },
  offset: {
    type: Number,
    default: 0
  },
  push: {
    type: Number,
    default: 0
  },
  pull: {
    type: Number,
    default: 0
  }
} as const

export type GridItemProps = ExtractPropTypes<typeof gridItemProps> 