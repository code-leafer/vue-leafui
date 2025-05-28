<template>
  <div
    :class="[
      'my-popover',
      {
        'is-disabled': disabled
      }
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @focus="handleFocus"
    @blur="handleBlur"
    :tabindex="tabindex"
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
            'my-popover__popper',
            popperClass
          ]"
          :style="popperStyle"
        >
          <div
            v-if="showArrow"
            class="my-popover__arrow"
          />
          <div class="my-popover__title">
            <slot name="title">{{ title }}</slot>
          </div>
          <div class="my-popover__content">
            <slot>{{ content }}</slot>
          </div>
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
          'my-popover__popper',
          popperClass
        ]"
        :style="popperStyle"
      >
        <div
          v-if="showArrow"
          class="my-popover__arrow"
        />
        <div class="my-popover__title">
          <slot name="title">{{ title }}</slot>
        </div>
        <div class="my-popover__content">
          <slot>{{ content }}</slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { popoverProps } from './popover'

defineOptions({
  name: 'MyPopover'
})

const props = defineProps(popoverProps)
const emit = defineEmits(['visible-change'])

const visible = ref(props.visible)
const triggerEl = ref<HTMLElement | null>(null)
const popperEl = ref<HTMLElement | null>(null)

const popperStyle = computed(() => {
  return {
    width: typeof props.width === 'number' ? `${props.width}px` : props.width
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

const handleFocus = () => {
  if (props.disabled) return
  if (props.trigger === 'focus') {
    visible.value = true
    emit('visible-change', true)
  }
}

const handleBlur = () => {
  if (props.disabled) return
  if (props.trigger === 'focus') {
    visible.value = false
    emit('visible-change', false)
  }
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
  triggerEl.value = document.querySelector('.my-popover')
  popperEl.value = document.querySelector('.my-popover__popper')
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
.my-popover {
  display: inline-block;
  position: relative;

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &__popper {
    position: absolute;
    z-index: 2000;
    background-color: var(--my-color-white);
    border: 1px solid var(--my-border-color-light);
    border-radius: var(--my-border-radius-base);
    box-shadow: var(--my-box-shadow-light);
    padding: 12px;
    min-width: 150px;
  }

  &__arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background-color: var(--my-color-white);
    border: 1px solid var(--my-border-color-light);
    transform: rotate(45deg);
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    color: var(--my-text-color-primary);
    margin-bottom: 8px;
  }

  &__content {
    font-size: 14px;
    color: var(--my-text-color-regular);
    line-height: 1.5;
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