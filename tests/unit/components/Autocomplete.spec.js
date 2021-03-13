import {expect} from 'chai';
import Autocomplete from '@/components/Autocomplete/Autocomplete.vue';
import Input from "@/components/Input/Input.vue";
import {mount} from "@vue/test-utils";


describe('Autocomplete.vue', () => {
    it('is called', () => {
        let wrapper = mount(Autocomplete, {
            stubs: {
                'fe-input': Input
            }
        });
        expect(wrapper.name()).to.equal('fe-autocomplete');
    });

    it('is vue instance', () => {
        const wrapper = mount(Autocomplete, {
            children: [Input],
            stubs: {
                'fe-input': Input
            }
        });
        expect(wrapper.name()).to.equal('fe-autocomplete');
        expect(wrapper.isVueInstance()).to.be.true;
    });

    // it('render simple autocomplete', async () => {
    //     const wrapper = mount(Autocomplete, {
    //         propsData: {
    //             items: ['Foo', 'Foo1', 'Foo2', 'Bar', 'Bar1', 'Bar2', 'Cake', 'Cake1', 'Cake2']
    //         },
    //         children: [Input],
    //         stubs: {
    //             'fe-input': Input
    //         }
    //     });
    //     expect(wrapper.find('input').classes()).to.include('fe-input');
    //     wrapper.setData({opened: true});
    //     wrapper.vm.filterItems('Foo');
    //     await wrapper.vm.$nextTick();
    //     expect(wrapper.find('div.dropdown-menu')
    //         .find('div.dropdown-content')
    //         .findAll('a.dropdown-item').length
    //     ).to.equal(3);
    //     let dropdownItems = wrapper.find('div.dropdown-menu')
    //         .find('div.dropdown-content')
    //         .findAll('a.dropdown-item');
    //     expect(dropdownItems.at(0).text()).contain('Foo');
    //     expect(dropdownItems.at(1).text()).contain('Foo');
    //     expect(dropdownItems.at(2).text()).contain('Foo');
    //     wrapper.vm.filterItems('Bar1');
    //     await wrapper.vm.$nextTick();
    //     expect(wrapper.find('div.dropdown-menu')
    //         .find('div.dropdown-content')
    //         .findAll('a.dropdown-item').length
    //     ).to.equal(1);
    //     dropdownItems = wrapper.find('div.dropdown-menu')
    //         .find('div.dropdown-content')
    //         .findAll('a.dropdown-item');
    //     expect(dropdownItems.at(0).text()).contain('Bar1');
    //     wrapper.vm.filterItems('Ball');
    //     await wrapper.vm.$nextTick();
    //     dropdownItems = wrapper.find('div.dropdown-menu')
    //         .find('div.dropdown-content')
    //         .findAll('span.dropdown-item');
    //     expect(dropdownItems.at(0).text()).contain('No results found');
    // });
    //
    // it('render autocomplete with custom item slot', async () => {
    //     const wrapper = mount(Autocomplete, {
    //         propsData: {
    //             items: ['Foo', 'Foo1', 'Foo2', 'Bar', 'Bar1', 'Bar2', 'Cake', 'Cake1', 'Cake2']
    //         },
    //         children: [Input],
    //         stubs: {
    //             'fe-input': Input
    //         },
    //         scopedSlots: {
    //             item: '<span class="item" slot-scope="props">{{ props.item }}[CUSTOM]</span>'
    //         }
    //     });
    //     expect(wrapper.find('input').classes()).to.include('fe-input');
    //     wrapper.setData({opened: true});
    //     wrapper.vm.filterItems('Foo');
    //     await wrapper.vm.$nextTick();
    //     expect(wrapper.find('div.dropdown-menu').exists()).to.be.true;
    //     expect(wrapper.find('div.dropdown-menu').find('div.dropdown-content').exists()).to.be.true;
    //     expect(wrapper.find('div.dropdown-menu')
    //         .find('div.dropdown-content')
    //         .findAll('a.dropdown-item').length
    //     ).to.equal(3);
    //     let dropdownItems = wrapper.find('div.dropdown-menu')
    //         .find('div.dropdown-content')
    //         .findAll('a.dropdown-item');
    //     expect(dropdownItems.at(0).text()).contain('Foo[CUSTOM]');
    //     expect(dropdownItems.at(1).text()).contain('Foo1[CUSTOM]');
    //     expect(dropdownItems.at(2).text()).contain('Foo2[CUSTOM]');
    // });
    //
    // it('render autocomplete with custom empty slot', async () => {
    //     const wrapper = mount(Autocomplete, {
    //         propsData: {
    //             items: ['Foo', 'Foo1', 'Foo2', 'Bar', 'Bar1', 'Bar2', 'Cake', 'Cake1', 'Cake2']
    //         },
    //         children: [Input],
    //         stubs: {
    //             'fe-input': Input
    //         },
    //         scopedSlots: {
    //             empty: '<span class="dropdown-item">CUSTOM ITEM NOT FOUND MESSAGE</span>'
    //         }
    //     });
    //     expect(wrapper.find('input').classes()).to.include('fe-input');
    //     wrapper.setData({opened: true});
    //     wrapper.vm.filterItems('Ball');
    //     await wrapper.vm.$nextTick();
    //     let dropdownItems = wrapper.find('div.dropdown-menu')
    //         .find('div.dropdown-content')
    //         .findAll('span.dropdown-item');
    //     expect(dropdownItems.at(0).text()).contain('CUSTOM ITEM NOT FOUND MESSAGE');
    // });
});
