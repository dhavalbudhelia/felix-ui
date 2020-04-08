import {expect} from 'chai';
import {createLocalVue, mount, shallowMount} from '@vue/test-utils';
import MultiSelect from '@/components/MultiSelect/MultiSelect.vue';
import Button from '@/components/Button/Button.vue';
import Icon from '@/components/Icon/Icon.vue';
import Input from '@/components/Input/Input.vue';
import Checkbox from '@/components/Checkbox/Checkbox.vue';
import lodash from 'lodash';
import VueLodash from "vue-lodash";

let localVue = createLocalVue();
localVue.use(VueLodash, {lodash: lodash});

describe('MultiSelect.vue', () => {
    it('is called', () => {
        let wrapper = shallowMount(
            MultiSelect,
            {
                localVue
            }
        );
        expect(wrapper.name()).to.equal('fe-multi-select');
    });

    it('is vue instance', () => {
        const wrapper = shallowMount(
            MultiSelect,
            {
                localVue
            }
        );
        expect(wrapper.name()).to.equal('fe-multi-select');
        expect(wrapper.isVueInstance()).to.be.true;
    });

    it('render simple multi select', async () => {
        const wrapper = mount(MultiSelect, {
            localVue,
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
                'fe-button': Button,
                'fe-icon': Icon,
                'fe-input': Input,
                'fe-checkbox': Checkbox,
            }
        });
        expect(wrapper.find('div').classes()).to.include('fe-multi-select');
        expect(wrapper.find('div.placeholder-wrapper').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu').exists()).to.be.false;
        wrapper.setData({opened: true});
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.dropdown-menu').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item').length
        ).to.equal(4);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(0)
            .text()
        ).to.equal('Select All');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(1)
            .text()
        ).to.equal('Foo');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(2)
            .text()
        ).to.equal('Bar');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(3)
            .text()
        ).to.equal('Cake');

        //expect none of the checkboxes are checked
        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(0)
            .find('input[type="checkbox"]')
            .is('input:not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(1)
            .find('input[type="checkbox"]')
            .is('input:not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(2)
            .find('input[type="checkbox"]')
            .is('input:not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(3)
            .find('input[type="checkbox"]')
            .is('input:not(:checked)')
        ).to.be.true;

        let selectAllCheckbox = wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .find('div.dropdown-content-header-wrapper')
            .find('div.dropdown-item')
            .find({name: 'fe-checkbox'});
        selectAllCheckbox.trigger('click');
        await wrapper.vm.$nextTick();

        //expect all of the checkboxes are checked
        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(0)
            .find('input[type="checkbox"]:checked')
            .is('input')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(1)
            .find('input[type="checkbox"]:checked')
            .is('input')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(2)
            .find('input[type="checkbox"]:checked')
            .is('input')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(3)
            .find('input[type="checkbox"]:checked')
            .is('input')
        ).to.be.true;
    });

    it('render grouped multi select', async () => {
        const wrapper = mount(MultiSelect, {
            localVue,
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
            stubs: {
                'fe-button': Button,
                'fe-icon': Icon,
                'fe-input': Input,
                'fe-checkbox': Checkbox,
            }
        });
        expect(wrapper.find('div').classes()).to.include('fe-multi-select');
        expect(wrapper.find('div.placeholder-wrapper').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu').exists()).to.be.false;
        wrapper.setData({opened: true});
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.dropdown-menu').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item').length
        ).to.equal(6);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(0)
            .text()
        ).to.equal('Select All');

        let fruitGroup = wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-group')
            .at(0);
        expect(fruitGroup.text()).to.equal('Fruit');

        let vegetableGroup = wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-group')
            .at(1);
        expect(vegetableGroup.text()).to.equal('Vegetable');

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.grouped-item')
            .at(0)
            .text()
        ).to.equal('Apple');

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.grouped-item')
            .at(1)
            .text()
        ).to.equal('Pineapple');

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.grouped-item')
            .at(2)
            .text()
        ).to.equal('Carrot');
    });

    it('select all the grouped item when group checkbox is checked', async () => {
        const wrapper = mount(MultiSelect, {
            localVue,
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
            stubs: {
                'fe-button': Button,
                'fe-icon': Icon,
                'fe-input': Input,
                'fe-checkbox': Checkbox,
            }
        });
        expect(wrapper.find('div').classes()).to.include('fe-multi-select');
        expect(wrapper.find('div.placeholder-wrapper').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu').exists()).to.be.false;
        wrapper.setData({opened: true});
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.dropdown-menu').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item').length
        ).to.equal(6);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(0)
            .text()
        ).to.equal('Select All');

        let fruitGroup = wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-group')
            .at(0);
        expect(fruitGroup.text()).to.equal('Fruit');

        let vegetableGroup = wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-group')
            .at(1);
        expect(vegetableGroup.text()).to.equal('Vegetable');

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.grouped-item')
            .at(0)
            .text()
        ).to.equal('Apple');

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.grouped-item')
            .at(1)
            .text()
        ).to.equal('Pineapple');

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.grouped-item')
            .at(2)
            .text()
        ).to.equal('Carrot');

        //expect none of the checkboxes are checked
        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(0)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(1)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(2)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(3)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(4)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(5)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;

        let fruitGroupCheckbox = fruitGroup.find({name: 'fe-checkbox'});
        fruitGroupCheckbox.trigger('click');
        await wrapper.vm.$nextTick();

        //expect all of the checkboxes under fruit group are checked
        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(0)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(1)
            .find('input')
            .is(':not(:checked)')
        ).to.be.false;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(2)
            .find('input')
            .is(':not(:checked)')
        ).to.be.false;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(3)
            .find('input')
            .is(':not(:checked)')
        ).to.be.false;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(4)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(5)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;

        fruitGroupCheckbox.trigger('click');
        await wrapper.vm.$nextTick();

        //expect all of the checkboxes to be unchecked
        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(0)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(1)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(2)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(3)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(4)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;

        expect(wrapper
            .findAll({name: 'fe-checkbox'})
            .at(5)
            .find('input')
            .is(':not(:checked)')
        ).to.be.true;
    });

    it('filters items by the supplied search term', async () => {
        const wrapper = mount(MultiSelect, {
            localVue,
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
            stubs: {
                'fe-button': Button,
                'fe-icon': Icon,
                'fe-input': Input,
                'fe-checkbox': Checkbox,
            }
        });
        expect(wrapper.find('div').classes()).to.include('fe-multi-select');
        expect(wrapper.find('div.placeholder-wrapper').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu').exists()).to.be.false;
        wrapper.setData({opened: true});
        await wrapper.vm.$nextTick();
        expect(wrapper.find('div.dropdown-menu').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).to.be.true;
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item').length
        ).to.equal(6);
        let searchInputWrapper = wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(0);
        let searchInput = searchInputWrapper.find({name: 'fe-input'});

        expect(searchInput.isVueInstance()).to.be.true;

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(1)
            .text()
        ).to.equal('Select All');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(2)
            .text()
        ).to.equal('Foo');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(3)
            .text()
        ).to.equal('Bar');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(4)
            .text()
        ).to.equal('Cake');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(5)
            .text()
        ).to.equal('Fake');

        //search for 'ake' and expect 'Cake' and 'Fake' to be in the system
        wrapper.setData({
            searchTerm: 'ake'
        });
        await wrapper.vm.$nextTick();

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item').length
        ).to.equal(3);

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(1)
            .text()
        ).to.equal('Cake');
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(2)
            .text()
        ).to.equal('Fake');

        //search for 'Boop' and expect 'No Records Found'
        wrapper.setData({
            searchTerm: 'Boop'
        });
        await wrapper.vm.$nextTick();

        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item').length
        ).to.equal(2);
        expect(wrapper.find('div.dropdown-menu')
            .find('div.dropdown-content')
            .findAll('div.dropdown-item')
            .at(1)
            .text()
        ).to.equal('No Records Found');
    });
});
