<template>
  <div
    :class="[
      'my-form-item',
      {
        'is-error': validateState === 'error',
        'is-validating': validateState === 'validating',
        'is-success': validateState === 'success',
        'is-required': isRequired,
        'is-no-asterisk': hideRequiredAsterisk
      }
    ]"
  >
    <label
      v-if="label || $slots.label"
      :class="['my-form-item__label']"
      :style="labelStyle"
      :for="for"
    >
      <slot name="label">{{ label }}</slot>
      <span
        v-if="isRequired && !hideRequiredAsterisk"
        class="my-form-item__required"
      >*</span>
    </label>
    <div :class="['my-form-item__content']">
      <slot></slot>
      <div
        v-if="validateState === 'error' && showMessage"
        :class="['my-form-item__error']"
      >
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { formItemProps, formItemEmits, FormItemInstance } from './form-item'
import { FormItemValidateState } from './form-item'
import { getPropByPath } from '../../utils/util'
import { validate } from '../../utils/validate'

defineOptions({
  name: 'MyFormItem'
})

const props = defineProps(formItemProps)
const emit = defineEmits(formItemEmits)

const form = inject('form', {})
const formInstance = inject('formInstance', null)

const validateState = ref<FormItemValidateState>('')
const validateMessage = ref('')
const validateDisabled = ref(false)

const labelStyle = computed(() => {
  const { labelPosition, labelWidth } = form as any
  if (labelPosition === 'top') return {}
  return {
    width: props.labelWidth || labelWidth
  }
})

const isRequired = computed(() => {
  const rules = props.rules || (form as any).rules?.[props.prop]
  if (rules) {
    if (Array.isArray(rules)) {
      return rules.some(rule => rule.required)
    }
    return rules.required
  }
  return false
})

const hideRequiredAsterisk = computed(() => {
  return (form as any).hideRequiredAsterisk
})

const showMessage = computed(() => {
  return props.showMessage !== false && (form as any).showMessage !== false
})

const getRules = () => {
  const formRules = (form as any).rules
  const selfRules = props.rules

  const prop = getPropByPath(formRules, props.prop || '')
  const formItemRules = prop ? prop.o[props.prop || ''] : null

  return [].concat(selfRules || formItemRules || [])
}

const getFilteredRule = (trigger: string) => {
  const rules = getRules()
  return rules.filter(rule => {
    if (!rule.trigger || trigger === '') return true
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.indexOf(trigger) > -1
    }
    return rule.trigger === trigger
  })
}

const validate = async (trigger = '', callback?: (isValid: boolean, invalidFields?: Record<string, any>) => void) => {
  if (validateDisabled.value) return true

  const rules = getFilteredRule(trigger)
  if (!rules || rules.length === 0) {
    callback?.(true)
    return true
  }

  validateState.value = 'validating'

  const descriptor: Record<string, any> = {}
  if (props.prop) {
    descriptor[props.prop] = rules
  }

  const model: Record<string, any> = {}
  if (props.prop) {
    model[props.prop] = (form as any).model[props.prop]
  }

  try {
    await validate(model, descriptor)
    validateState.value = 'success'
    validateMessage.value = ''
    callback?.(true)
    return true
  } catch (errors) {
    validateState.value = 'error'
    validateMessage.value = errors[0].message
    callback?.(false, errors)
    return false
  }
}

const resetField = () => {
  validateState.value = ''
  validateMessage.value = ''

  const model = (form as any).model
  const prop = props.prop
  if (prop && model) {
    const path = prop.split('.')
    let obj = model
    for (let i = 0; i < path.length - 1; i++) {
      obj = obj[path[i]]
    }
    obj[path[path.length - 1]] = props.initialValue
  }
}

const clearValidate = () => {
  validateState.value = ''
  validateMessage.value = ''
}

const formItemInstance: FormItemInstance = {
  validate,
  resetField,
  clearValidate
}

onMounted(() => {
  if (props.prop) {
    formInstance?.addField(formItemInstance)
  }
})

onUnmounted(() => {
  if (props.prop) {
    formInstance?.removeField(formItemInstance)
  }
})

watch(
  () => props.error,
  (val) => {
    validateMessage.value = val
    validateState.value = val ? 'error' : ''
  }
)

watch(
  () => props.validateStatus,
  (val) => {
    validateState.value = val
  }
)

defineExpose(formItemInstance)
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-form-item {
  margin-bottom: 22px;

  &__label {
    display: inline-block;
    padding-right: 12px;
    font-size: $font-size-base;
    color: $text-regular;
    line-height: 32px;
    text-align: right;
    vertical-align: middle;
  }

  &__required {
    color: $danger-color;
    margin-right: 4px;
  }

  &__content {
    display: inline-block;
    position: relative;
    vertical-align: middle;
  }

  &__error {
    position: absolute;
    top: 100%;
    left: 0;
    padding-top: 4px;
    font-size: $font-size-small;
    color: $danger-color;
    line-height: 1;
  }

  &.is-error {
    .my-input__inner,
    .my-textarea__inner {
      border-color: $danger-color;
    }
  }

  &.is-validating {
    .my-input__inner,
    .my-textarea__inner {
      border-color: $warning-color;
    }
  }

  &.is-success {
    .my-input__inner,
    .my-textarea__inner {
      border-color: $success-color;
    }
  }

  &.is-required {
    .my-form-item__label {
      &::before {
        content: '*';
        color: $danger-color;
        margin-right: 4px;
      }
    }
  }

  &.is-no-asterisk {
    .my-form-item__label {
      &::before {
        display: none;
      }
    }
  }
}
</style> 