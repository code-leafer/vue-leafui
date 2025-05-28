<template>
  <div class="my-tree">
    <tree-node-component
      v-for="node in treeData"
      :key="getNodeKey(node)"
      :node="node"
      :show-checkbox="showCheckbox"
      :expanded="isExpanded(node)"
      :checked="isChecked(node)"
      :indeterminate="isIndeterminate(node)"
      :disabled="isDisabled(node)"
      :current="isCurrent(node)"
      @node-click="handleNodeClick"
      @node-expand="handleNodeExpand"
      @node-check="handleNodeCheck"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref, watch } from 'vue'
import { treeProps } from './tree'
import type { TreeNode } from './tree'
import TreeNodeComponent from './tree-node.vue'

defineOptions({
  name: 'MyTree'
})

const props = defineProps(treeProps)
const emit = defineEmits(['node-click', 'node-expand', 'node-check', 'check-change'])

const expandedKeys = ref<(string | number)[]>(props.defaultExpandedKeys)
const checkedKeys = ref<(string | number)[]>(props.defaultCheckedKeys)
const currentNodeKey = ref<string | number>('')

const treeData = computed(() => {
  return props.data
})

const getNodeKey = (node: TreeNode) => {
  return node[props.nodeKey]
}

const isExpanded = (node: TreeNode) => {
  return expandedKeys.value.includes(getNodeKey(node))
}

const isChecked = (node: TreeNode) => {
  return checkedKeys.value.includes(getNodeKey(node))
}

const isIndeterminate = (node: TreeNode) => {
  const children = node.children || []
  if (children.length === 0) return false

  const checkedCount = children.filter(child => isChecked(child)).length
  return checkedCount > 0 && checkedCount < children.length
}

const isDisabled = (node: TreeNode) => {
  return node.disabled
}

const isCurrent = (node: TreeNode) => {
  return currentNodeKey.value === getNodeKey(node)
}

const handleNodeClick = (node: TreeNode) => {
  if (props.expandOnClickNode) {
    handleNodeExpand(node)
  }
  if (props.checkOnClickNode) {
    handleNodeCheck(node)
  }
  currentNodeKey.value = getNodeKey(node)
  emit('node-click', node)
}

const handleNodeExpand = (node: TreeNode) => {
  const key = getNodeKey(node)
  const index = expandedKeys.value.indexOf(key)
  if (index > -1) {
    expandedKeys.value.splice(index, 1)
  } else {
    expandedKeys.value.push(key)
  }
  emit('node-expand', node, expandedKeys.value)
}

const handleNodeCheck = (node: TreeNode) => {
  if (isDisabled(node)) return

  const key = getNodeKey(node)
  const index = checkedKeys.value.indexOf(key)
  if (index > -1) {
    checkedKeys.value.splice(index, 1)
  } else {
    checkedKeys.value.push(key)
  }

  const checkedNodes = treeData.value.filter(node => isChecked(node))
  emit('node-check', node, checkedKeys.value)
  emit('check-change', node, checkedKeys.value, checkedNodes)
}

watch(
  () => props.defaultExpandedKeys,
  (val) => {
    expandedKeys.value = val
  }
)

watch(
  () => props.defaultCheckedKeys,
  (val) => {
    checkedKeys.value = val
  }
)

provide('tree', {
  props,
  getNodeKey,
  isExpanded,
  isChecked,
  isIndeterminate,
  isDisabled,
  isCurrent,
  handleNodeClick,
  handleNodeExpand,
  handleNodeCheck
})
</script>

<style lang="scss">
.my-tree {
  position: relative;
  cursor: default;
  background: var(--my-fill-color-blank);
  color: var(--my-text-color-regular);
  font-size: var(--my-font-size-base);
}
</style> 