<template>
  <Transition name="notification-fade">
    <div
      v-show="visible"
      :class="[
        'my-notification',
        `my-notification--${type}`,
        `my-notification--${position}`,
        customClass
      ]"
      role="alert"
    >
      <div class="my-notification__header">
        <div class="my-notification__title">{{ title }}</div>
        <button
          v-if="showClose"
          class="my-notification__close"
          @click="handleClose"
        >
          <i class="my-icon-close"></i>
        </button>
      </div>
      <div v-if="message" class="my-notification__content">
        {{ message }}
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { notificationProps } from './notification'
import type { NotificationInstance } from './notification'

defineOptions({
  name: 'MyNotification'
})

const props = defineProps(notificationProps)

const visible = ref(false)
let timer: number | null = null

const startTimer = () => {
  if (props.duration > 0) {
    timer = window.setTimeout(() => {
      handleClose()
    }, props.duration)
  }
}

const handleClose = () => {
  visible.value = false
  props.onClose?.()
}

const setMessage = (message: string) => {
  emit('update:message', message)
}

const setTitle = (title: string) => {
  emit('update:title', title)
}

const emit = defineEmits<{
  (e: 'update:message', message: string): void
  (e: 'update:title', title: string): void
}>()

watch(
  () => visible.value,
  (val) => {
    if (val) {
      startTimer()
    } else if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }
)

defineExpose<NotificationInstance>({
  close: handleClose,
  setMessage,
  setTitle
})
</script>

<style lang="scss">
.my-notification {
  position: fixed;
  display: flex;
  flex-direction: column;
  padding: 16px;
  min-width: 300px;
  max-width: 450px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  z-index: 9999;
  transition: opacity 0.3s, transform 0.3s;

  &--top-right {
    top: 16px;
    right: 16px;
  }

  &--top-left {
    top: 16px;
    left: 16px;
  }

  &--bottom-right {
    bottom: 16px;
    right: 16px;
  }

  &--bottom-left {
    bottom: 16px;
    left: 16px;
  }

  &--success {
    border-left: 4px solid #67c23a;
  }

  &--warning {
    border-left: 4px solid #e6a23c;
  }

  &--info {
    border-left: 4px solid #909399;
  }

  &--error {
    border-left: 4px solid #f56c6c;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }

  &__title {
    font-size: 16px;
    font-weight: 500;
    color: #303133;
  }

  &__close {
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    cursor: pointer;
    font-size: 16px;
    color: #909399;

    &:hover {
      color: #606266;
    }
  }

  &__content {
    font-size: 14px;
    color: #606266;
    line-height: 1.5;
  }
}

.notification-fade-enter-active,
.notification-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.notification-fade-enter-from,
.notification-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style> 