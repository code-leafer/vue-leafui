import { withInstall } from '@utils/with-install'
import Tree from './src/tree.vue'
import TreeNode from './src/tree-node.vue'

export const MyTree = withInstall(Tree)
export const MyTreeNode = withInstall(TreeNode)

export default MyTree

export * from './src/tree' 