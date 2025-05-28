<template>
  <div
    ref="listRef"
    :class="[
      'my-list',
      {
        'is-loading': loading,
        'is-finished': finished,
        'is-error': error
      }
    ]"
  >
    <div class="my-list__content">
      <slot />
    </div>
    <div
      v-if="loading"
      class="my-list__loading"
    >
      <slot name="loading">
        <i class="my-icon-loading" />
        <span>加载中...</span>
      </slot>
    </div>
    <div
      v-if="finished"
      class="my-list__finished"
    >
      <slot name="finished">
        <span>没有更多了</span>
      </slot>
    </div>
    <div
      v-if="error"
      class="my-list__error"
    >
      <slot name="error">
        <span>加载失败</span>
        <button
          class="my-list__retry"
          @click="handleRetry"
        >
          点击重试
        </button>
      </slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { listProps } from './list'

defineOptions({
  name: 'MyList'
})

const props = defineProps(listProps)
const emit = defineEmits(['load', 'update:loading', 'update:error'])

const listRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const check = () => {
  if (props.loading || props.finished || props.error) return

  const { bottom } = listRef.value!.getBoundingClientRect()
  const threshold = window.innerHeight - props.offset

  if (props.direction === 'down' && bottom <= threshold) {
    load()
  } else if (props.direction === 'up' && bottom >= threshold) {
    load()
  }
}

const load = () => {
  emit('update:loading', true)
  emit('load')
}

const handleRetry = () => {
  emit('update:error', false)
  load()
}

const initObserver = () => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        check()
      }
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }
  )

  if (listRef.value) {
    observer.observe(listRef.value)
  }
}

watch(
  () => props.loading,
  (val) => {
    if (!val) {
      check()
    }
  }
)

watch(
  () => props.finished,
  () => {
    if (observer) {
      observer.disconnect()
    }
  }
)

onMounted(() => {
  if (props.immediateCheck) {
    check()
  }
  initObserver()
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})

provide('list', {
  loading: props.loading,
  finished: props.finished,
  error: props.error
})
</script>

<style lang="scss">
.my-list {
  &__content {
    min-height: 100px;
  }

  &__loading,
  &__finished,
  &__error {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    color: var(--my-text-color-secondary);
    font-size: var(--my-font-size-base);
  }

  &__loading {
    i {
      margin-right: 8px;
      font-size: 16px;
      animation: my-rotate 1s linear infinite;
    }
  }

  &__retry {
    margin-left: 8px;
    padding: 0 16px;
    height: 32px;
    line-height: 32px;
    font-size: var(--my-font-size-base);
    color: var(--my-color-primary);
    background-color: var(--my-color-white);
    border: 1px solid var(--my-color-primary);
    border-radius: var(--my-border-radius-base);
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: var(--my-color-white);
      background-color: var(--my-color-primary);
    }
  }
}

@keyframes my-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style> 