<template>
  <teleport
    v-if="appendToBody"
    to="body"
  >
    <transition
      name="my-drawer-fade"
      @after-enter="afterEnter"
      @after-leave="afterLeave"
    >
      <div
        v-show="modelValue"
        :class="[
          'my-drawer',
          customClass,
          {
            'is-rtl': direction === 'rtl',
            'is-ltr': direction === 'ltr',
            'is-ttb': direction === 'ttb',
            'is-btt': direction === 'btt'
          }
        ]"
        :style="drawerStyle"
        @click.self="handleWrapperClick"
      >
        <div
          :class="[
            'my-drawer__container',
            {
              'has-header': withHeader
            }
          ]"
          :style="containerStyle"
        >
          <header
            v-if="withHeader"
            class="my-drawer__header"
          >
            <span class="my-drawer__title">
              <slot name="title">{{ title }}</slot>
            </span>
            <button
              v-if="showClose"
              class="my-drawer__close-btn"
              @click="handleClose"
            >
              <my-icon name="my-icon-close" />
            </button>
          </header>
          <section class="my-drawer__body">
            <slot />
          </section>
        </div>
      </div>
    </transition>
  </teleport>
  <transition
    v-else
    name="my-drawer-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div
      v-show="modelValue"
      :class="[
        'my-drawer',
        customClass,
        {
          'is-rtl': direction === 'rtl',
          'is-ltr': direction === 'ltr',
          'is-ttb': direction === 'ttb',
          'is-btt': direction === 'btt'
        }
      ]"
      :style="drawerStyle"
      @click.self="handleWrapperClick"
    >
      <div
        :class="[
          'my-drawer__container',
          {
            'has-header': withHeader
          }
        ]"
        :style="containerStyle"
      >
        <header
          v-if="withHeader"
          class="my-drawer__header"
        >
          <span class="my-drawer__title">
            <slot name="title">{{ title }}</slot>
          </span>
          <button
            v-if="showClose"
            class="my-drawer__close-btn"
            @click="handleClose"
          >
            <my-icon name="my-icon-close" />
          </button>
        </header>
        <section class="my-drawer__body">
          <slot />
        </section>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { drawerProps } from './drawer'
import type { DrawerProps } from './drawer'
import MyIcon from '@components/icon'

defineOptions({
  name: 'MyDrawer'
})

const props = defineProps(drawerProps)
const emit = defineEmits(['update:modelValue', 'open', 'opened', 'close', 'closed'])

const visible = ref(false)
const drawerStyle = computed(() => {
  return {
    zIndex: props.zIndex
  }
})

const containerStyle = computed(() => {
  if (props.direction === 'rtl' || props.direction === 'ltr') {
    return {
      width: typeof props.size === 'number' ? `${props.size}px` : props.size
    }
  }
  return {
    height: typeof props.size === 'number' ? `${props.size}px` : props.size
  }
})

const handleWrapperClick = () => {
  if (props.closeOnClickModal) {
    handleClose()
  }
}

const handleClose = () => {
  if (props.beforeClose) {
    props.beforeClose(() => {
      emit('update:modelValue', false)
    })
  } else {
    emit('update:modelValue', false)
  }
}

const afterEnter = () => {
  emit('opened')
}

const afterLeave = () => {
  emit('closed')
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape' && props.closeOnPressEscape) {
    handleClose()
  }
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      emit('open')
      document.addEventListener('keydown', handleKeydown)
    } else {
      document.removeEventListener('keydown', handleKeydown)
      emit('close')
    }
  }
)

onMounted(() => {
  if (props.modelValue) {
    document.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<style lang="scss">
.my-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--my-z-index-drawer);
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.5);

  &__container {
    position: absolute;
    background-color: var(--my-color-white);
    box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2),
      0 16px 24px 2px rgba(0, 0, 0, 0.14),
      0 6px 30px 5px rgba(0, 0, 0, 0.12);
  }

  &.is-rtl {
    .my-drawer__container {
      top: 0;
      right: 0;
      bottom: 0;
      height: 100%;
    }
  }

  &.is-ltr {
    .my-drawer__container {
      top: 0;
      left: 0;
      bottom: 0;
      height: 100%;
    }
  }

  &.is-ttb {
    .my-drawer__container {
      top: 0;
      left: 0;
      right: 0;
      width: 100%;
    }
  }

  &.is-btt {
    .my-drawer__container {
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
    }
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid var(--my-border-color-light);
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    color: var(--my-text-color-primary);
  }

  &__close-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    background: none;
    color: var(--my-text-color-regular);
    cursor: pointer;
    outline: none;

    &:hover {
      color: var(--my-color-primary);
    }
  }

  &__body {
    padding: 20px;
    height: calc(100% - 65px);
    overflow: auto;
  }
}

.my-drawer-fade-enter-active,
.my-drawer-fade-leave-active {
  transition: opacity 0.3s;
}

.my-drawer-fade-enter-from,
.my-drawer-fade-leave-to {
  opacity: 0;
}
</style> 