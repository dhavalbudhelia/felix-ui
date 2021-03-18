import Autocomplete from '@/components/Autocomplete/Autocomplete.vue';
import {config, mount} from "@vue/test-utils";
import options from '@/utils/options';

config.global.mocks = {
    $theme: options,
}
describe('Autocomplete.vue', () => {
    it('render simple autocomplete', async () => {
        const wrapper = mount(Autocomplete, {
            propsData: {
                items: ['Foo', 'Foo1', 'Foo2', 'Bar', 'Bar1', 'Bar2', 'Cake', 'Cake1', 'Cake2']
            },
        });
        expect(wrapper.find('input').classes()).toContain('fe-input');
        wrapper.setData({opened: true});
        wrapper.vm.filterItems('Foo');
        await wrapper.vm.$nextTick();
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
        wrapper.vm.filterItems('Bar1');
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('a.dropdown-item').length
        ).toEqual(1);
        dropdownItems = wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('a.dropdown-item');
        expect(dropdownItems[0].text()).toContain('Bar1');
        wrapper.vm.filterItems('Ball');
        await wrapper.vm.$nextTick();
        dropdownItems = wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('span.dropdown-item');
        expect(dropdownItems[0].text()).toContain('No results found');
    });

    it('render autocomplete with custom item slot', async () => {
        const wrapper = mount(Autocomplete, {
            propsData: {
                items: ['Foo', 'Foo1', 'Foo2', 'Bar', 'Bar1', 'Bar2', 'Cake', 'Cake1', 'Cake2']
            },
            slots: {
                item: '<template #item="props">{{ props.item }}[CUSTOM]</template>'
            }
        });

        expect(wrapper.find('input').classes()).toContain('fe-input');
        wrapper.setData({opened: true});
        wrapper.vm.filterItems('Foo');
        await wrapper.vm.$nextTick();
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
        const wrapper = mount(Autocomplete, {
            propsData: {
                items: ['Foo', 'Foo1', 'Foo2', 'Bar', 'Bar1', 'Bar2', 'Cake', 'Cake1', 'Cake2']
            },
            slots: {
                empty: '<template #empty><span class="dropdown-item">CUSTOM ITEM NOT FOUND MESSAGE</span></template>'
            }
        });
        expect(wrapper.find('input').classes()).toContain('fe-input');
        wrapper.setData({opened: true});
        wrapper.vm.filterItems('Ball');
        await wrapper.vm.$nextTick();
        let dropdownItems = wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('span.dropdown-item');
        expect(dropdownItems[0].text()).toContain('CUSTOM ITEM NOT FOUND MESSAGE');
    });
});
