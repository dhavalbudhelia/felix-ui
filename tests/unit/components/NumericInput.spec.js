import {config, mount} from '@vue/test-utils';
import NumericInput from '@/components/NumericInput/NumericInput.vue';
import options from "@/utils/options";

config.global.provide = {
  $theme: options,
}

describe('NumericInput.vue', () => {
  it('render simple numeric input', () => {
    const wrapper = mount(NumericInput);
    expect(wrapper.find('input').classes()).toContain('fe-numeric-input');
  });

  it('render disabled numeric input', () => {
    const wrapper = mount(NumericInput, {
      attrs: {
        disabled: true
      }
    });
    expect(wrapper.find('input').classes()).toContain('fe-numeric-input');
    expect(wrapper.find('input:disabled').exists()).toBe(true);
    expect(wrapper.find('input:not([disabled])').exists()).toBe(false);
  });

  it('increments numeric input', async () => {
    const wrapper = mount(NumericInput, {
      propsData: {
        modelValue: 10,
      },
    });
    const incrementButton = wrapper.find('[data-testid=numeric-input-increment-button]');
    incrementButton.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted()['update:modelValue'].length).toEqual(1);
    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual(11);
  });

  it('increments numeric input with the given step', async () => {
    const wrapper = mount(NumericInput, {
      propsData: {
        modelValue: 10,
        step: 5,
      },
    });
    const incrementButton = wrapper.find('[data-testid=numeric-input-increment-button]');
    incrementButton.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted()['update:modelValue'].length).toEqual(1);
    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual(15);
  });

  it('increments numeric input until the given max value reached', async () => {
    const wrapper = mount(NumericInput, {
      propsData: {
        modelValue: 10,
        maxValue: 11,
      },
    });
    const incrementButton = wrapper.find('[data-testid=numeric-input-increment-button]');
    incrementButton.trigger('click');
    incrementButton.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted()['update:modelValue'].length).toEqual(2);
    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual(11);
  });

  it('decrements numeric input', async () => {
    const wrapper = mount(NumericInput, {
      propsData: {
        modelValue: 10,
      },
    });
    const decrementButton = wrapper.find('[data-testid=numeric-input-decrement-button]');
    decrementButton.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted()['update:modelValue'].length).toEqual(1);
    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual(9);
  });

  it('decrements numeric input with given step', async () => {
    const wrapper = mount(NumericInput, {
      propsData: {
        modelValue: 10,
        step: 5,
      },
    });
    const decrementButton = wrapper.find('[data-testid=numeric-input-decrement-button]');
    decrementButton.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted()['update:modelValue'].length).toEqual(1);
    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual(5);
  });

  it('decrements numeric input until the given min value reached', async () => {
    const wrapper = mount(NumericInput, {
      propsData: {
        modelValue: 10,
        minValue: 9,
      },
    });
    const decrementButton = wrapper.find('[data-testid=numeric-input-decrement-button]');
    decrementButton.trigger('click');
    decrementButton.trigger('click');
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted()['update:modelValue'].length).toEqual(2);
    expect(wrapper.emitted()['update:modelValue'][0][0]).toEqual(9);
  });
});
