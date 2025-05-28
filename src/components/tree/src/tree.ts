import type { ExtractPropTypes, PropType } from 'vue'

export interface TreeNode {
  key: string | number
  label: string
  children?: TreeNode[]
  disabled?: boolean
  isLeaf?: boolean
  [key: string]: any
}

export const treeProps = {
  data: {
    type: Array as PropType<TreeNode[]>,
    default: () => []
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  defaultExpandAll: {
    type: Boolean,
    default: false
  },
  expandOnClickNode: {
    type: Boolean,
    default: true
  },
  checkOnClickNode: {
    type: Boolean,
    default: false
  },
  defaultExpandedKeys: {
    type: Array as PropType<(string | number)[]>,
    default: () => []
  },
  defaultCheckedKeys: {
    type: Array as PropType<(string | number)[]>,
    default: () => []
  },
  nodeKey: {
    type: String,
    default: 'id'
  },
  props: {
    type: Object,
    default: () => ({
      children: 'children',
      label: 'label'
    })
  },
  lazy: {
    type: Boolean,
    default: false
  },
  load: {
    type: Function as PropType<(node: TreeNode, resolve: (data: TreeNode[]) => void) => void>,
    default: null
  },
  filterNodeMethod: {
    type: Function as PropType<(value: string, data: TreeNode) => boolean>,
    default: null
  }
} as const

export type TreeProps = ExtractPropTypes<typeof treeProps>

export const treeNodeProps = {
  node: {
    type: Object as PropType<TreeNode>,
    required: true
  },
  expanded: {
    type: Boolean,
    default: false
  },
  checked: {
    type: Boolean,
    default: false
  },
  indeterminate: {
    type: Boolean,
    default: false
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  current: {
    type: Boolean,
    default: false
  }
} as const

export type TreeNodeProps = ExtractPropTypes<typeof treeNodeProps> 