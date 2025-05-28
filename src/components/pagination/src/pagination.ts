import type { ExtractPropTypes, PropType } from 'vue'

export type PaginationLayout = 'total' | 'sizes' | 'prev' | 'pager' | 'next' | 'jumper'

export const paginationProps = {
  total: {
    type: Number,
    required: true
  },
  pageSize: {
    type: Number,
    default: 10
  },
  currentPage: {
    type: Number,
    default: 1
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 30, 40, 50, 100]
  },
  layout: {
    type: Array as PropType<PaginationLayout[]>,
    default: () => ['total', 'sizes', 'prev', 'pager', 'next', 'jumper']
  },
  background: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  hideOnSinglePage: {
    type: Boolean,
    default: false
  }
} as const

export type PaginationProps = ExtractPropTypes<typeof paginationProps> 