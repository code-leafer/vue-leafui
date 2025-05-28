<template>
  <div
    v-show="visible"
    :class="[
      'my-loading-mask',
      customClass,
      {
        'is-fullscreen': fullscreen
      }
    ]"
    :style="maskStyle"
  >
    <div :class="['my-loading-spinner']">
      <svg
        v-if="type === 'circular'"
        :class="['circular']"
        :style="spinnerStyle"
        viewBox="25 25 50 50"
      >
        <circle
          cx="50"
          cy="50"
          r="20"
          fill="none"
          class="path"
        ></circle>
      </svg>
      <i
        v-else
        :class="['my-icon-loading']"
        :style="spinnerStyle"
      ></i>
      <p
        v-if="text"
        :class="['my-loading-text']"
      >{{ text }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { loadingProps, LoadingInstance } from './loading'

defineOptions({
  name: 'MyLoading'
})

const props = defineProps(loadingProps)

const visible = ref(props.visible)

const maskStyle = computed(() => {
  if (props.background) {
    return {
      backgroundColor: props.background
    }
  }
  return {}
})

const spinnerStyle = computed(() => {
  if (props.size) {
    const size = typeof props.size === 'number' ? `${props.size}px` : props.size
    return {
      width: size,
      height: size
    }
  }
  return {}
})

const setText = (text: string) => {
  props.text = text
}

const setVisible = (value: boolean) => {
  visible.value = value
}

watch(
  () => props.visible,
  (val) => {
    visible.value = val
  }
)

const loadingInstance: LoadingInstance = {
  close: () => {
    visible.value = false
  },
  setText,
  setVisible
}

defineExpose(loadingInstance)
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-loading-mask {
  position: absolute;
  z-index: 2000;
  background-color: rgba(255, 255, 255, 0.9);
  margin: 0;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: opacity 0.3s;

  &.is-fullscreen {
    position: fixed;
  }

  .my-loading-spinner {
    top: 50%;
    margin-top: -21px;
    width: 100%;
    text-align: center;
    position: absolute;

    .circular {
      height: 42px;
      width: 42px;
      animation: loading-rotate 2s linear infinite;

      .path {
        animation: loading-dash 1.5s ease-in-out infinite;
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        stroke-width: 2;
        stroke: $primary-color;
        stroke-linecap: round;
      }
    }

    .my-icon-loading {
      font-size: 42px;
      color: $primary-color;
      animation: rotating 2s linear infinite;
    }

    .my-loading-text {
      color: $primary-color;
      margin: 3px 0;
      font-size: $font-size-base;
    }
  }
}

@keyframes loading-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loading-dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40px;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120px;
  }
}

@keyframes rotating {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style> 