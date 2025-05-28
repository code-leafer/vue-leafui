<template>
  <div class="my-table-column" />
</template>

<script lang="ts" setup>
import { inject, onMounted, onUnmounted } from 'vue'
import { tableColumnProps } from './table'

defineOptions({
  name: 'MyTableColumn'
})

const props = defineProps(tableColumnProps)

const table = inject('table', {
  registerColumn: () => {},
  unregisterColumn: () => {}
})

onMounted(() => {
  table.registerColumn(props)
})

onUnmounted(() => {
  table.unregisterColumn(props)
})
</script> 