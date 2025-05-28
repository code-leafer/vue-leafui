<template>
  <div
    ref="dividerRef"
    :class="[
      'my-divider',
      `my-divider--${direction}`,
      `my-divider--${position}`,
      {
        'is-dashed': dashed,
        'is-hairline': hairline
      }
    ]"
    @click="handleClick"
  >
    <div v-if="$slots.default && direction === 'horizontal'" class="my-divider__text">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { dividerProps, dividerEmits } from './divider'

defineOptions({
  name: 'MyDivider'
})

const props = defineProps(dividerProps)
const emit = defineEmits(dividerEmits)

const dividerRef = ref<HTMLElement>()

const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-divider {
  position: relative;
  background-color: $border-color-base;
  @include transition(background-color);

  &--horizontal {
    display: block;
    height: 1px;
    margin: 24px 0;
    width: 100%;

    &.is-hairline {
      height: 1px;
      transform: scaleY(0.5);
    }

    &.is-dashed {
      background: none;
      border-top: 1px dashed $border-color-base;
    }
  }

  &--vertical {
    display: inline-block;
    width: 1px;
    height: 1em;
    margin: 0 8px;
    vertical-align: middle;

    &.is-hairline {
      width: 1px;
      transform: scaleX(0.5);
    }

    &.is-dashed {
      background: none;
      border-left: 1px dashed $border-color-base;
    }
  }

  &__text {
    position: absolute;
    background-color: #fff;
    padding: 0 12px;
    font-size: $font-size-base;
    color: $text-regular;
    transform: translateY(-50%);

    .my-divider--left & {
      left: 20px;
    }

    .my-divider--center & {
      left: 50%;
      transform: translateX(-50%) translateY(-50%);
    }

    .my-divider--right & {
      right: 20px;
    }
  }
}
</style> 