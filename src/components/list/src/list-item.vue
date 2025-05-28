<template>
  <div
    :class="[
      'my-list-item',
      {
        'is-disabled': disabled
      }
    ]"
  >
    <div
      v-if="avatar"
      class="my-list-item__avatar"
    >
      <img
        :src="avatar"
        :alt="title"
      >
    </div>
    <div class="my-list-item__content">
      <div class="my-list-item__title">
        <slot>{{ title }}</slot>
      </div>
      <div
        v-if="description"
        class="my-list-item__description"
      >
        <slot name="description">{{ description }}</slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import { listItemProps } from './list'

defineOptions({
  name: 'MyListItem'
})

const props = defineProps(listItemProps)

const list = inject('list', {
  loading: false,
  finished: false,
  error: false
})
</script>

<style lang="scss">
.my-list-item {
  display: flex;
  align-items: flex-start;
  padding: 12px 16px;
  background-color: var(--my-fill-color-blank);
  transition: all 0.3s;

  &:hover {
    background-color: var(--my-fill-color-light);
  }

  &.is-disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  &__avatar {
    margin-right: 16px;
    flex-shrink: 0;

    img {
      width: 40px;
      height: 40px;
      border-radius: var(--my-border-radius-base);
      object-fit: cover;
    }
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: var(--my-font-size-base);
    color: var(--my-text-color-primary);
    line-height: 1.5;
  }

  &__description {
    margin-top: 4px;
    font-size: var(--my-font-size-small);
    color: var(--my-text-color-secondary);
    line-height: 1.5;
  }
}
</style> 