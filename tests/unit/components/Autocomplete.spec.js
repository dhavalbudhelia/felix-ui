import Autocomplete from '@/components/Autocomplete/Autocomplete.vue';
import {config, mount} from '@vue/test-utils';
import options from '@/utils/options';

config.global.provide = {
  $theme: options,
}

describe('Autocomplete.vue', () => {
  const setup = async (options) => {
    const compOptions = {
      ...options,
      ...{
        propsData: {
          items: ['Foo', 'Foo1', 'Foo2', 'Bar', 'Bar1', 'Bar2', 'Cake', 'Cake1', 'Cake2']
        }
      }
    };
    return mount(Autocomplete, compOptions);
  }

  it('render simple autocomplete', async () => {
    const wrapper = await setup();
    expect(wrapper.vm.opened).toBe(false);
    const searchTerm = wrapper.find('input');
    expect(searchTerm.exists()).toBe(true);
    expect(searchTerm.classes()).toContain('fe-input');
    await searchTerm.setValue('Foo');
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item').length
    ).toEqual(3);
    let dropdownItems = wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item');
    expect(dropdownItems[0].text()).toContain('Foo');
    expect(dropdownItems[1].text()).toContain('Foo');
    expect(dropdownItems[2].text()).toContain('Foo');
    await searchTerm.setValue('Bar1');
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item').length
    ).toEqual(1);
    dropdownItems = wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item');
    expect(dropdownItems[0].text()).toContain('Bar1');
    await searchTerm.setValue('Ball');
    dropdownItems = wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('span.dropdown-item');
    expect(dropdownItems[0].text()).toContain('No results found');
  });

  it('render autocomplete with custom item slot', async () => {
    const wrapper = await setup({
      slots: {
        item: '<template #item="props">{{ props.item }}[CUSTOM]</template>'
      }
    });
    expect(wrapper.vm.opened).toBe(false);
    const searchTerm = wrapper.find('input');
    expect(searchTerm.exists()).toBe(true);
    expect(searchTerm.classes()).toContain('fe-input');
    await searchTerm.setValue('Foo');
    expect(wrapper.find('div.dropdown-menu').exists()).toBe(true);
    expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).toBe(true);
    expect(wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item').length
    ).toEqual(3);
    let dropdownItems = wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('a.dropdown-item');
    expect(dropdownItems[0].text()).toContain('Foo[CUSTOM]');
    expect(dropdownItems[1].text()).toContain('Foo1[CUSTOM]');
    expect(dropdownItems[2].text()).toContain('Foo2[CUSTOM]');
  });

  it('render autocomplete with custom empty slot', async () => {
    const wrapper = await setup({
      slots: {
        empty: '<template #empty><span class="dropdown-item">CUSTOM ITEM NOT FOUND MESSAGE</span></template>'
      }
    });
    expect(wrapper.vm.opened).toBe(false);
    const searchTerm = wrapper.find('input');
    expect(searchTerm.exists()).toBe(true);
    expect(searchTerm.classes()).toContain('fe-input');
    await searchTerm.setValue('Ball');
    let dropdownItems = wrapper.find('div.dropdown-menu')
      .find('div.dropdown-content')
      .findAll('span.dropdown-item');
    expect(dropdownItems[0].text()).toContain('CUSTOM ITEM NOT FOUND MESSAGE');
  });
});
