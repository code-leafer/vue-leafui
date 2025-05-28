<template>
  <ul
    :class="[
      'my-menu',
      `my-menu--${mode}`,
      {
        'my-menu--collapse': collapse
      }
    ]"
    :style="{
      backgroundColor,
      color: textColor
    }"
  >
    <slot />
  </ul>
</template>

<script lang="ts" setup>
import { provide, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { menuProps } from './menu'

defineOptions({
  name: 'MyMenu'
})

const props = defineProps(menuProps)
const router = useRouter()

const activeIndex = ref(props.defaultActive)
const openedMenus = ref<string[]>(props.defaultOpeneds)

const handleSelect = (index: string) => {
  activeIndex.value = index
  if (props.router && props.route) {
    router.push(props.route)
  }
}

const handleOpen = (index: string) => {
  if (props.uniqueOpened) {
    openedMenus.value = [index]
  } else {
    openedMenus.value.push(index)
  }
}

const handleClose = (index: string) => {
  const i = openedMenus.value.indexOf(index)
  if (i !== -1) {
    openedMenus.value.splice(i, 1)
  }
}

watch(
  () => props.defaultActive,
  (val) => {
    activeIndex.value = val
  }
)

watch(
  () => props.defaultOpeneds,
  (val) => {
    openedMenus.value = val
  }
)

provide('menu', {
  mode: props.mode,
  collapse: props.collapse,
  backgroundColor: props.backgroundColor,
  textColor: props.textColor,
  activeTextColor: props.activeTextColor,
  activeIndex,
  openedMenus,
  handleSelect,
  handleOpen,
  handleClose
})
</script>

<style lang="scss">
.my-menu {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0;
  margin: 0;
  list-style: none;
  border-right: solid 1px #e6e6e6;
  box-sizing: border-box;

  &--horizontal {
    flex-direction: row;
    border-right: none;
    border-bottom: solid 1px #e6e6e6;
  }

  &--vertical {
    flex-direction: column;
    border-right: solid 1px #e6e6e6;
    border-bottom: none;
  }

  &--collapse {
    width: 64px;
  }
}
</style> 