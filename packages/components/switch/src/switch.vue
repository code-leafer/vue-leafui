<template>
  <div
    :class="[
      'my-switch',
      `my-switch--${size}`,
      {
        'is-disabled': disabled,
        'is-checked': isChecked,
        'is-loading': loading
      }
    ]"
    :style="switchStyle"
    @click="handleClick"
  >
    <input
      ref="input"
      type="checkbox"
      :class="['my-switch__input']"
      :name="name"
      :disabled="disabled"
      :value="modelValue"
      :checked="isChecked"
    />
    <span
      v-if="activeText || inactiveText"
      :class="['my-switch__label', 'my-switch__label--left']"
      v-show="!isChecked"
    >
      {{ inactiveText }}
    </span>
    <span class="my-switch__core" :style="coreStyle">
      <div v-if="loading" class="my-switch__loading">
        <i class="my-icon-loading"></i>
      </div>
    </span>
    <span
      v-if="activeText || inactiveText"
      :class="['my-switch__label', 'my-switch__label--right']"
      v-show="isChecked"
    >
      {{ activeText }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { switchProps, switchEmits } from './switch'

defineOptions({
  name: 'MySwitch'
})

const props = defineProps(switchProps)
const emit = defineEmits(switchEmits)

const input = ref<HTMLInputElement>()

const isChecked = computed(() => {
  return props.modelValue === props.activeValue
})

const switchStyle = computed(() => {
  return {
    width: props.width ? `${props.width}px` : ''
  }
})

const coreStyle = computed(() => {
  return {
    backgroundColor: isChecked.value ? props.activeColor : props.inactiveColor
  }
})

const handleClick = () => {
  if (props.disabled || props.loading) return
  const newValue = isChecked.value ? props.inactiveValue : props.activeValue
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
</script> 