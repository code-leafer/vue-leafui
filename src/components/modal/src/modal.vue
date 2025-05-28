<template>
  <Teleport :to="appendToBody ? 'body' : undefined">
    <Transition
      name="my-modal-fade"
      @after-enter="handleAfterEnter"
      @after-leave="handleAfterLeave"
    >
      <div
        v-show="modelValue"
        :class="[
          'my-modal',
          customClass,
          {
            'is-fullscreen': fullscreen,
            'is-center': center
          }
        ]"
        @click.self="handleClickModal"
      >
        <div
          :class="['my-modal__wrapper']"
          :style="modalStyle"
        >
          <div :class="['my-modal__header']">
            <slot name="header">
              <span :class="['my-modal__title']">{{ title }}</span>
            </slot>
            <button
              v-if="showClose"
              :class="['my-modal__headerbtn']"
              @click="handleClose"
            >
              <i class="my-icon-close"></i>
            </button>
          </div>
          <div :class="['my-modal__body']">
            <slot></slot>
          </div>
          <div v-if="$slots.footer" :class="['my-modal__footer']">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import { modalProps, modalEmits, ModalInstance } from './modal'

defineOptions({
  name: 'MyModal'
})

const props = defineProps(modalProps)
const emit = defineEmits(modalEmits)

const modalStyle = computed(() => {
  const style: Record<string, string> = {}
  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
  }
  if (props.top) {
    style.marginTop = props.top
  }
  return style
})

const handleClickModal = () => {
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

const handleAfterEnter = () => {
  emit('opened')
}

const handleAfterLeave = () => {
  emit('closed')
}

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      emit('open')
      if (props.lockScroll) {
        document.body.style.overflow = 'hidden'
      }
    } else {
      emit('close')
      if (props.lockScroll) {
        document.body.style.overflow = ''
      }
    }
  }
)

const modalInstance: ModalInstance = {
  open: () => {
    emit('update:modelValue', true)
  },
  close: handleClose
}

defineExpose(modalInstance)
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: auto;

  &__wrapper {
    position: relative;
    margin: 0 auto;
    background-color: #fff;
    border-radius: $border-radius-base;
    box-shadow: $box-shadow-light;
    box-sizing: border-box;
    width: 50%;
    margin-top: 15vh;
    max-height: 85vh;
    display: flex;
    flex-direction: column;
  }

  &__header {
    padding: 20px;
    padding-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: $font-size-large;
    font-weight: 500;
    color: $text-primary;
    margin: 0;
  }

  &__headerbtn {
    position: absolute;
    top: 20px;
    right: 20px;
    padding: 0;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: $font-size-large;
    color: $text-secondary;

    &:hover {
      color: $text-primary;
    }
  }

  &__body {
    padding: 20px;
    font-size: $font-size-base;
    color: $text-regular;
    overflow: auto;
    flex: 1;
  }

  &__footer {
    padding: 10px 20px 20px;
    text-align: right;
    box-sizing: border-box;
  }

  &.is-fullscreen {
    .my-modal__wrapper {
      width: 100%;
      height: 100%;
      margin: 0;
      max-height: none;
    }
  }

  &.is-center {
    align-items: center;

    .my-modal__wrapper {
      margin-top: 0;
    }
  }
}

.my-modal-fade-enter-active,
.my-modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.my-modal-fade-enter-from,
.my-modal-fade-leave-to {
  opacity: 0;
}
</style> 