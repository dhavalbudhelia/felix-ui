import {config, mount} from '@vue/test-utils';
import MultiSelect from '@/components/MultiSelect/MultiSelect.vue';
import options from "@/utils/options";

config.global.provide = {
    $theme: options,
}


describe('MultiSelect.vue', () => {
    const transitionStub = () => ({
        render: function (h) {
            return this.$options._renderChildren
        }
    });
    it('render simple multi select', async () => {
        const wrapper = mount(MultiSelect, {
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
        expect(wrapper.find('div').classes()).toContain('fe-multi-select');
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
        ).toEqual(4);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[0]
            .text()
        ).toEqual('Select All');
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

        //expect none of the checkboxes are checked
        expect(wrapper.findAllComponents({name: 'fe-checkbox'})[0]
            .find('input[type="checkbox"]:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper.findAllComponents({name: 'fe-checkbox'})[1]
            .find('input[type="checkbox"]:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper.findAllComponents({name: 'fe-checkbox'})[2]
            .find('input[type="checkbox"]:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper.findAllComponents({name: 'fe-checkbox'})
            [3]
            .find('input[type="checkbox"]:not(:checked)')
            .exists()
        ).toBe(true);

        let selectAllCheckbox = wrapper.findAllComponents({name: 'fe-checkbox'})[0]
            .find('label.fe-checkbox');
        await selectAllCheckbox.trigger('click');

        //expect all of the checkboxes are checked
        expect(wrapper.findAllComponents({name: 'fe-checkbox'})[0]
            .find('input[type="checkbox"]:checked')
            .exists()
        ).toBe(true);

        expect(wrapper.findAllComponents({name: 'fe-checkbox'})[1]
            .find('input[type="checkbox"]:checked')
            .exists()
        ).toBe(true);

        expect(wrapper.findAllComponents({name: 'fe-checkbox'})[2]
            .find('input[type="checkbox"]:checked')
            .exists()
        ).toBe(true);

        expect(wrapper.findAllComponents({name: 'fe-checkbox'})[3]
            .find('input[type="checkbox"]:checked')
            .exists()
        ).toBe(true);
    });

    it('render grouped multi select', async () => {
        const wrapper = mount(MultiSelect, {
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
        expect(wrapper.find('div').classes()).toContain('fe-multi-select');
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
        ).toEqual(6);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[0]
            .text()
        ).toEqual('Select All');

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

    it('select all the grouped item when group checkbox is checked', async () => {
        const wrapper = mount(MultiSelect, {
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
        expect(wrapper.find('div').classes()).toContain('fe-multi-select');
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
        ).toEqual(6);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[0]
            .text()
        ).toEqual('Select All');

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

        //expect none of the checkboxes are checked
        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[0]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[1]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[2]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[3]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[4]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[5]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);

        let fruitGroupCheckbox = fruitGroup.find('.fe-checkbox');
        fruitGroupCheckbox.trigger('click');
        await wrapper.vm.$nextTick();

        //expect all of the checkboxes under fruit group are checked
        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[0]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[1]
            .find('input:not(:checked)')
            .exists()
        ).toBe(false);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[2]
            .find('input:not(:checked)')
            .exists()
        ).toBe(false);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[3]
            .find('input:not(:checked)')
            .exists()
        ).toBe(false);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[4]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[5]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);

        fruitGroup = wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-group')[0];
        fruitGroupCheckbox = fruitGroup.find('.fe-checkbox');
        await fruitGroupCheckbox.trigger('click');

        //expect all of the checkboxes to be unchecked
        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[0]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[1]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[2]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[3]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[4]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);

        expect(wrapper
            .findAllComponents({name: 'fe-checkbox'})[5]
            .find('input:not(:checked)')
            .exists()
        ).toBe(true);
    });

    it('filters items by the supplied search term', async () => {
        const wrapper = mount(MultiSelect, {
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
        expect(wrapper.find('div').classes()).toContain('fe-multi-select');
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
        ).toEqual(6);
        let searchInputWrapper = wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[0];

        let searchInput = searchInputWrapper.find('.fe-input');

        expect(searchInput.exists()).toBe(true);

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[1]
            .text()
        ).toEqual('Select All');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[2]
            .text()
        ).toEqual('Foo');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[3]
            .text()
        ).toEqual('Bar');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[4]
            .text()
        ).toEqual('Cake');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')[5]
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
