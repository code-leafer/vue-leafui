<template>
  <div
    v-if="!hideOnSinglePage || total > pageSize"
    :class="[
      'my-pagination',
      {
        'is-background': background,
        'is-disabled': disabled
      }
    ]"
  >
    <span
      v-if="layout.includes('total')"
      class="my-pagination__total"
    >
      共 {{ total }} 条
    </span>

    <span
      v-if="layout.includes('sizes')"
      class="my-pagination__sizes"
    >
      <select
        v-model="innerPageSize"
        :disabled="disabled"
        @change="handleSizeChange"
      >
        <option
          v-for="size in pageSizes"
          :key="size"
          :value="size"
        >
          {{ size }} 条/页
        </option>
      </select>
    </span>

    <button
      v-if="layout.includes('prev')"
      :class="[
        'my-pagination__btn',
        'my-pagination__prev',
        {
          'is-disabled': disabled || currentPage === 1
        }
      ]"
      :disabled="disabled || currentPage === 1"
      @click="handlePrev"
    >
      <my-icon name="my-icon-arrow-left" />
    </button>

    <ul
      v-if="layout.includes('pager')"
      class="my-pagination__pager"
    >
      <li
        v-for="page in pager"
        :key="page"
        :class="[
          'my-pagination__number',
          {
            'is-active': page === currentPage,
            'is-disabled': disabled
          }
        ]"
        @click="handlePageClick(page)"
      >
        {{ page }}
      </li>
    </ul>

    <button
      v-if="layout.includes('next')"
      :class="[
        'my-pagination__btn',
        'my-pagination__next',
        {
          'is-disabled': disabled || currentPage === totalPages
        }
      ]"
      :disabled="disabled || currentPage === totalPages"
      @click="handleNext"
    >
      <my-icon name="my-icon-arrow-right" />
    </button>

    <span
      v-if="layout.includes('jumper')"
      class="my-pagination__jumper"
    >
      前往
      <input
        v-model.number="jumperValue"
        type="number"
        :disabled="disabled"
        @keyup.enter="handleJumper"
      >
      页
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { paginationProps } from './pagination'
import MyIcon from '@utils/icon'

defineOptions({
  name: 'MyPagination'
})

const props = defineProps(paginationProps)
const emit = defineEmits(['update:currentPage', 'update:pageSize', 'change'])

const innerPageSize = ref(props.pageSize)
const jumperValue = ref(props.currentPage)

const totalPages = computed(() => Math.ceil(props.total / innerPageSize.value))

const pager = computed(() => {
  const pages: number[] = []
  const pagerCount = 7
  const halfPagerCount = (pagerCount - 1) / 2

  let start = Math.max(1, props.currentPage - halfPagerCount)
  let end = Math.min(totalPages.value, start + pagerCount - 1)

  if (end - start + 1 < pagerCount) {
    start = Math.max(1, end - pagerCount + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const handleSizeChange = () => {
  emit('update:pageSize', innerPageSize.value)
  emit('change', {
    currentPage: props.currentPage,
    pageSize: innerPageSize.value
  })
}

const handlePrev = () => {
  if (props.disabled || props.currentPage === 1) return
  handlePageClick(props.currentPage - 1)
}

const handleNext = () => {
  if (props.disabled || props.currentPage === totalPages.value) return
  handlePageClick(props.currentPage + 1)
}

const handlePageClick = (page: number) => {
  if (props.disabled) return
  emit('update:currentPage', page)
  emit('change', {
    currentPage: page,
    pageSize: innerPageSize.value
  })
}

const handleJumper = () => {
  if (props.disabled) return
  const page = Math.max(1, Math.min(totalPages.value, jumperValue.value))
  handlePageClick(page)
}

watch(
  () => props.currentPage,
  (val) => {
    jumperValue.value = val
  }
)

watch(
  () => props.pageSize,
  (val) => {
    innerPageSize.value = val
  }
)
</script>

<style lang="scss">
.my-pagination {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  font-size: 14px;
  white-space: nowrap;
  user-select: none;

  &.is-background {
    .my-pagination__number {
      background-color: var(--my-color-primary-light-9);
      color: var(--my-text-color-regular);

      &:hover {
        color: var(--my-color-primary);
      }

      &.is-active {
        background-color: var(--my-color-primary);
        color: var(--my-color-white);
      }
    }
  }

  &.is-disabled {
    .my-pagination__number,
    .my-pagination__btn,
    .my-pagination__sizes select,
    .my-pagination__jumper input {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &__total {
    margin-right: 16px;
  }

  &__sizes {
    margin-right: 16px;

    select {
      padding: 0 8px;
      height: 32px;
      border: 1px solid var(--my-border-color);
      border-radius: var(--my-border-radius-base);
      background-color: var(--my-color-white);
      color: var(--my-text-color-regular);
      cursor: pointer;
      outline: none;

      &:hover {
        border-color: var(--my-color-primary);
      }
    }
  }

  &__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 4px;
    margin: 0 4px;
    border: 1px solid var(--my-border-color);
    border-radius: var(--my-border-radius-base);
    background-color: var(--my-color-white);
    color: var(--my-text-color-regular);
    cursor: pointer;
    outline: none;

    &:hover {
      color: var(--my-color-primary);
      border-color: var(--my-color-primary);
    }

    &.is-disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  &__pager {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  &__number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    height: 32px;
    padding: 0 4px;
    margin: 0 4px;
    border: 1px solid var(--my-border-color);
    border-radius: var(--my-border-radius-base);
    background-color: var(--my-color-white);
    color: var(--my-text-color-regular);
    cursor: pointer;
    outline: none;

    &:hover {
      color: var(--my-color-primary);
      border-color: var(--my-color-primary);
    }

    &.is-active {
      color: var(--my-color-primary);
      border-color: var(--my-color-primary);
    }
  }

  &__jumper {
    margin-left: 16px;

    input {
      width: 50px;
      height: 32px;
      margin: 0 8px;
      padding: 0 4px;
      border: 1px solid var(--my-border-color);
      border-radius: var(--my-border-radius-base);
      text-align: center;
      outline: none;

      &:hover {
        border-color: var(--my-color-primary);
      }
    }
  }
}
</style> 