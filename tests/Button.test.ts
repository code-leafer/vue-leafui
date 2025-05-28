import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Button from '../src/components/Button.vue'

describe('Button.vue', () => {
  it('renders slot content', () => {
    const wrapper = mount(Button, {
      slots: {
        default: 'Click me'
      }
    })
    expect(wrapper.text()).toBe('Click me')
  })

  it('emits click event when clicked', async () => {
    const wrapper = mount(Button)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('does not emit click event when disabled', async () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('does not emit click event when loading', async () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      }
    })
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeFalsy()
  })

  it('applies correct type class', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      }
    })
    expect(wrapper.classes()).toContain('my-button--primary')
  })

  it('applies correct size class', () => {
    const wrapper = mount(Button, {
      props: {
        size: 'small'
      }
    })
    expect(wrapper.classes()).toContain('my-button--small')
  })

  it('applies disabled class when disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      }
    })
    expect(wrapper.classes()).toContain('is-disabled')
  })

  it('applies loading class when loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      }
    })
    expect(wrapper.classes()).toContain('is-loading')
  })

  it('shows loading spinner when loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      }
    })
    expect(wrapper.find('.my-button__loading').exists()).toBe(true)
  })

  it('is disabled when loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      }
    })
    expect(wrapper.attributes('disabled')).toBeDefined()
  })
}) 