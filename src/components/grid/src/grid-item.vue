<template>
  <div
    ref="gridItemRef"
    :class="['my-grid-item']"
    :style="gridItemStyle"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue'
import { gridItemProps } from './grid'

defineOptions({
  name: 'MyGridItem'
})

const props = defineProps(gridItemProps)

const gridItemRef = ref<HTMLElement>()

const gutter = inject<number | [number, number]>('gutter', 0)

const gridItemStyle = computed(() => {
  const style: Record<string, string> = {}
  const percent = (props.span / 24) * 100
  const offsetPercent = (props.offset / 24) * 100
  const pushPercent = (props.push / 24) * 100
  const pullPercent = (props.pull / 24) * 100

  style.width = `${percent}%`
  style.marginLeft = offsetPercent ? `${offsetPercent}%` : ''
  style.position = pushPercent || pullPercent ? 'relative' : ''
  style.left = pushPercent ? `${pushPercent}%` : ''
  style.right = pullPercent ? `${pullPercent}%` : ''

  if (Array.isArray(gutter)) {
    style.paddingLeft = `${gutter[0]}px`
    style.paddingRight = `${gutter[0]}px`
    style.paddingTop = `${gutter[1]}px`
    style.paddingBottom = `${gutter[1]}px`
  } else if (gutter) {
    style.paddingLeft = `${gutter}px`
    style.paddingRight = `${gutter}px`
  }

  return style
})
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-grid-item {
  box-sizing: border-box;
}
</style> 