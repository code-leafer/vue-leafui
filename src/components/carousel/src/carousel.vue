<template>
  <div
    :class="[
      'my-carousel',
      `my-carousel--${direction}`,
      {
        'my-carousel--card': type === 'card'
      }
    ]"
    :style="{ height }"
  >
    <div
      class="my-carousel__container"
      :style="{ height }"
    >
      <transition-group
        v-if="direction === 'horizontal'"
        name="my-carousel__item--horizontal"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          v-show="activeIndex === index"
          class="my-carousel__item"
        >
          <slot
            :name="item.name"
            :item="item"
          />
        </div>
      </transition-group>
      <transition-group
        v-else
        name="my-carousel__item--vertical"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          v-show="activeIndex === index"
          class="my-carousel__item"
        >
          <slot
            :name="item.name"
            :item="item"
          />
        </div>
      </transition-group>
    </div>
    <template v-if="arrow !== 'never'">
      <div
        v-show="arrow === 'always' || hover"
        class="my-carousel__arrow my-carousel__arrow--left"
        @click="handleArrowClick('left')"
      >
        <i class="my-icon-arrow-left" />
      </div>
      <div
        v-show="arrow === 'always' || hover"
        class="my-carousel__arrow my-carousel__arrow--right"
        @click="handleArrowClick('right')"
      >
        <i class="my-icon-arrow-right" />
      </div>
    </template>
    <ul
      v-if="indicatorPosition !== 'none'"
      :class="[
        'my-carousel__indicators',
        `my-carousel__indicators--${indicatorPosition}`,
        {
          'my-carousel__indicators--labels': items.some(item => item.label)
        }
      ]"
    >
      <li
        v-for="(item, index) in items"
        :key="index"
        :class="[
          'my-carousel__indicator',
          {
            'is-active': activeIndex === index
          }
        ]"
        @click="handleIndicatorClick(index)"
        @mouseenter="handleIndicatorHover(index)"
      >
        <button class="my-carousel__button">
          <span v-if="item.label">{{ item.label }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { carouselProps } from './carousel'
import type { CarouselItemProps } from './carousel'

defineOptions({
  name: 'MyCarousel'
})

const props = defineProps(carouselProps)
const emit = defineEmits(['change'])

const items = ref<CarouselItemProps[]>([])
const activeIndex = ref(props.initialIndex)
const hover = ref(false)
let timer: number | null = null

const registerItem = (item: CarouselItemProps) => {
  items.value.push(item)
}

const unregisterItem = (item: CarouselItemProps) => {
  const index = items.value.indexOf(item)
  if (index > -1) {
    items.value.splice(index, 1)
  }
}

const handleArrowClick = (direction: 'left' | 'right') => {
  const length = items.value.length
  if (direction === 'left') {
    activeIndex.value = (activeIndex.value - 1 + length) % length
  } else {
    activeIndex.value = (activeIndex.value + 1) % length
  }
  emit('change', activeIndex.value)
}

const handleIndicatorClick = (index: number) => {
  if (props.trigger === 'click') {
    activeIndex.value = index
    emit('change', index)
  }
}

const handleIndicatorHover = (index: number) => {
  if (props.trigger === 'hover') {
    activeIndex.value = index
    emit('change', index)
  }
}

const startTimer = () => {
  if (props.interval <= 0 || !props.autoplay) return
  stopTimer()
  timer = window.setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % items.value.length
    emit('change', activeIndex.value)
  }, props.interval)
}

const stopTimer = () => {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

watch(
  () => props.autoplay,
  (val) => {
    if (val) {
      startTimer()
    } else {
      stopTimer()
    }
  }
)

watch(
  () => props.interval,
  () => {
    if (props.autoplay) {
      startTimer()
    }
  }
)

onMounted(() => {
  if (props.autoplay) {
    startTimer()
  }
})

onUnmounted(() => {
  stopTimer()
})

provide('carousel', {
  registerItem,
  unregisterItem
})
</script>

<style lang="scss">
.my-carousel {
  position: relative;
  overflow: hidden;

  &__container {
    position: relative;
    height: 100%;
  }

  &__item {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &__arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 36px;
    height: 36px;
    background-color: rgba(31, 45, 61, 0.11);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 10;

    &:hover {
      background-color: rgba(31, 45, 61, 0.23);
    }

    &--left {
      left: 16px;
    }

    &--right {
      right: 16px;
    }

    i {
      font-size: 18px;
      color: var(--my-color-white);
    }
  }

  &__indicators {
    position: absolute;
    list-style: none;
    margin: 0;
    padding: 0;
    z-index: 10;

    &--outside {
      bottom: -24px;
      text-align: center;
      position: static;
      transform: none;
    }

    &--labels {
      .my-carousel__button {
        width: auto;
        padding: 0 12px;
      }
    }
  }

  &__indicator {
    display: inline-block;
    padding: 12px 4px;
    cursor: pointer;

    &.is-active {
      .my-carousel__button {
        opacity: 1;
      }
    }
  }

  &__button {
    display: block;
    width: 30px;
    height: 3px;
    background-color: var(--my-color-white);
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    transition: all 0.3s;
    opacity: 0.3;
  }

  &--horizontal {
    .my-carousel__indicators {
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
    }
  }

  &--vertical {
    .my-carousel__indicators {
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }

    .my-carousel__indicator {
      padding: 4px 12px;
    }

    .my-carousel__button {
      width: 3px;
      height: 30px;
    }
  }

  &--card {
    .my-carousel__item {
      transition: transform 0.4s ease-in-out;
    }
  }
}

.my-carousel__item--horizontal-enter-active,
.my-carousel__item--horizontal-leave-active {
  transition: transform 0.4s ease-in-out;
}

.my-carousel__item--horizontal-enter-from {
  transform: translateX(100%);
}

.my-carousel__item--horizontal-leave-to {
  transform: translateX(-100%);
}

.my-carousel__item--vertical-enter-active,
.my-carousel__item--vertical-leave-active {
  transition: transform 0.4s ease-in-out;
}

.my-carousel__item--vertical-enter-from {
  transform: translateY(100%);
}

.my-carousel__item--vertical-leave-to {
  transform: translateY(-100%);
}
</style> 