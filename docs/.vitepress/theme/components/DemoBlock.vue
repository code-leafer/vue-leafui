<template>
  <div class="demo-block">
    <div class="example">
      <slot></slot>
    </div>
    <div class="description" v-if="$slots.description">
      <slot name="description"></slot>
    </div>
    <div class="demo-block-code" v-if="isExpanded">
      <slot name="highlight"></slot>
    </div>
    <div class="demo-block-control" @click="toggleCode">
      <span>{{ isExpanded ? '收起代码' : '显示代码' }}</span>
      <div class="control-icon" :class="{ expanded: isExpanded }">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16">
          <path d="M512 704L128 320h768z" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isExpanded = ref(false)

const toggleCode = () => {
  isExpanded.value = !isExpanded.value
}
</script>

<style scoped>
.demo-block {
  margin: 24px 0;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
}

.example {
  padding: 24px;
  background-color: var(--vp-c-bg);
  border-bottom: 1px solid var(--vp-c-divider);
}

.description {
  padding: 16px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  border-bottom: 1px solid var(--vp-c-divider);
}

.demo-block-code {
  background-color: var(--vp-c-bg-soft);
}

.demo-block-control {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 10px;
  font-size: 14px;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: all 0.3s;
}

.demo-block-control:hover {
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft-up);
}

.control-icon {
  margin-left: 8px;
  transform: rotate(0);
  transition: 0.2s;
}

.control-icon.expanded {
  transform: rotate(180deg);
}
</style> 