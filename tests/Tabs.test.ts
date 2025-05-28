import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { MyTabs, MyTabPane } from '../src/components/tabs'
import { nextTick } from 'vue'

describe('Tabs 组件', () => {
  it('基本渲染和选项切换', async () => {
    const wrapper = mount({
      components: { MyTabs, MyTabPane },
      template: `
        <my-tabs v-model="activeTab">
          <my-tab-pane label="标签1" name="tab1">内容1</my-tab-pane>
          <my-tab-pane label="标签2" name="tab2">内容2</my-tab-pane>
          <my-tab-pane label="标签3" name="tab3">内容3</my-tab-pane>
        </my-tabs>
      `,
      data() {
        return {
          activeTab: 'tab1'
        }
      }
    })

    // 检查初始渲染
    expect(wrapper.find('.my-tabs').exists()).toBe(true)
    expect(wrapper.findAll('.my-tabs__item').length).toBe(3)
    expect(wrapper.findAll('.my-tabs__item')[0].classes()).toContain('is-active')
    expect(wrapper.text()).toContain('内容1')

    // 切换到第二个标签
    await wrapper.findAll('.my-tabs__item')[1].trigger('click')
    await nextTick()
    expect(wrapper.findAll('.my-tabs__item')[1].classes()).toContain('is-active')
    expect(wrapper.text()).toContain('内容2')
  })

  it('不同类型的标签页', async () => {
    const wrapper = mount({
      components: { MyTabs, MyTabPane },
      template: `
        <my-tabs v-model="activeTab" type="card">
          <my-tab-pane label="标签1" name="tab1">内容1</my-tab-pane>
          <my-tab-pane label="标签2" name="tab2">内容2</my-tab-pane>
        </my-tabs>
      `,
      data() {
        return {
          activeTab: 'tab1'
        }
      }
    })

    // 检查类型
    expect(wrapper.find('.my-tabs').classes()).toContain('my-tabs--card')
  })

  it('可关闭的标签页', async () => {
    const wrapper = mount({
      components: { MyTabs, MyTabPane },
      template: `
        <my-tabs v-model="activeTab" closable @tab-remove="handleRemove">
          <my-tab-pane label="标签1" name="tab1">内容1</my-tab-pane>
          <my-tab-pane label="标签2" name="tab2">内容2</my-tab-pane>
        </my-tabs>
      `,
      data() {
        return {
          activeTab: 'tab1'
        }
      },
      methods: {
        handleRemove(tab, index) {
          // 在实际应用中，这里会修改tabs数组
        }
      }
    })

    // 检查关闭按钮
    expect(wrapper.find('.my-tabs__item-close').exists()).toBe(true)
    
    // 触发关闭事件
    await wrapper.find('.my-tabs__item-close').trigger('click')
    expect(wrapper.emitted('tab-remove')).toBeTruthy()
  })

  it('禁用的标签页', async () => {
    const wrapper = mount({
      components: { MyTabs, MyTabPane },
      template: `
        <my-tabs v-model="activeTab">
          <my-tab-pane label="标签1" name="tab1">内容1</my-tab-pane>
          <my-tab-pane label="标签2" name="tab2" disabled>内容2</my-tab-pane>
        </my-tabs>
      `,
      data() {
        return {
          activeTab: 'tab1'
        }
      }
    })

    // 检查禁用状态
    expect(wrapper.findAll('.my-tabs__item')[1].classes()).toContain('is-disabled')
    
    // 点击禁用标签不应该切换
    await wrapper.findAll('.my-tabs__item')[1].trigger('click')
    await nextTick()
    expect(wrapper.findAll('.my-tabs__item')[0].classes()).toContain('is-active')
    expect(wrapper.text()).toContain('内容1')
  })

  it('可新增标签页', async () => {
    const wrapper = mount({
      components: { MyTabs, MyTabPane },
      template: `
        <my-tabs v-model="activeTab" addable @tab-add="handleAdd">
          <my-tab-pane label="标签1" name="tab1">内容1</my-tab-pane>
        </my-tabs>
      `,
      data() {
        return {
          activeTab: 'tab1'
        }
      },
      methods: {
        handleAdd() {
          // 在实际应用中，这里会添加新标签
        }
      }
    })

    // 检查新增按钮
    expect(wrapper.find('.my-tabs__new-tab').exists()).toBe(true)
    
    // 触发新增事件
    await wrapper.find('.my-tabs__new-tab').trigger('click')
    expect(wrapper.emitted('tab-add')).toBeTruthy()
  })

  it('不同位置的标签页', async () => {
    const wrapper = mount({
      components: { MyTabs, MyTabPane },
      template: `
        <my-tabs v-model="activeTab" position="left">
          <my-tab-pane label="标签1" name="tab1">内容1</my-tab-pane>
          <my-tab-pane label="标签2" name="tab2">内容2</my-tab-pane>
        </my-tabs>
      `,
      data() {
        return {
          activeTab: 'tab1'
        }
      }
    })

    // 检查位置
    expect(wrapper.find('.my-tabs').classes()).toContain('my-tabs--left')
  })
}) 