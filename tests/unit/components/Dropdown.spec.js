import {config, mount} from '@vue/test-utils';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
import options from '@/utils/options';

config.global.provide = {
  $theme: options,
}

describe('Dropdown.vue', () => {
  const setup = async (options) => {
    const compOptions = {
      ...options,
      ...{
        propsData: {
          items: ['Foo', 'Bar', 'Cake']
        },
      }
    };
    return mount(Dropdown, compOptions);
  }

  it('render simple dropdown', async () => {
    const wrapper = await setup();
    expect(wrapper.find('div.dropdown-trigger').exists()).toBe(true);
    expect(wrapper.find('div.dropdown-menu').exists()).toBe(false);
    await wrapper.vm.toggleTrigger();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div.dropdown-menu').exists()).toBe(true);
    expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).toBe(true);
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item').length
    ).toEqual(3);
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item')
      [0]
      .text()
    ).toEqual('Foo');
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item')
      [1]
      .text()
    ).toEqual('Bar');
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item')
      [2]
      .text()
    ).toEqual('Cake');
  });

  it('render dropdown with custom trigger slot', async () => {
    const wrapper = await setup({
      slots: {
        trigger: '<template #trigger><span class="custom-trigger-class">Custom Trigger</span></template>'
      }
    });
    expect(wrapper.find('div.dropdown-trigger').exists()).toBe(true);
    expect(wrapper.find('div.dropdown-trigger span').classes()).toContain('custom-trigger-class');
    expect(wrapper.find('div.dropdown-menu').exists()).toBe(false);
    await wrapper.vm.toggleTrigger();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div.dropdown-menu').exists()).toBe(true);
    expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).toBe(true);
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item').length
    ).toEqual(3);
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item')[0]
      .text()
    ).toEqual('Foo');
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item')[1]
      .text()
    ).toEqual('Bar');
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item')[2]
      .text()
    ).toEqual('Cake');
  });

  it('render dropdown with custom item slot', async () => {
    const wrapper = await setup({
      slots: {
        item: '<template #item="props"><span class="item">{{ props.item }}[CUSTOM]</span></template>'
      }
    });
    expect(wrapper.find('div.dropdown-trigger').exists()).toBe(true);
    expect(wrapper.find('div.dropdown-menu').exists()).toBe(false);
    await wrapper.vm.toggleTrigger();
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div.dropdown-menu').exists()).toBe(true);
    expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).toBe(true);
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item').length
    ).toEqual(3);
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item')[0]
      .text()
    ).toEqual('Foo[CUSTOM]');
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item')[1]
      .text()
    ).toEqual('Bar[CUSTOM]');
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item')[2]
      .text()
    ).toEqual('Cake[CUSTOM]');
  });
});
