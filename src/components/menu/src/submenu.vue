<template>
  <li
    :class="[
      'my-submenu',
      {
        'is-active': isActive,
        'is-opened': isOpened,
        'is-disabled': disabled
      }
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div
      class="my-submenu__title"
      :style="titleStyle"
      @click="handleClick"
    >
      <slot name="title" />
      <i
        :class="[
          'my-submenu__icon-arrow',
          {
            'is-reverse': isOpened
          }
        ]"
      >
        <slot name="icon">
          <my-icon :name="iconName" />
        </slot>
      </i>
    </div>
    <transition
      name="my-zoom-in-top"
      @enter="handleEnter"
      @after-enter="handleAfterEnter"
      @leave="handleLeave"
    >
      <ul
        v-show="isOpened"
        class="my-submenu__menu"
      >
        <slot />
      </ul>
    </transition>
  </li>
</template>

<script lang="ts" setup>
import { computed, inject, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { subMenuProps } from './menu'
import type { SubMenuProps } from './menu'
import MyIcon from '@components/icon'

defineOptions({
  name: 'MySubmenu'
})

const props = defineProps(subMenuProps)
const router = useRouter()

const menu = inject('menu', {
  mode: 'vertical',
  collapse: false,
  backgroundColor: '#ffffff',
  textColor: '#303133',
  activeTextColor: '#409eff',
  activeIndex: '',
  openedMenus: [],
  handleSelect: () => {},
  handleOpen: () => {},
  handleClose: () => {}
})

const isOpened = ref(false)
const isActive = computed(() => menu.activeIndex === props.index)

const titleStyle = computed(() => {
  return {
    color: isActive.value ? menu.activeTextColor : menu.textColor
  }
})

const iconName = computed(() => {
  if (menu.collapse) {
    return isOpened.value ? props.collapseOpenIcon : props.collapseCloseIcon
  }
  return isOpened.value ? props.expandOpenIcon : props.expandCloseIcon
})

const handleClick = () => {
  if (props.disabled) return

  if (menu.mode === 'horizontal') {
    isOpened.value = !isOpened.value
  } else {
    if (isOpened.value) {
      menu.handleClose(props.index)
    } else {
      menu.handleOpen(props.index)
    }
  }
}

const handleMouseEnter = () => {
  if (menu.mode === 'horizontal' && !menu.collapse) {
    isOpened.value = true
  }
}

const handleMouseLeave = () => {
  if (menu.mode === 'horizontal' && !menu.collapse) {
    isOpened.value = false
  }
}

const handleEnter = (el: Element) => {
  el.style.height = 'auto'
  const height = el.scrollHeight
  el.style.height = '0px'
  el.offsetHeight // Force reflow
  el.style.height = `${height}px`
}

const handleAfterEnter = (el: Element) => {
  el.style.height = 'auto'
}

const handleLeave = (el: Element) => {
  el.style.height = `${el.scrollHeight}px`
  el.offsetHeight // Force reflow
  el.style.height = '0px'
}

watch(
  () => menu.openedMenus,
  (val) => {
    isOpened.value = val.includes(props.index)
  },
  { immediate: true }
)
</script>

<style lang="scss">
.my-submenu {
  list-style: none;
  margin: 0;
  padding-left: 0;

  &__title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
    line-height: 56px;
    padding: 0 20px;
    cursor: pointer;
    transition: border-color var(--my-transition-duration),
      background-color var(--my-transition-duration),
      color var(--my-transition-duration);

    &:hover {
      background-color: var(--my-color-primary-light-9);
    }
  }

  &__icon-arrow {
    transition: transform var(--my-transition-duration);
    font-size: 12px;

    &.is-reverse {
      transform: rotate(180deg);
    }
  }

  &__menu {
    list-style: none;
    margin: 0;
    padding-left: 0;
    overflow: hidden;
  }

  &.is-active {
    > .my-submenu__title {
      color: var(--my-color-primary);
    }
  }

  &.is-disabled {
    opacity: 0.25;
    cursor: not-allowed;
    background: none !important;

    > .my-submenu__title {
      cursor: not-allowed;
    }
  }
}

.my-zoom-in-top-enter-active,
.my-zoom-in-top-leave-active {
  opacity: 1;
  transform: scaleY(1);
  transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1),
    opacity 300ms cubic-bezier(0.23, 1, 0.32, 1);
  transform-origin: center top;
}

.my-zoom-in-top-enter-from,
.my-zoom-in-top-leave-to {
  opacity: 0;
  transform: scaleY(0);
}
</style> 