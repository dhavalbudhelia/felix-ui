import {config, mount} from '@vue/test-utils';
import Checkbox from '@/components/Checkbox/Checkbox.vue';
import options from '@/utils/options';

config.global.provide = {
  $theme: options,
}

describe('Checkbox.vue', async () => {
  const setup = async (options) => {
    const compOptions = {
      ...options,
      ...{
        slots: {
          default: 'Bar'
        }
      }
    };
    return mount(Checkbox, compOptions);
  }

  it('render checked checkbox element', async () => {
    const wrapper = await setup({
      propsData: {
        modelValue: true,
      },
    });
    expect(wrapper.text()).toEqual('Bar');
    expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(true);
  });

  it('render unchecked checkbox element', async () => {
    const wrapper = await setup({
      propsData: {
        modelValue: false,
      },
    });
    expect(wrapper.text()).toEqual('Bar');
    expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(false);
  });

  it('render disabled checkbox element', async () => {
    const wrapper = await setup({
      propsData: {
        modelValue: true,
        disabled: true
      },
    });
    expect(wrapper.text()).toEqual('Bar');
    expect(wrapper.find('input[type="checkbox"]:disabled').exists()).toBe(true);
    expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(true);
  });

  it('changes the checkbox value on click', async () => {
    const wrapper = await setup({
      propsData: {
        modelValue: false,
      },
    });
    expect(wrapper.text()).toEqual('Bar');
    expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(false);
    wrapper.find('input[type="checkbox"]').setChecked();
    expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(true);
    wrapper.find('input[type="checkbox"]').setChecked(false);
    expect(wrapper.find('input[type="checkbox"]:checked').exists()).toBe(false);
  });
});
