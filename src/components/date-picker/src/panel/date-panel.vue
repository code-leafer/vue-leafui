<template>
  <div class="my-date-panel">
    <div class="my-date-panel__header">
      <div class="my-date-panel__header-left">
        <button
          class="my-date-panel__arrow-btn"
          @click="handlePrevYear"
        >
          <i class="my-icon-double-arrow-left"></i>
        </button>
        <button
          class="my-date-panel__arrow-btn"
          @click="handlePrevMonth"
        >
          <i class="my-icon-arrow-left"></i>
        </button>
      </div>
      <div class="my-date-panel__header-center">
        <span
          class="my-date-panel__header-label"
          @click="handleYearClick"
        >
          {{ currentYear }}年
        </span>
        <span
          class="my-date-panel__header-label"
          @click="handleMonthClick"
        >
          {{ currentMonth + 1 }}月
        </span>
      </div>
      <div class="my-date-panel__header-right">
        <button
          class="my-date-panel__arrow-btn"
          @click="handleNextMonth"
        >
          <i class="my-icon-arrow-right"></i>
        </button>
        <button
          class="my-date-panel__arrow-btn"
          @click="handleNextYear"
        >
          <i class="my-icon-double-arrow-right"></i>
        </button>
      </div>
    </div>
    <div class="my-date-panel__body">
      <table class="my-date-panel__table">
        <thead>
          <tr>
            <th
              v-for="day in weekDays"
              :key="day"
              class="my-date-panel__week"
            >
              {{ day }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, rowIndex) in dateRows"
            :key="rowIndex"
          >
            <td
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              :class="[
                'my-date-panel__cell',
                {
                  'is-today': cell.isToday,
                  'is-selected': cell.isSelected,
                  'is-disabled': cell.isDisabled,
                  'is-in-range': cell.isInRange,
                  'is-start': cell.isStart,
                  'is-end': cell.isEnd
                }
              ]"
              @click="handleDateClick(cell)"
            >
              <span class="my-date-panel__cell-text">{{ cell.text }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div
      v-if="shortcuts.length"
      class="my-date-panel__footer"
    >
      <button
        v-for="(shortcut, index) in shortcuts"
        :key="index"
        class="my-date-panel__shortcut"
        @click="handleShortcutClick(shortcut)"
      >
        {{ shortcut.text }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { datePanelProps, datePanelEmits } from './date-panel'
import dayjs from 'dayjs'

defineOptions({
  name: 'MyDatePanel'
})

const props = defineProps(datePanelProps)
const emit = defineEmits(datePanelEmits)

const currentDate = ref(dayjs())
const currentYear = computed(() => currentDate.value.year())
const currentMonth = computed(() => currentDate.value.month())

const weekDays = computed(() => {
  const days = ['日', '一', '二', '三', '四', '五', '六']
  const firstDay = props.firstDayOfWeek
  return [...days.slice(firstDay), ...days.slice(0, firstDay)]
})

const dateRows = computed(() => {
  const rows: any[] = []
  const firstDay = dayjs(currentDate.value).startOf('month')
  const lastDay = dayjs(currentDate.value).endOf('month')
  const firstDayWeek = firstDay.day()
  const lastDayWeek = lastDay.day()
  const firstDayOffset = (firstDayWeek - props.firstDayOfWeek + 7) % 7
  const lastDayOffset = (props.firstDayOfWeek - lastDayWeek - 1 + 7) % 7
  const startDate = firstDay.subtract(firstDayOffset, 'day')
  const endDate = lastDay.add(lastDayOffset, 'day')
  const today = dayjs()

  let currentRow: any[] = []
  let currentDate = startDate

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    const isToday = currentDate.isSame(today, 'day')
    const isSelected = isDateSelected(currentDate)
    const isDisabled = props.disabledDate(currentDate.toDate())
    const isInRange = isDateInRange(currentDate)
    const isStart = isDateStart(currentDate)
    const isEnd = isDateEnd(currentDate)

    currentRow.push({
      date: currentDate,
      text: currentDate.date(),
      isToday,
      isSelected,
      isDisabled,
      isInRange,
      isStart,
      isEnd
    })

    if (currentRow.length === 7) {
      rows.push(currentRow)
      currentRow = []
    }

    currentDate = currentDate.add(1, 'day')
  }

  return rows
})

const isDateSelected = (date: dayjs.Dayjs) => {
  if (Array.isArray(props.modelValue)) {
    return props.modelValue.some(value => dayjs(value).isSame(date, 'day'))
  }
  return dayjs(props.modelValue).isSame(date, 'day')
}

const isDateInRange = (date: dayjs.Dayjs) => {
  if (!Array.isArray(props.modelValue) || props.modelValue.length !== 2) return false
  const [start, end] = props.modelValue
  return date.isAfter(start) && date.isBefore(end)
}

const isDateStart = (date: dayjs.Dayjs) => {
  if (!Array.isArray(props.modelValue) || !props.modelValue[0]) return false
  return dayjs(props.modelValue[0]).isSame(date, 'day')
}

const isDateEnd = (date: dayjs.Dayjs) => {
  if (!Array.isArray(props.modelValue) || !props.modelValue[1]) return false
  return dayjs(props.modelValue[1]).isSame(date, 'day')
}

const handlePrevYear = () => {
  currentDate.value = currentDate.value.subtract(1, 'year')
  emit('panel-change', currentDate.value.toDate(), 'year')
}

const handlePrevMonth = () => {
  currentDate.value = currentDate.value.subtract(1, 'month')
  emit('panel-change', currentDate.value.toDate(), 'month')
}

const handleNextMonth = () => {
  currentDate.value = currentDate.value.add(1, 'month')
  emit('panel-change', currentDate.value.toDate(), 'month')
}

const handleNextYear = () => {
  currentDate.value = currentDate.value.add(1, 'year')
  emit('panel-change', currentDate.value.toDate(), 'year')
}

const handleYearClick = () => {
  // TODO: 切换到年份选择面板
}

const handleMonthClick = () => {
  // TODO: 切换到月份选择面板
}

const handleDateClick = (cell: any) => {
  if (cell.isDisabled) return
  emit('update:modelValue', cell.date.toDate())
  emit('change', cell.date.toDate())
}

const handleShortcutClick = (shortcut: { text: string; value: Date | (() => Date) }) => {
  const value = typeof shortcut.value === 'function' ? shortcut.value() : shortcut.value
  emit('update:modelValue', value)
  emit('change', value)
}
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-date-panel {
  width: 280px;
  background-color: #fff;
  border: 1px solid $border-color-base;
  border-radius: $border-radius-base;
  box-shadow: $box-shadow-light;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 12px;
    border-bottom: 1px solid $border-color-base;
  }

  &__header-left,
  &__header-right {
    display: flex;
    align-items: center;
  }

  &__header-center {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  &__header-label {
    font-size: $font-size-base;
    color: $text-regular;
    cursor: pointer;

    &:hover {
      color: $primary-color;
    }
  }

  &__arrow-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    padding: 0;
    border: none;
    background: none;
    color: $text-regular;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: $primary-color;
    }
  }

  &__body {
    padding: 12px;
  }

  &__table {
    width: 100%;
    border-collapse: collapse;
  }

  &__week {
    padding: 8px 0;
    font-size: $font-size-small;
    color: $text-secondary;
    text-align: center;
  }

  &__cell {
    padding: 4px 0;
    text-align: center;
    cursor: pointer;

    &.is-today {
      color: $primary-color;
      font-weight: $font-weight-bold;
    }

    &.is-selected {
      color: #fff;
      background-color: $primary-color;
      border-radius: $border-radius-base;
    }

    &.is-disabled {
      color: $text-disabled;
      cursor: not-allowed;
    }

    &.is-in-range {
      background-color: rgba($primary-color, 0.1);
    }

    &.is-start,
    &.is-end {
      color: #fff;
      background-color: $primary-color;
      border-radius: $border-radius-base;
    }
  }

  &__cell-text {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    font-size: $font-size-base;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    padding: 8px 12px;
    border-top: 1px solid $border-color-base;
  }

  &__shortcut {
    padding: 4px 8px;
    border: none;
    background: none;
    font-size: $font-size-small;
    color: $primary-color;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      color: $primary-color-hover;
    }
  }
}
</style> 