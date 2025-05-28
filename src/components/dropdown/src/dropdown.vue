<template>
  <div
    :class="[
      'my-dropdown',
      {
        'is-disabled': disabled
      }
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @contextmenu="handleContextMenu"
  >
    <slot />
    <teleport
      v-if="popperAppendToBody"
      to="body"
    >
      <transition
        name="my-zoom-in-top"
        @after-enter="afterEnter"
        @after-leave="afterLeave"
      >
        <div
          v-show="visible"
          :class="[
            'my-dropdown__menu',
            popperClass
          ]"
          :style="popperStyle"
        >
          <template v-if="items.length">
            <div
              v-for="(item, index) in items"
              :key="index"
              :class="[
                'my-dropdown__item',
                {
                  'is-disabled': item.disabled,
                  'is-divided': item.divided
                }
              ]"
              @click="handleItemClick(item)"
            >
              <my-icon
                v-if="item.icon"
                :name="item.icon"
                class="my-dropdown__item-icon"
              />
              <span>{{ item.label }}</span>
            </div>
          </template>
          <slot name="dropdown" />
        </div>
      </transition>
    </teleport>
    <transition
      v-else
      name="my-zoom-in-top"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div
        v-show="visible"
        :class="[
          'my-dropdown__menu',
          popperClass
        ]"
        :style="popperStyle"
      >
        <template v-if="items.length">
          <div
            v-for="(item, index) in items"
            :key="index"
            :class="[
              'my-dropdown__item',
              {
                'is-disabled': item.disabled,
                'is-divided': item.divided
              }
            ]"
            @click="handleItemClick(item)"
          >
            <my-icon
              v-if="item.icon"
              :name="item.icon"
              class="my-dropdown__item-icon"
            />
            <span>{{ item.label }}</span>
          </div>
        </template>
        <slot name="dropdown" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { dropdownProps } from './dropdown'
import type { DropdownItem } from './dropdown'
import MyIcon from '@utils/icon'

defineOptions({
  name: 'MyDropdown'
})

const props = defineProps(dropdownProps)
const emit = defineEmits(['visible-change', 'command'])

const visible = ref(props.visible)
const triggerEl = ref<HTMLElement | null>(null)
const popperEl = ref<HTMLElement | null>(null)

const popperStyle = computed(() => {
  return {
    zIndex: 2000
  }
})

let showTimer: number | null = null
let hideTimer: number | null = null

const handleMouseEnter = () => {
  if (props.disabled) return
  if (props.trigger === 'hover') {
    if (hideTimer) {
      clearTimeout(hideTimer)
      hideTimer = null
    }
    showTimer = window.setTimeout(() => {
      visible.value = true
      emit('visible-change', true)
    }, props.showTimeout)
  }
}

const handleMouseLeave = () => {
  if (props.disabled) return
  if (props.trigger === 'hover') {
    if (showTimer) {
      clearTimeout(showTimer)
      showTimer = null
    }
    hideTimer = window.setTimeout(() => {
      visible.value = false
      emit('visible-change', false)
    }, props.hideTimeout)
  }
}

const handleClick = () => {
  if (props.disabled) return
  if (props.trigger === 'click') {
    visible.value = !visible.value
    emit('visible-change', visible.value)
  }
}

const handleContextMenu = (e: MouseEvent) => {
  if (props.disabled) return
  if (props.trigger === 'contextmenu') {
    e.preventDefault()
    visible.value = true
    emit('visible-change', true)
  }
}

const handleItemClick = (item: DropdownItem) => {
  if (item.disabled) return
  emit('command', item.command)
  visible.value = false
  emit('visible-change', false)
}

const afterEnter = () => {
  if (popperEl.value) {
    popperEl.value.style.transformOrigin = 'center top'
  }
}

const afterLeave = () => {
  if (popperEl.value) {
    popperEl.value.style.transformOrigin = ''
  }
}

const handleDocumentClick = (e: MouseEvent) => {
  if (props.trigger === 'click' && visible.value) {
    const target = e.target as HTMLElement
    if (!triggerEl.value?.contains(target) && !popperEl.value?.contains(target)) {
      visible.value = false
      emit('visible-change', false)
    }
  }
}

watch(
  () => props.visible,
  (val) => {
    visible.value = val
  }
)

onMounted(() => {
  triggerEl.value = document.querySelector('.my-dropdown')
  popperEl.value = document.querySelector('.my-dropdown__menu')
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
  if (showTimer) {
    clearTimeout(showTimer)
  }
  if (hideTimer) {
    clearTimeout(hideTimer)
  }
})
</script>

<style lang="scss">
.my-dropdown {
  display: inline-block;
  position: relative;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &__menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 2000;
    min-width: 120px;
    padding: 5px 0;
    margin: 5px 0;
    background-color: var(--my-color-white);
    border: 1px solid var(--my-border-color-light);
    border-radius: var(--my-border-radius-base);
    box-shadow: var(--my-box-shadow-light);
  }

  &__item {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    font-size: 14px;
    line-height: 1.5;
    color: var(--my-text-color-regular);
    cursor: pointer;
    outline: none;

    &:hover {
      background-color: var(--my-color-primary-light-9);
      color: var(--my-color-primary);
    }

    &.is-disabled {
      cursor: not-allowed;
      opacity: 0.6;

      &:hover {
        background-color: transparent;
        color: var(--my-text-color-regular);
      }
    }

    &.is-divided {
      border-top: 1px solid var(--my-border-color-light);
      margin: 5px 0;
    }
  }

  &__item-icon {
    margin-right: 8px;
    font-size: 16px;
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