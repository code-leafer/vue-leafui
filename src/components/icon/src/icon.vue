<template>
  <i
    ref="iconRef"
    :class="[
      'my-icon',
      `my-icon-${name}`,
      {
        'is-spinning': spin
      }
    ]"
    :style="{
      fontSize: typeof size === 'number' ? `${size}px` : '',
      color: color,
      transform: rotate ? `rotate(${rotate}deg)` : ''
    }"
    @click="handleClick"
  ></i>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { iconProps, iconEmits } from './icon'

defineOptions({
  name: 'MyIcon'
})

const props = defineProps(iconProps)
const emit = defineEmits(iconEmits)

const iconRef = ref<HTMLElement>()

const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: $font-size-base;
  color: inherit;
  @include transition(all);

  &--small {
    font-size: $font-size-small;
  }

  &--medium {
    font-size: $font-size-base;
  }

  &--large {
    font-size: $font-size-large;
  }

  &.is-spinning {
    animation: rotating 2s linear infinite;
  }
}

@keyframes rotating {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 