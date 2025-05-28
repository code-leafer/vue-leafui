import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './styles/index.scss'
import './styles/custom.scss'
import './styles/util.css'
import DemoBlock from './components/DemoBlock.vue'
import { h, ref } from 'vue'

// 使用直接导入with-install文件，而不是从utils索引导入
import { withInstall } from '../utils/with-install.js'

// 创建模拟组件，用于文档示例
const mockComponents = {
  MyButton: withInstall({
    name: 'MyButton',
    render() {
      return h('button', { 
        class: ['my-button', `my-button--${this.$attrs.type || 'default'}`, {
          'is-disabled': this.$attrs.disabled,
          'is-plain': this.$attrs.plain,
          'is-round': this.$attrs.round,
          'is-circle': this.$attrs.circle,
          [`my-button--${this.$attrs.size}`]: this.$attrs.size
        }],
        onClick: (e) => {
          if (!this.$attrs.disabled) {
            this.$emit('click', e)
          }
        }
      }, this.$slots.default?.())
    }
  }),
  MyInput: withInstall({
    name: 'MyInput',
    render() {
      const model = ref('')
      return h('div', { 
        class: ['my-input', {
          'is-disabled': this.$attrs.disabled,
          [`my-input--${this.$attrs.size}`]: this.$attrs.size
        }] 
      }, [
        this.$slots.prefix && h('span', { class: 'my-input__prefix' }, this.$slots.prefix()),
        h('input', { 
          class: 'my-input__inner',
          type: this.$attrs.type || 'text',
          placeholder: this.$attrs.placeholder,
          disabled: this.$attrs.disabled,
          value: model.value,
          onInput: (e) => {
            const target = e.target as HTMLInputElement
            if (target) {
              model.value = target.value
              this.$emit('update:modelValue', target.value)
            }
          }
        }),
        this.$attrs.clearable && model.value && h('span', { 
          class: 'my-input__clear',
          onClick: () => {
            model.value = ''
            this.$emit('update:modelValue', '')
            this.$emit('clear')
          }
        }, '×'),
        this.$slots.suffix && h('span', { class: 'my-input__suffix' }, this.$slots.suffix())
      ])
    }
  }),
  MyIcon: withInstall({
    name: 'MyIcon',
    render() {
      return h('i', { 
        class: ['my-icon', `my-icon-${this.$attrs.name || 'default'}`],
        style: {
          color: this.$attrs.color,
          fontSize: this.$attrs.size
        },
        onClick: (e) => this.$emit('click', e)
      })
    }
  }),
  MySwitch: withInstall({
    name: 'MySwitch',
    render() {
      const model = ref(this.$attrs.modelValue || false)
      return h('div', { 
        class: ['my-switch', {
          'is-checked': model.value,
          'is-disabled': this.$attrs.disabled
        }],
        style: {
          backgroundColor: model.value 
            ? this.$attrs.activeColor || '#409EFF' 
            : this.$attrs.inactiveColor || '#C0CCDA'
        },
        onClick: () => {
          if (this.$attrs.disabled) return
          model.value = !model.value
          this.$emit('update:modelValue', model.value)
          this.$emit('change', model.value)
        }
      }, [
        h('span', { class: 'my-switch__label my-switch__label--left' }, 
          this.$attrs.activeText && !model.value ? this.$attrs.activeText : null
        ),
        h('span', { class: 'my-switch__core' }),
        h('span', { class: 'my-switch__label my-switch__label--right' }, 
          this.$attrs.inactiveText && model.value ? this.$attrs.inactiveText : null
        )
      ])
    }
  })
}

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 注册文档演示组件
    app.component('DemoBlock', DemoBlock)
    
    // 注册模拟组件
    for (const [name, component] of Object.entries(mockComponents)) {
      app.component(name, component)
    }
    
    // 注册全局变量
    app.config.globalProperties.$MYUI = {
      version: '1.0.0'
    }
    
    // 不再尝试加载实际组件，完全使用模拟组件
    console.log('Using mock components for documentation')
  }
} as Theme 