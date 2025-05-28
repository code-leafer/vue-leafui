<template>
  <div
    :class="[
      'my-progress',
      `my-progress--${type}`,
      status ? `is-${status}` : '',
      {
        'my-progress--without-text': !showText,
        'my-progress--text-inside': textInside
      }
    ]"
    role="progressbar"
    :aria-valuenow="percentage"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <template v-if="type === 'line'">
      <div class="my-progress-bar">
        <div class="my-progress-bar__outer" :style="{ height: `${strokeWidth}px` }">
          <div
            class="my-progress-bar__inner"
            :style="barStyle"
          >
            <div v-if="showText && textInside" class="my-progress-bar__innerText">
              {{ format(percentage) }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="showText && !textInside" class="my-progress__text" :style="{ fontSize: `${strokeWidth}px` }">
        {{ format(percentage) }}
      </div>
    </template>

    <template v-else>
      <div class="my-progress-circle" :style="{ height: `${width}px`, width: `${width}px` }">
        <svg viewBox="0 0 100 100">
          <path
            class="my-progress-circle__track"
            :d="trackPath"
            fill="none"
            :stroke-width="relativeStrokeWidth"
          />
          <path
            class="my-progress-circle__path"
            :d="trackPath"
            fill="none"
            :stroke="stroke"
            :stroke-width="relativeStrokeWidth"
            :style="circlePathStyle"
          />
        </svg>
      </div>
      <div v-if="showText" class="my-progress__text" :style="{ fontSize: `${width * 0.111111111}px` }">
        {{ format(percentage) }}
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { progressProps } from './progress'

defineOptions({
  name: 'MyProgress'
})

const props = defineProps(progressProps)

const relativeStrokeWidth = computed(() => {
  return (props.strokeWidth / props.width * 100).toFixed(1)
})

const radius = computed(() => {
  if (props.type === 'circle' || props.type === 'dashboard') {
    return parseInt(String(50 - parseFloat(relativeStrokeWidth.value) / 2), 10)
  }
  return 0
})

const trackPath = computed(() => {
  const r = radius.value
  const isDashboard = props.type === 'dashboard'
  return `
    M 50 50
    m 0 ${isDashboard ? '' : '-'}${r}
    a ${r} ${r} 0 1 1 0 ${isDashboard ? '-' : ''}${r * 2}
    a ${r} ${r} 0 1 1 0 ${isDashboard ? '' : '-'}${r * 2}
  `
})

const perimeter = computed(() => {
  return 2 * Math.PI * radius.value
})

const rate = computed(() => {
  return props.type === 'dashboard' ? 0.75 : 1
})

const strokeDashoffset = computed(() => {
  const offset = -1 * perimeter.value * (1 - rate.value)
  return `${offset}px`
})

const circlePathStyle = computed(() => {
  return {
    strokeDasharray: `${perimeter.value * rate.value * props.percentage / 100}px, ${perimeter.value}px`,
    strokeDashoffset: strokeDashoffset.value,
    transition: 'stroke-dasharray 0.6s ease 0s, stroke 0.6s ease'
  }
})

const stroke = computed(() => {
  let ret: string
  if (typeof props.color === 'function') {
    ret = props.color(props.percentage)
  } else if (typeof props.color === 'string') {
    ret = props.color
  } else {
    ret = getLevelColor(props.percentage)
  }
  return ret
})

const barStyle = computed(() => {
  const style: Record<string, string> = {
    width: `${props.percentage}%`,
    backgroundColor: stroke.value
  }
  return style
})

const getLevelColor = (percentage: number) => {
  const colorArray = props.color as string[]
  const span = 100 / colorArray.length
  const index = Math.floor(percentage / span)
  return colorArray[index]
}
</script>

<style lang="scss">
.my-progress {
  position: relative;
  line-height: 1;

  &--line {
    display: flex;
    align-items: center;
    width: 100%;
    margin-right: 0;
    padding-right: 0;
  }

  &--circle,
  &--dashboard {
    display: inline-block;
  }

  &--without-text {
    .my-progress__text {
      display: none;
    }
  }

  &--text-inside {
    .my-progress-bar__inner {
      padding-right: 0;
      margin-right: 0;
      text-align: right;
    }
  }

  &__text {
    font-size: 14px;
    color: #606266;
    display: inline-block;
    vertical-align: middle;
    margin-left: 10px;
    line-height: 1;
  }

  &.is-success {
    .my-progress-bar__inner {
      background-color: #67c23a;
    }
    .my-progress__text {
      color: #67c23a;
    }
  }

  &.is-warning {
    .my-progress-bar__inner {
      background-color: #e6a23c;
    }
    .my-progress__text {
      color: #e6a23c;
    }
  }

  &.is-exception {
    .my-progress-bar__inner {
      background-color: #f56c6c;
    }
    .my-progress__text {
      color: #f56c6c;
    }
  }
}

.my-progress-bar {
  flex-grow: 1;
  box-sizing: border-box;

  &__outer {
    position: relative;
    vertical-align: middle;
    background-color: #ebeef5;
    border-radius: 100px;
    overflow: hidden;
  }

  &__inner {
    position: relative;
    left: 0;
    top: 0;
    height: 100%;
    background-color: #409eff;
    border-radius: 100px;
    line-height: 1;
    white-space: nowrap;
    transition: width 0.6s ease;

    &Text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      font-size: 12px;
    }
  }
}

.my-progress-circle {
  position: relative;

  &__track {
    stroke: #ebeef5;
  }

  &__path {
    stroke: #409eff;
    stroke-linecap: round;
  }
}
</style> 