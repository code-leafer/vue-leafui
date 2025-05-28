<template>
  <i
    :class="name"
    :style="{
      fontSize: typeof size === 'number' ? `${size}px` : size,
      color
    }"
  />
</template>

<script lang="ts" setup>
import { iconProps } from './icon'
import type { IconProps } from './icon'

defineOptions({
  name: 'MyIcon'
})

defineProps(iconProps)
</script> 