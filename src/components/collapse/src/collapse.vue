<template>
  <div class="my-collapse">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { provide, ref, watch } from 'vue'
import { collapseProps } from './collapse'
import type { CollapseModelValue } from './collapse'

defineOptions({
  name: 'MyCollapse'
})

const props = defineProps(collapseProps)
const emit = defineEmits(['update:modelValue', 'change'])

const activeNames = ref<CollapseModelValue>(props.modelValue)

const setActiveNames = (names: CollapseModelValue) => {
  activeNames.value = names
  emit('update:modelValue', names)
  emit('change', names)
}

const handleItemClick = (name: string | number) => {
  if (props.accordion) {
    setActiveNames(activeNames.value === name ? '' : name)
  } else {
    const names = Array.isArray(activeNames.value) ? [...activeNames.value] : []
    const index = names.indexOf(name)
    if (index > -1) {
      names.splice(index, 1)
    } else {
      names.push(name)
    }
    setActiveNames(names)
  }
}

watch(
  () => props.modelValue,
  (val) => {
    activeNames.value = val
  }
)

provide('collapse', {
  activeNames,
  handleItemClick
})
</script>

<style lang="scss">
.my-collapse {
  border: 1px solid var(--my-border-color-light);
  border-radius: var(--my-border-radius-base);
}
</style> 