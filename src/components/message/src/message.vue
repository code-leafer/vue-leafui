<template>
  <Transition
    name="my-message-fade"
    @after-leave="handleAfterLeave"
  >
    <div
      v-show="visible"
      :class="[
        'my-message',
        `my-message--${type}`,
        {
          'is-center': center
        }
      ]"
      :style="messageStyle"
    >
      <i
        v-if="type"
        :class="[
          'my-message__icon',
          `my-icon-${type}`
        ]"
      ></i>
      <p :class="['my-message__content']">{{ message }}</p>
      <i
        v-if="showClose"
        :class="['my-message__closeBtn', 'my-icon-close']"
        @click="handleClose"
      ></i>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { messageProps, MessageInstance } from './message'

defineOptions({
  name: 'MyMessage'
})

const props = defineProps(messageProps)

const visible = ref(false)
let timer: number | null = null

const messageStyle = {
  top: `${props.offset}px`
}

const startTimer = () => {
  if (props.duration > 0) {
    timer = window.setTimeout(() => {
      handleClose()
    }, props.duration)
  }
}

const handleClose = () => {
  visible.value = false
}

const handleAfterLeave = () => {
  props.onClose?.()
}

onMounted(() => {
  visible.value = true
  startTimer()
})

onBeforeUnmount(() => {
  if (timer) {
    clearTimeout(timer)
    timer = null
  }
})

const messageInstance: MessageInstance = {
  close: handleClose
}

defineExpose(messageInstance)
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-message {
  min-width: 300px;
  box-sizing: border-box;
  border-radius: $border-radius-base;
  border-width: 1px;
  border-style: solid;
  border-color: $border-color-base;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  transition: opacity 0.3s, transform 0.4s;
  padding: 10px 16px;
  display: flex;
  align-items: center;
  z-index: 2000;

  &__icon {
    margin-right: 10px;
    font-size: 16px;
  }

  &__content {
    padding: 0;
    font-size: $font-size-base;
    line-height: 1;
    margin: 0;
  }

  &__closeBtn {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    cursor: pointer;
    color: $text-secondary;
    font-size: $font-size-base;

    &:hover {
      color: $text-primary;
    }
  }

  &--success {
    background-color: mix(#fff, $success-color, 90%);
    border-color: mix(#fff, $success-color, 50%);

    .my-message__icon {
      color: $success-color;
    }
  }

  &--warning {
    background-color: mix(#fff, $warning-color, 90%);
    border-color: mix(#fff, $warning-color, 50%);

    .my-message__icon {
      color: $warning-color;
    }
  }

  &--info {
    background-color: mix(#fff, $info-color, 90%);
    border-color: mix(#fff, $info-color, 50%);

    .my-message__icon {
      color: $info-color;
    }
  }

  &--error {
    background-color: mix(#fff, $danger-color, 90%);
    border-color: mix(#fff, $danger-color, 50%);

    .my-message__icon {
      color: $danger-color;
    }
  }

  &.is-center {
    justify-content: center;
  }
}

.my-message-fade-enter-active,
.my-message-fade-leave-active {
  transition: opacity 0.3s, transform 0.4s;
}

.my-message-fade-enter-from,
.my-message-fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style> 