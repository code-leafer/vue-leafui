<template>
  <div
    v-show="isActive"
    class="my-tab-pane"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onBeforeUnmount } from 'vue'
import type { TabPaneInstance, TabsContext } from './tabs'

defineOptions({
  name: 'MyTabPane'
})

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  name: {
    type: [String, Number],
    required: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  closable: {
    type: Boolean,
    default: false
  },
  lazy: {
    type: Boolean,
    default: false
  }
})

const tabs = inject<TabsContext>('tabs', {
  modelValue: '',
  registerTab: () => {},
  unregisterTab: () => {}
})

const isActive = computed(() => {
  return tabs.modelValue === props.name
})

onMounted(() => {
  const tabInstance: TabPaneInstance = {
    label: props.label,
    name: props.name,
    disabled: props.disabled,
    closable: props.closable,
    lazy: props.lazy
  }
  tabs.registerTab(tabInstance)
})

onBeforeUnmount(() => {
  const tabInstance: TabPaneInstance = {
    label: props.label,
    name: props.name,
    disabled: props.disabled,
    closable: props.closable,
    lazy: props.lazy
  }
  tabs.unregisterTab(tabInstance)
})
</script>

<style lang="scss">
.my-tab-pane {
  padding: 0;
}
</style> 