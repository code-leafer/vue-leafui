<template>
  <form
    :class="[
      'my-form',
      `my-form--${labelPosition}`,
      {
        'my-form--inline': inline
      }
    ]"
    @submit.prevent
  >
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
import { provide, reactive, toRefs } from 'vue'
import { formProps, formEmits, FormInstance } from './form'

defineOptions({
  name: 'MyForm'
})

const props = defineProps(formProps)
const emit = defineEmits(formEmits)

const formState = reactive({
  fields: [] as any[],
  model: props.model,
  rules: props.rules,
  labelPosition: props.labelPosition,
  labelWidth: props.labelWidth,
  labelSuffix: props.labelSuffix,
  inline: props.inline,
  size: props.size,
  disabled: props.disabled,
  validateOnRuleChange: props.validateOnRuleChange,
  hideRequiredAsterisk: props.hideRequiredAsterisk,
  showMessage: props.showMessage,
  scrollToError: props.scrollToError
})

const { model, rules } = toRefs(formState)

const addField = (field: any) => {
  formState.fields.push(field)
}

const removeField = (field: any) => {
  const index = formState.fields.indexOf(field)
  if (index !== -1) {
    formState.fields.splice(index, 1)
  }
}

const resetFields = () => {
  formState.fields.forEach(field => {
    field.resetField()
  })
}

const clearValidate = (props?: string | string[]) => {
  formState.fields.forEach(field => {
    field.clearValidate(props)
  })
}

const validate = async (callback?: (isValid: boolean, invalidFields?: Record<string, any>) => void) => {
  const promises = formState.fields.map(field => field.validate())
  const results = await Promise.all(promises)
  const isValid = results.every(result => result)
  const invalidFields = formState.fields.reduce((fields, field) => {
    if (field.validateState === 'error') {
      fields[field.prop] = field.validateMessage
    }
    return fields
  }, {} as Record<string, any>)

  if (callback) {
    callback(isValid, invalidFields)
  }

  return isValid
}

const validateField = async (props?: string | string[], callback?: (isValid: boolean, invalidFields?: Record<string, any>) => void) => {
  const fields = formState.fields.filter(field => {
    if (typeof props === 'string') {
      return field.prop === props
    }
    if (Array.isArray(props)) {
      return props.includes(field.prop)
    }
    return true
  })

  const promises = fields.map(field => field.validate())
  const results = await Promise.all(promises)
  const isValid = results.every(result => result)
  const invalidFields = fields.reduce((fields, field) => {
    if (field.validateState === 'error') {
      fields[field.prop] = field.validateMessage
    }
    return fields
  }, {} as Record<string, any>)

  if (callback) {
    callback(isValid, invalidFields)
  }
}

const scrollToField = (prop: string) => {
  const field = formState.fields.find(field => field.prop === prop)
  if (field) {
    field.$el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

const formInstance: FormInstance = {
  validate,
  validateField,
  resetFields,
  clearValidate,
  scrollToField
}

provide('form', formState)
provide('formInstance', formInstance)

defineExpose(formInstance)
</script>

<style lang="scss">
@import '@styles/mixins.scss';

.my-form {
  &--inline {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &--left {
    .my-form-item__label {
      text-align: left;
    }
  }

  &--right {
    .my-form-item__label {
      text-align: right;
    }
  }

  &--top {
    .my-form-item__label {
      display: block;
      text-align: left;
      padding: 0 0 8px;
    }
  }
}
</style> 