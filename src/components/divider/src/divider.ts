import type { ExtractPropTypes, PropType } from 'vue'

export type DividerDirection = 'horizontal' | 'vertical'
export type DividerPosition = 'left' | 'center' | 'right'

export const dividerProps = {
  direction: {
    type: String as PropType<DividerDirection>,
    default: 'horizontal',
    validator: (val: string) => {
      return ['horizontal', 'vertical'].includes(val)
    }
  },
  position: {
    type: String as PropType<DividerPosition>,
    default: 'center',
    validator: (val: string) => {
      return ['left', 'center', 'right'].includes(val)
    }
  },
  dashed: {
    type: Boolean,
    default: false
  },
  hairline: {
    type: Boolean,
    default: false
  }
} as const

export type DividerProps = ExtractPropTypes<typeof dividerProps>

export const dividerEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent
}

export type DividerEmits = typeof dividerEmits 