<template>
  <div
    :class="[
      'my-collapse-item',
      {
        'is-active': isActive,
        'is-disabled': disabled
      }
    ]"
  >
    <div
      class="my-collapse-item__header"
      @click="handleClick"
    >
      <slot name="title">{{ title }}</slot>
      <i
        :class="[
          'my-collapse-item__arrow',
          {
            'is-active': isActive
          }
        ]"
      />
    </div>
    <transition name="my-collapse-transition">
      <div
        v-show="isActive"
        class="my-collapse-item__wrap"
      >
        <div class="my-collapse-item__content">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue'
import { collapseItemProps } from './collapse'

defineOptions({
  name: 'MyCollapseItem'
})

const props = defineProps(collapseItemProps)

const collapse = inject('collapse', {
  activeNames: [],
  handleItemClick: () => {}
})

const isActive = computed(() => {
  const activeNames = collapse.activeNames
  if (Array.isArray(activeNames)) {
    return activeNames.includes(props.name)
  }
  return activeNames === props.name
})

const handleClick = () => {
  if (props.disabled) return
  collapse.handleItemClick(props.name)
}
</script>

<style lang="scss">
.my-collapse-item {
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding: 0 16px;
    font-size: 14px;
    color: var(--my-text-color-primary);
    cursor: pointer;
    transition: all 0.3s;
    border-bottom: 1px solid var(--my-border-color-light);

    &:hover {
      background-color: var(--my-fill-color-light);
    }
  }

  &__arrow {
    font-size: 12px;
    transition: transform 0.3s;
    transform: rotate(0deg);

    &.is-active {
      transform: rotate(90deg);
    }
  }

  &__wrap {
    overflow: hidden;
    background-color: var(--my-fill-color-blank);
  }

  &__content {
    padding: 16px;
    font-size: 14px;
    color: var(--my-text-color-regular);
    line-height: 1.5;
  }

  &.is-disabled {
    .my-collapse-item__header {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &:last-child {
    .my-collapse-item__header {
      border-bottom: none;
    }
  }
}

.my-collapse-transition-enter-active,
.my-collapse-transition-leave-active {
  transition: all 0.3s;
}

.my-collapse-transition-enter-from,
.my-collapse-transition-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style> 