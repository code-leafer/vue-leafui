<template>
  <div
    ref="gridRef"
    :class="[
      'my-grid',
      `my-grid--justify-${justify}`,
      `my-grid--align-${align}`,
      {
        'my-grid--nowrap': !wrap
      }
    ]"
    :style="gridStyle"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { gridProps } from './grid'

defineOptions({
  name: 'MyGrid'
})

const props = defineProps(gridProps)

const gridRef = ref<HTMLElement>()

const gridStyle = computed(() => {
  const style: Record<string, string> = {}
  const gutter = props.gutter

  if (Array.isArray(gutter)) {
    style.marginLeft = `-${gutter[0]}px`
    style.marginRight = `-${gutter[0]}px`
    style.marginTop = `-${gutter[1]}px`
    style.marginBottom = `-${gutter[1]}px`
  } else if (gutter) {
    style.marginLeft = `-${gutter}px`
    style.marginRight = `-${gutter}px`
  }

  return style
})
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-grid {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;

  &--nowrap {
    flex-wrap: nowrap;
  }

  &--justify-start {
    justify-content: flex-start;
  }

  &--justify-end {
    justify-content: flex-end;
  }

  &--justify-center {
    justify-content: center;
  }

  &--justify-space-around {
    justify-content: space-around;
  }

  &--justify-space-between {
    justify-content: space-between;
  }

  &--align-top {
    align-items: flex-start;
  }

  &--align-middle {
    align-items: center;
  }

  &--align-bottom {
    align-items: flex-end;
  }
}
</style> 