<template>
  <div
    v-if="loading"
    :class="[
      'my-skeleton',
      { 'is-animated': animated }
    ]"
  >
    <template v-for="(_, index) in count" :key="index">
      <div class="my-skeleton__item" v-for="(_, rowIndex) in rows" :key="rowIndex">
        <div class="my-skeleton__paragraph" v-if="rowIndex !== rows - 1" />
        <div class="my-skeleton__paragraph" v-else :style="{ width: '30%' }" />
      </div>
    </template>
  </div>
  <div v-else>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { skeletonProps } from './skeleton'

defineOptions({
  name: 'MySkeleton'
})

const props = defineProps(skeletonProps)

const loading = ref(props.loading)

let timer: number | null = null

watch(
  () => props.loading,
  (val) => {
    if (props.throttle) {
      if (timer) {
        clearTimeout(timer)
      }
      timer = window.setTimeout(() => {
        loading.value = val
      }, props.throttle)
    } else {
      loading.value = val
    }
  }
)
</script>

<style lang="scss">
.my-skeleton {
  display: flex;
  flex-direction: column;
  gap: 16px;

  &.is-animated {
    .my-skeleton__paragraph {
      &::before {
        background: linear-gradient(
          90deg,
          rgba(190, 190, 190, 0.2) 25%,
          rgba(129, 129, 129, 0.24) 37%,
          rgba(190, 190, 190, 0.2) 63%
        );
        background-size: 400% 100%;
        animation: skeleton-loading 1.4s ease infinite;
      }
    }
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__paragraph {
    height: 16px;
    background-color: #f2f2f2;
    border-radius: 4px;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #f2f2f2;
    }
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style> 