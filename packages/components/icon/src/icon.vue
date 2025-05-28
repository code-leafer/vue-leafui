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