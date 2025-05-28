<template>
  <div
    class="my-tabs"
    :class="[
      `my-tabs--${type}`,
      `my-tabs--${position}`
    ]"
  >
    <div class="my-tabs__header">
      <div class="my-tabs__nav-wrap">
        <div class="my-tabs__nav-scroll">
          <div class="my-tabs__nav">
            <div
              v-for="(tab, index) in tabs"
              :key="tab.name"
              class="my-tabs__item"
              :class="{
                'is-active': modelValue === tab.name,
                'is-disabled': tab.disabled,
                'is-closable': closable || tab.closable
              }"
              @click="handleTabClick(tab)"
            >
              <span class="my-tabs__item-text">{{ tab.label }}</span>
              <span
                v-if="closable || tab.closable"
                class="my-tabs__item-close"
                @click.stop="handleClose(tab, index)"
              >
                <i class="my-icon-close" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="addable"
        class="my-tabs__new-tab"
        @click="handleAdd"
      >
        <i class="my-icon-plus" />
      </div>
    </div>
    <div class="my-tabs__content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, provide, watch } from 'vue'
import type { TabPaneInstance, TabsContext } from './tabs'

defineOptions({
  name: 'MyTabs'
})

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'line'
  },
  closable: {
    type: Boolean,
    default: false
  },
  addable: {
    type: Boolean,
    default: false
  },
  editable: {
    type: Boolean,
    default: false
  },
  position: {
    type: String,
    default: 'top'
  },
  stretch: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'tab-click', 'tab-remove', 'tab-add'])

const tabs = ref<TabPaneInstance[]>([])

const registerTab = (tab: TabPaneInstance) => {
  tabs.value.push(tab)
}

const unregisterTab = (tab: TabPaneInstance) => {
  const index = tabs.value.findIndex(t => t.name === tab.name)
  if (index > -1) {
    tabs.value.splice(index, 1)
  }
}

const tabsContext: TabsContext = {
  modelValue: props.modelValue,
  registerTab,
  unregisterTab
}

provide('tabs', tabsContext)

const handleTabClick = (tab: TabPaneInstance) => {
  if (tab.disabled) return
  emit('update:modelValue', tab.name)
  emit('tab-click', tab)
}

const handleClose = (tab: TabPaneInstance, index: number) => {
  emit('tab-remove', tab, index)
}

const handleAdd = () => {
  emit('tab-add')
}

watch(() => props.modelValue, (val) => {
  emit('update:modelValue', val)
})
</script>

<style lang="scss">
.my-tabs {
  &__header {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__nav-wrap {
    position: relative;
    flex: 1;
    overflow: hidden;
  }

  &__nav-scroll {
    overflow: hidden;
  }

  &__nav {
    display: flex;
    position: relative;
    transition: transform 0.3s;
    white-space: nowrap;
  }

  &__item {
    padding: 0 20px;
    height: 40px;
    box-sizing: border-box;
    line-height: 40px;
    display: inline-block;
    list-style: none;
    font-size: var(--my-font-size-base);
    font-weight: 500;
    color: var(--my-text-color-regular);
    position: relative;
    cursor: pointer;

    &:hover {
      color: var(--my-color-primary);
    }

    &.is-active {
      color: var(--my-color-primary);
    }

    &.is-disabled {
      color: var(--my-text-color-placeholder);
      cursor: not-allowed;
    }

    &.is-closable {
      padding-right: 30px;
    }
  }

  &__item-text {
    display: inline-block;
  }

  &__item-close {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    text-align: center;
    transition: all 0.3s;
    color: var(--my-text-color-regular);

    &:hover {
      color: var(--my-color-primary);
      background-color: var(--my-color-primary-light-9);
    }
  }

  &__new-tab {
    padding: 0 10px;
    height: 40px;
    line-height: 40px;
    cursor: pointer;
    color: var(--my-text-color-regular);

    &:hover {
      color: var(--my-color-primary);
    }
  }

  &__content {
    padding: 20px 0;
  }

  &--card {
    > .my-tabs__header {
      border-bottom: 1px solid var(--my-border-color-light);
    }

    > .my-tabs__header .my-tabs__item {
      border: 1px solid var(--my-border-color-light);
      border-bottom: none;
      border-radius: 4px 4px 0 0;
      margin-right: 4px;
      background-color: var(--my-fill-color-light);

      &.is-active {
        background-color: var(--my-color-white);
        border-bottom-color: var(--my-color-white);
      }
    }
  }

  &--border-card {
    border: 1px solid var(--my-border-color-light);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);

    > .my-tabs__header {
      background-color: var(--my-fill-color-light);
      border-bottom: 1px solid var(--my-border-color-light);
      margin: 0;
    }

    > .my-tabs__header .my-tabs__item {
      border: 1px solid transparent;
      margin: -1px 0;
      color: var(--my-text-color-regular);

      &.is-active {
        color: var(--my-color-primary);
        background-color: var(--my-color-white);
        border-right-color: var(--my-border-color-light);
        border-left-color: var(--my-border-color-light);
      }

      &:hover {
        color: var(--my-color-primary);
      }
    }
  }
}
</style> 