<template>
  <div
    ref="triggerRef"
    :class="[
      'my-tooltip',
      {
        'is-disabled': disabled
      }
    ]"
    :tabindex="tabindex"
    @focus="handleFocus"
    @blur="handleBlur"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @keydown="handleKeydown"
  >
    <div
      ref="popperRef"
      v-show="!disabled && (visible || showPopper)"
      :class="[
        'my-tooltip__popper',
        `is-${effect}`,
        popperClass
      ]"
      :style="popperStyle"
      role="tooltip"
      :aria-hidden="!visible"
    >
      <div
        v-if="showArrow"
        ref="arrowRef"
        class="my-tooltip__arrow"
      ></div>
      <div class="my-tooltip__content">
        <slot>{{ content }}</slot>
      </div>
    </div>
    <div class="my-tooltip__trigger">
      <slot name="default"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { createPopper } from '@popperjs/core'
import type { Instance as PopperInstance, Options as PopperOptions } from '@popperjs/core'
import { tooltipProps, type TooltipInstance } from './tooltip'

defineOptions({
  name: 'MyTooltip'
})

const props = defineProps(tooltipProps)

const triggerRef = ref<HTMLElement>()
const popperRef = ref<HTMLElement>()
const arrowRef = ref<HTMLElement>()
const popperInstance = ref<PopperInstance>()
const showPopper = ref(false)
const visible = ref(props.visible)

const popperStyle = computed(() => {
  return {
    zIndex: 2000
  }
})

const createPopperInstance = () => {
  if (!triggerRef.value || !popperRef.value) return

  const options: PopperOptions = {
    placement: props.placement,
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, props.offset]
        }
      },
      {
        name: 'arrow',
        options: {
          element: arrowRef.value,
          padding: 5
        }
      },
      {
        name: 'computeStyles',
        options: {
          adaptive: false,
          gpuAcceleration: false
        }
      }
    ],
    ...props.popperOptions
  }

  popperInstance.value = createPopper(triggerRef.value, popperRef.value, options)
}

const updatePopper = () => {
  popperInstance.value?.update()
}

const showPopperHandler = () => {
  if (props.disabled) return
  showPopper.value = true
  nextTick(() => {
    updatePopper()
  })
}

const hidePopperHandler = () => {
  if (props.disabled) return
  showPopper.value = false
}

const handleFocus = () => {
  if (props.trigger === 'focus') {
    showPopperHandler()
  }
}

const handleBlur = () => {
  if (props.trigger === 'focus') {
    hidePopperHandler()
  }
}

const handleMouseEnter = () => {
  if (props.trigger === 'hover') {
    showPopperHandler()
  }
}

const handleMouseLeave = () => {
  if (props.trigger === 'hover') {
    hidePopperHandler()
  }
}

const handleClick = () => {
  if (props.trigger === 'click') {
    showPopper.value = !showPopper.value
    nextTick(() => {
      updatePopper()
    })
  }
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    hidePopperHandler()
  }
}

watch(
  () => props.visible,
  (val) => {
    visible.value = val
  }
)

onMounted(() => {
  createPopperInstance()
})

onBeforeUnmount(() => {
  popperInstance.value?.destroy()
})

const tooltipInstance: TooltipInstance = {
  updatePopper,
  showPopper: showPopperHandler,
  hidePopper: hidePopperHandler,
  handleFocus,
  handleBlur,
  handleMouseEnter,
  handleMouseLeave,
  handleClick,
  handleKeydown
}

defineExpose(tooltipInstance)
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-tooltip {
  display: inline-block;
  position: relative;

  &.is-disabled {
    cursor: not-allowed;
  }

  &__popper {
    position: absolute;
    border-radius: $border-radius-base;
    padding: 8px 12px;
    font-size: $font-size-base;
    line-height: 1.4;
    min-width: 10px;
    word-wrap: break-word;
    visibility: visible;

    &.is-dark {
      background: $tooltip-dark-bg;
      color: $tooltip-dark-color;
    }

    &.is-light {
      background: $tooltip-light-bg;
      color: $tooltip-light-color;
      border: 1px solid $tooltip-light-border;
    }

    &[aria-hidden="true"] {
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.2s, visibility 0.2s;
    }
  }

  &__arrow {
    position: absolute;
    width: 8px;
    height: 8px;
    background: inherit;
    visibility: hidden;

    &::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      background: inherit;
      visibility: visible;
      transform: rotate(45deg);
    }
  }

  &__content {
    position: relative;
    z-index: 1;
  }

  &__trigger {
    display: inline-block;
  }
}
</style> 