import {config, mount} from '@vue/test-utils';
import SingleSelect from '@/components/SingleSelect/SingleSelect.vue';
import options from "@/utils/options";

config.global.provide = {
    $theme: options,
}


describe('SingleSelect.vue', () => {
    const transitionStub = () => ({
        render: function (h) {
            return this.$options._renderChildren
        }
    });
    it('render simple single select', async () => {
        const wrapper = mount(SingleSelect, {
            propsData: {
                dataSource: [
                    {id: 1, name: 'Foo'},
                    {id: 2, name: 'Bar'},
                    {id: 3, name: 'Cake'},
                ],
                valueProperty: 'id',
                labelProperty: 'name',
            },
            stubs: {
                transition: transitionStub()
            },
        });
        expect(wrapper.find('div').classes()).toContain('fe-single-select');
        expect(wrapper.find('div.placeholder-wrapper').exists()).toBe(true);
        expect(wrapper.find('div.dropdown-menu').exists()).toBe(false);
        wrapper.vm.toggleTrigger();
        //need to call nextTick twice for emit event to propagate and dropdown menu to finish rendering
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.dropdown-menu').exists()).toBe(true);
        expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).toBe(true);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item').length
        ).toEqual(3);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[0]
            .text()
        ).toEqual('Foo');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[1]
            .text()
        ).toEqual('Bar');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[2]
            .text()
        ).toEqual('Cake');

        //expect none of the checkboxes are checked
        expect(wrapper.find('div.selected-item').exists()).toBe(false);


        let firstItem = wrapper.find('div.item');
        await firstItem.trigger('click');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted()['update:modelValue'].length).toEqual(1);
        expect(wrapper.vm.opened).toBe(false);

        wrapper.vm.toggleTrigger();
        //need to call nextTick twice for emit event to propagate and dropdown menu to finish rendering
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.selected-item').exists()).toBe(true);
        expect(wrapper.find('div.selected-item').text()).toBe('Foo');
    });

    it('render grouped single select', async () => {
        const wrapper = mount(SingleSelect, {
            propsData: {
                dataSource: [
                    {id: 1, name: 'Apple', category: 'Fruit'},
                    {id: 2, name: 'Carrot', category: 'Vegetable'},
                    {id: 3, name: 'Pineapple', category: 'Fruit'},
                ],
                valueProperty: 'id',
                labelProperty: 'name',
                groupByProperty: 'category'
            },
        });
        expect(wrapper.find('div').classes()).toContain('fe-single-select');
        expect(wrapper.find('div.placeholder-wrapper').exists()).toBe(true);
        expect(wrapper.find('div.dropdown-menu').exists()).toBe(false);
        wrapper.vm.toggleTrigger();
        //need to call nextTick twice for emit event to propagate and dropdown menu to finish rendering
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.dropdown-menu').exists()).toBe(true);
        expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).toBe(true);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item').length
        ).toEqual(5);
        let fruitGroup = wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-group')[0];
        expect(fruitGroup.text()).toEqual('Fruit');

        let vegetableGroup = wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-group')[1];
        expect(vegetableGroup.text()).toEqual('Vegetable');

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.grouped-item')[0]
            .text()
        ).toEqual('Apple');

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.grouped-item')[1]
            .text()
        ).toEqual('Pineapple');

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.grouped-item')[2]
            .text()
        ).toEqual('Carrot');
    });

    it('filters items by the supplied search term', async () => {
        const wrapper = mount(SingleSelect, {
            propsData: {
                dataSource: [
                    {id: 1, name: 'Foo'},
                    {id: 2, name: 'Bar'},
                    {id: 3, name: 'Cake'},
                    {id: 4, name: 'Fake'},
                ],
                valueProperty: 'id',
                labelProperty: 'name',
                searchable: true,
            },
        });
        expect(wrapper.find('div').classes()).toContain('fe-single-select');
        expect(wrapper.find('div.placeholder-wrapper').exists()).toBe(true);
        expect(wrapper.find('div.dropdown-menu').exists()).toBe(false);
        wrapper.vm.toggleTrigger();
        //need to call nextTick twice for emit event to propagate and dropdown menu to finish rendering
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.dropdown-menu').exists()).toBe(true);
        expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).toBe(true);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item').length
        ).toEqual(5);
        let searchInputWrapper = wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[0];

        let searchInput = searchInputWrapper.find('.fe-input');

        expect(searchInput.exists()).toBe(true);

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[1]
            .text()
        ).toEqual('Foo');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[2]
            .text()
        ).toEqual('Bar');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[3]
            .text()
        ).toEqual('Cake');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[4]
            .text()
        ).toEqual('Fake');

        //search for 'ake' and expect 'Cake' and 'Fake' to be in the system
        await searchInput.setValue('ake');
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item').length
        ).toEqual(3);

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[1]
            .text()
        ).toEqual('Cake');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[2]
            .text()
        ).toEqual('Fake');

        //search for 'Boop' and expect 'No Records Found'
        await searchInput.setValue('Boop');
        await wrapper.vm.$nextTick();

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item').length
        ).toEqual(2);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[1]
            .text()
        ).toEqual('No Records Found');
    });
});
