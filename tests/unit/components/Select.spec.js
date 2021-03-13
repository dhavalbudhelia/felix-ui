// import {expect} from 'chai';
// import {shallowMount} from '@vue/test-utils';
// import Select from '@/components/Select/Select.vue';
// import Icon from '@/components/Icon/Icon.vue';
//
// describe('Select.vue', () => {
//     it('is called', () => {
//         let wrapper = shallowMount(Select);
//         expect(wrapper.name()).to.equal('fe-select');
//     });
//
//     it('is vue instance', () => {
//         const wrapper = shallowMount(Select);
//         expect(wrapper.name()).to.equal('fe-select');
//         expect(wrapper.isVueInstance()).to.be.true;
//     });
//
//     it('render simple select', () => {
//         const wrapper = shallowMount(Select);
//         expect(wrapper.find('select').classes()).to.include('select');
//     });
//
//     it('render simple select with icon', () => {
//         const wrapper = shallowMount(Select, {
//             propsData: {
//                 options: [
//                     {
//                         value: 'Foo',
//                         label: 'Foo',
//                     },
//                     {
//                         value: 'Bar',
//                         label: 'Bar',
//                     },
//                     {
//                         value: 'Boop',
//                         label: 'Boop',
//                     },
//                     {
//                         value: 'Cake',
//                         label: 'Cake',
//                     },
//                 ],
//                 iconPack: 'fas',
//                 icon: 'user',
//             },
//             children: [Icon],
//             stubs: {
//                 'fe-icon': Icon
//             }
//         });
//         expect(wrapper.find('select').classes()).to.include('select');
//         expect(wrapper.find({name: 'fe-icon'}).isVueInstance()).to.be.true;
//         expect(wrapper.find({name: 'fe-icon'}).props().icon).to.equal('user');
//         expect(wrapper.find({name: 'fe-icon'}).props().iconPack).to.equal('fas');
//     });
//
//     it('render disabled select', () => {
//         const wrapper = shallowMount(Select, {
//             attrs: {
//                 disabled: true
//             }
//         });
//         expect(wrapper.find('select').classes()).to.include('select');
//         expect(wrapper.find('select:disabled').exists()).to.be.true;
//         expect(wrapper.find('select:not([disabled])').exists()).to.be.false;
//     });
//
//     it('render expanded select', () => {
//         const wrapper = shallowMount(Select, {
//             attrs: {
//                 expanded: true
//             }
//         });
//         expect(wrapper.find('select').classes()).to.include('select');
//         expect(wrapper.find('div.fe-select').classes()).to.include('w-full');
//     });
// });
