<template>
  <div
    :class="[
      'my-carousel__item',
      {
        'is-active': isActive
      }
    ]"
  >
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { inject, onMounted, onUnmounted } from 'vue'
import { carouselItemProps } from './carousel'

defineOptions({
  name: 'MyCarouselItem'
})

const props = defineProps(carouselItemProps)

const carousel = inject('carousel', {
  registerItem: () => {},
  unregisterItem: () => {}
})

onMounted(() => {
  carousel.registerItem(props)
})

onUnmounted(() => {
  carousel.unregisterItem(props)
})
</script>

<style lang="scss">
.my-carousel__item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style> 